import { MONTHS_NOMINATIVE, buildCalendarGrid, isDateSelectable } from "../script.js"

function Calendar({
  year,
  month,
  selectedDay,
  today,
  onDayClick,
  onPrevMonth,
  onNextMonth,
}) {

  const weeks = buildCalendarGrid(year, month);

  return(
      <div className="calendar-box">
          <div className="calendar-header">
            <span className="month-year">{MONTHS_NOMINATIVE[month]} {year}</span>
            <div className="calendar-nav">
              <button className="calendar-nav-prev" onClick={onPrevMonth}>‹</button>
              <button className="calendar-nav-next" onClick={onNextMonth}>›</button>
            </div>
          </div>
          <div className="days-grid-container">
            <div className="days-labels">
              <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span>
              <span>Пт</span><span>Сб</span><span>Вс</span>
            </div>
            <div className="grid-days">
                {weeks.map(function (week, weekIndex) {
                  return (
                    <div className="week-row" key={weekIndex}>
                      {week.map(function (cell, cellIndex) {
          
                        let classes = "day-cell";
          
                        if (cell.otherMonth) classes += " other-month";
          
                        const isToday =
                          !cell.otherMonth &&
                          cell.day === today.day &&
                          month === today.month &&
                          year === today.year;
                        if (isToday) classes += " today";
          
                        const isSelected = !cell.otherMonth && cell.day === selectedDay;
                        if (isSelected) classes += " selected";
          
                        const selectable = isDateSelectable(cell.day, month, year, today);
                        if (!cell.otherMonth && !selectable) classes += " disabled";
          
                        function Click() {
                          if (!cell.otherMonth && selectable) {
                            onDayClick(cell.day);
                          }
                        }
          
                        return (
                          <div className={classes} key={cellIndex} onClick={Click}>
                            {cell.day}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              </div>
            </div>
  );
}

export default Calendar;