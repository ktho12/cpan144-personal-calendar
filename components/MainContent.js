import styles from "../styles/Main.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
 
export default function MainContent() {
    const router = useRouter();

    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const removeEvent = (indexToRemove) => {
        setEvents(events.filter((_, index) => index !== indexToRemove));
    };

    const [formData, setFormData] = useState({
        title: "",
        category: "work",
        date: ""
    });

    useEffect(() => {
        const saved = localStorage.getItem("events");
        if (saved) {
            setEvents(JSON.parse(saved));
        }
            setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;
            localStorage.setItem("events", JSON.stringify(events));
    }, [events, loaded]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.date) return;

        const updatedEvents = [...events, formData];
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setFormData({
            title: "",
            category: "work",
            date: ""
        });
    };

    const goToCal = () => {
        router.push("/Calendar");
    }

    return (
        <div className={styles.main}>
            <h2>Add a New Event</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="title"
                    placeholder="Your Event"
                    value={formData.title}
                    onChange={handleChange}
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}>
                        
                    <option value="work">Work</option>
                    <option value="family">Family</option>
                    <option value="school">School</option>
                    <option value="friends">Friends</option>
                    <option value="personal">Personal</option>
                </select>

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

                <button type="submit" className={styles.addBtn}>Add Event</button>

            </form>

            <h3>Your Saved Events</h3>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.title} - {event.category} - {event.date}
                    
                        <button onClick={() => removeEvent(index)} className={styles.removeBtn}>
                            Remove Event</button>
                    </li>
            ))}
            </ul>

            <button onClick={goToCal} className={styles.calBtn}>
                See Calendar
            </button>
        </div>
    );
}