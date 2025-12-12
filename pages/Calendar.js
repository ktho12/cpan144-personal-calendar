import { useState, useEffect } from "react";
import CalendarGrid from "../components/CalendarGrid";
import styles from "../styles/Calendar.module.css";

export default function Calendar() {
    const [events, setEvents] = useState([]);

useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
        setEvents(JSON.parse(saved));
    }
}, [])
    

return (
    <div className={styles.background}>
        <CalendarGrid events={events} />
    </div>
);
}