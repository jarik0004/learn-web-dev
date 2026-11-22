// ПЕРЕМЕННЫЕ И КОНСТАНТЫ

const SERVER_DATA = {
  today: { day: 12, month: 10, year: 2026 },
  slots: [
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "12:00", available: true },
    { time: "13:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: false },
  ],
};

const SLOTS_EVEN_DAY = [
  { time: "10:00", available: true },
  { time: "11:00", available: true },
  { time: "12:00", available: true },
  { time: "13:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: false },
  { time: "17:00", available: false },
];

const SLOTS_ODD_DAY = [
  { time: "10:00", available: false },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "13:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];

const MONTHS_NOMINATIVE = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const DAYS_OF_WEEK = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];


// СОСТОЯНИЕ СТРАНИЦЫ

const STATE = {
  currentMonth: null,
  currentYear: null,
  selectedDay: null,
  selectedTime: null,
};


// ЧИСТЫЕ ФУНКЦИИ

function formatTimeRange(time) {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  const nextHour = (Number(hours) + 1) % 24;
  const formattedNextHour = String(nextHour).padStart(2, "0");

  return `${time}-${formattedNextHour}:${minutes}`;
}

function getSlotsForDay(day) {
  const isEven = day % 2 === 0;
  const slots = isEven ? SLOTS_EVEN_DAY : SLOTS_ODD_DAY;
  return slots;
}

// функция сравнения дат
function compareDates(date1, date2) {
  const d1 = new Date(date1.year, date1.month, date1.day);
  const d2 = new Date(date2.year, date2.month, date2.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

// функция показывает, можно ли выбрать дату
function isDateSelectable(day, month, year) {
  const today = SERVER_DATA.today;
  return compareDates({ day: day, month: month, year: year }, today) >= 0;
}

// создание массива календаря
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}


// ОТРИСОВКА И ОБРАБОТЧИКИ

// отрисовка календаря
function renderCalendar() {
  const monthYear = document.querySelector(".month-year");
  const calendarGrid = document.querySelector(".grid-days");

  const year = STATE.currentYear;
  const month = STATE.currentMonth;

  // текст для заголовка
  monthYear.textContent = MONTHS_NOMINATIVE[month] + " " + year;

  const weeks = buildCalendarGrid(year, month);
  const today = SERVER_DATA.today;

  let html = "";
  weeks.forEach(function (week) {
    html += '<div class="week-row">';
    week.forEach(function (cell) {
      // Собираем классы ячейки по порядку.
      let classes = "day-cell";
      if (cell.otherMonth) classes += " other-month";

      const isSelected =
        !cell.otherMonth &&
        cell.day === STATE.selectedDay &&
        month === STATE.currentMonth;
      if (isSelected) classes += " selected";

      // недоступные
      const selectable = isDateSelectable(cell.day, month, year);
      if (!cell.otherMonth && !selectable) classes += " disabled";

      html +=
        '<div class="' +
        classes +
        '" data-day="' +
        cell.day +
        '" data-other="' +
        cell.otherMonth +
        '">' +
        cell.day +
        "</div>";
    });
    html += "</div>";
  });

  // вставка кода html
  calendarGrid.innerHTML = html;

  // обработчики только на то, где нам нужно
  const dayCells = calendarGrid.querySelectorAll(
    ".day-cell:not(.other-month):not(.disabled)"
  );
  dayCells.forEach(function (cell) {
    cell.addEventListener("click", onDayClick);
  });
}

// функция нажатия на день
function onDayClick(event) {
  const cell = event.currentTarget;
  const day = parseInt(cell.dataset.day);

  STATE.selectedDay = day;
  STATE.selectedTime = null;

  SERVER_DATA.slots = getSlotsForDay(day);

  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
}

// функция отрисовки слотов для времени
function renderTimeSlots() {
  const value = document.querySelector(".time-titles .main-title-text");
  const timeGrid = document.querySelector(".time-grid");
  const slots = SERVER_DATA.slots;

  const day = STATE.selectedDay
  const month = STATE.currentMonth;
  const year = STATE.currentYear;

  const monthName = MONTHS_GENITIVE[month]; 

  const dateObj = new Date(year, month, day);
  const dayName = DAYS_OF_WEEK[dateObj.getDay()];

  value.textContent = day ? dayName + ", " + day + " " + monthName : "Выберите день";

  let html = "";
  slots.forEach(function (slot) {
    let classes = "time-slot";
    if (!slot.available && day) classes += " unavailable";
    if (slot.time === STATE.selectedTime && slot.available && day) {
      classes += " selected";
    }
    html +=
      '<button class="' +
      classes +
      '" data-time="' +
      slot.time +
      '">' +
      slot.time +
      "</button>";
  });

  timeGrid.innerHTML = html;


  const slotButtons = timeGrid.querySelectorAll(".time-slot:not(.unavailable)");
  slotButtons.forEach(function (slot) {
    slot.addEventListener("click", onTimeSlotClick);
  });
}

function onTimeSlotClick(event) {
  const slot = event.currentTarget;
  const time = slot.dataset.time;
  STATE.selectedTime = time;
  renderTimeSlots();
  updateBottomBar();
}

function updateBottomBar() {
  const value = document.querySelector(".bottom-bar .selected-info-text");

  const day = STATE.selectedDay
    ? STATE.selectedDay
    : "День не выбран"
  const month = STATE.currentMonth;
  const year = STATE.currentYear;

  const monthName = MONTHS_GENITIVE[month];

  const timeRange = STATE.selectedDay && STATE.selectedTime
    ? formatTimeRange(STATE.selectedTime)
    : "время не выбрано";
  if (STATE.selectedDay && STATE.selectedTime)
    value.textContent =
        day + " " + monthName + " " + year + " · " + timeRange;
  else if (STATE.selectedDay) value.textContent = day + " " + monthName + " · " + timeRange;
  else value.textContent = day + " · " + timeRange;
}

function setupMonthNavigation() {
  const prevBtn = document.querySelector(".calendar-nav-prev");
  const nextBtn = document.querySelector(".calendar-nav-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      STATE.currentMonth -= 1;
      if (STATE.currentMonth < 0) {
        STATE.currentMonth = 11;
        STATE.currentYear -= 1;
      }
      STATE.selectedDay = null;
      STATE.selectedTime = null;
      renderCalendar();
      renderTimeSlots();
      updateBottomBar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      STATE.currentMonth += 1;
      if (STATE.currentMonth > 11) {
        STATE.currentMonth = 0;
        STATE.currentYear += 1;
      }
      STATE.selectedDay = null;
      STATE.selectedTime = null;
      renderCalendar();
      renderTimeSlots();
      updateBottomBar();
    });
  }
}


// ИНИЦИАЛИЗАЦИЯ

function init() {
  // сначала берем данные "сервера" за свои
  STATE.currentMonth = SERVER_DATA.today.month;
  STATE.currentYear = SERVER_DATA.today.year;
  STATE.selectedDay = SERVER_DATA.today.day;

  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
  setupMonthNavigation();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});