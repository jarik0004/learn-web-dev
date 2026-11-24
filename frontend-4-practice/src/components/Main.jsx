import { useState, useEffect } from "react";

import StepIndicator from "./StepIndicator.jsx"
import PageTitles from "./PageTitles.jsx"
import Calendar from "./Calendar.jsx"
import Time from "./Time.jsx"
import BottomBar from "./BottomBar.jsx";

import { fetchToday, fetchSlots } from "../api.js"

function Main() {

    const [today, setToday] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [slots, setSlots] = useState([]);

    async function fetchData() {
      try {
        setError(null);
        
        const data = await fetchToday();
        setToday(data);

        setCurrentMonth(data.month);
        setCurrentYear(data.year);
        setSelectedDay(data.day);

        const dataSlots = await fetchSlots(data);

        setSlots(dataSlots.slots);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    async function DayClick(year, month, day) {
      setSelectedDay(day);
      setSelectedTime(null);
      try {
        setError(null);
        setLoading(true);
        const date = {day, month, year};
        const dateSlots = await fetchSlots(date);
        setSlots(dateSlots.slots);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    }
    
    function TimeClick(time) {
      setSelectedTime(time);
    }
    
    function PrevMonth() {
      setSelectedDay(null);
      setSelectedTime(null);
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
    
    function NextMonth() {
      setSelectedDay(null);
      setSelectedTime(null);
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }

  if (loading) {
    return (
      <main className="main">
        <StepIndicator/>
        <PageTitles/>
        <div style={{ textAlign: "center", color: "#513B30", fontSize: "24px", fontWeight: "bold", padding: "40px", flex: 1 }}>
          Загрузка...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main">
        <StepIndicator/>
        <PageTitles/>
        <div style={{ textAlign: "center", color: "#E74C3C", fontSize: "24px", padding: "40px", flex: 1 }}>
          Ошибка: {error}
        </div>
      </main>
    );
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