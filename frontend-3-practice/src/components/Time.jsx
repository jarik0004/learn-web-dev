import { MONTHS_GENITIVE, DAYS_OF_WEEK } from "../script.js"

function Time({
  slots,
  day,
  month,
  year,
  selectedTime,
  onTimeClick
}) {

  const dateObj = new Date(year, month, day);
  const dayName = DAYS_OF_WEEK[dateObj.getDay()];

  const monthName = MONTHS_GENITIVE[month];

    return(
        <div className="time-box">
            <div className="time-titles">
              <div className="main-title">
                <span className="main-title-text">{day === null ? "День не выбран" : `${dayName}, ${day} ${monthName}`}</span>
              </div>
              <div className="add-title">
                <span className="add-title-text">Начало визита · длительность 60 мин</span>
              </div>
            </div>
            <div className="time-grid">
              {slots.map(function (slot) {

                let classes = "time-slot";

                if (!slot.available && day) classes += " unavailable";

                if (slot.time === selectedTime && slot.available && day) {
                  classes += " selected";
                }

                function Click() {
                  if (slot.available) {
                    onTimeClick(slot.time);
                  }
                }

                return (
                  <button className={classes} key={slot.time} onClick={Click}>{slot.time}</button>
                );
              })}
            </div>
            <div className="description">
              <span className="description-text">Тёмным отмечено выбранное время.<br/>Зачёркнутые интервалы недоступны.</span>
            </div>
          </div>
    );
}

export default Time;