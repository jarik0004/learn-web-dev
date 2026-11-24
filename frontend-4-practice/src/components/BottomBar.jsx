import { MONTHS_GENITIVE, DAYS_OF_WEEK, formatTimeRange } from "../script.js"



function BottomBar({
  day,
  month,
  year,
  selectedTime
}) {
    const dateObj = new Date(year, month, day);
    const dayName = DAYS_OF_WEEK[dateObj.getDay()];

    const monthName = MONTHS_GENITIVE[month];
    
    let value = "День не выбран · время не выбрано";

    if (day !== null && selectedTime !== null) {
      const timeRange = formatTimeRange(selectedTime);
      value = `${dayName}, ${day} ${monthName} ${year} · ${timeRange}`;
    } else if (day !== null) {
      value = `${dayName}, ${day} ${monthName} ${year} · время не выбрано`;
    }

    return (
        <div className="bottom-bar">
          <div className="left-part">
            <div className="selected-info">
              <span className="selected-info-text">{value}</span>
            </div>
            <button className="prev-btn">← Назад к услугам</button>
          </div>
          <button className="next-btn">Далее: контакты  →</button>
        </div>
    );
}

export default BottomBar;