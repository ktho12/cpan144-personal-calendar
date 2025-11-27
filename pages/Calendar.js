import { useState, useEffect } from "react";
import CalendarGrid from "../components/CalendarGrid";

export default function Calendar() {
    const [events, setEvents] = useState([]);

useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
        setEvents(JSON.parse(saved));
    }
}, [])

return (
    <div>
        <CalendarGrid events={events} />
    </div>
);
}