import { useState } from "react";

import StepIndicator from "./StepIndicator.jsx"
import PageTitles from "./PageTitles.jsx"
import Calendar from "./Calendar.jsx"
import Time from "./Time.jsx"
import BottomBar from "./BottomBar.jsx";

import { SERVER_DATA, getSlotsForDay, isDateSelectable, buildCalendarGrid} from "../script.js"

function Main() {

    const today = SERVER_DATA.today;
    const [currentMonth, setCurrentMonth] = useState(today.month);
    const [currentYear, setCurrentYear] = useState(today.year);
    const [selectedDay, setSelectedDay] = useState(today.day);
    const [selectedTime, setSelectedTime] = useState(null);

    const [slots, setSlots] = useState(SERVER_DATA.slots);

    function DayClick(day) {
      setSelectedDay(day);
      setSelectedTime(null);
      setSlots(getSlotsForDay(day));
    }
    
    function TimeClick(time) {
      setSelectedTime(time);
    }
    
    function PrevMonth() {
      setSelectedDay(null);
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
    
    function NextMonth() {
      setSelectedDay(null);
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }

    return (
        <main className="main">
            <StepIndicator/>
            <PageTitles/>
            <div className="panels">
                <Calendar year={currentYear} month={currentMonth} selectedDay={selectedDay}
                    today={today} onDayClick={DayClick} onPrevMonth={PrevMonth}
                    onNextMonth={NextMonth}/>
                <Time slots={slots} day={selectedDay} month={currentMonth} year={currentYear}
                selectedTime={selectedTime} onTimeClick={TimeClick}/>
            </div>
            <BottomBar day={selectedDay} month={currentMonth} year={currentYear}
                selectedTime={selectedTime}/>
        </main>
    );
}

export default Main;