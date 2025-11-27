import styles from "../styles/Main.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
 
export default function MainContent() {
    const router = useRouter();

    const [events, setEvents] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        category: "work",
        date: ""
    });

    useEffect(() => {
        try {
            const saved = localStorage.getItem("events");
            if (saved) {
                setEvents(JSON.parse(saved));
            }
            } catch (err) {
                console.error("Failed to load saved events", err);
            }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("events", JSON.stringify(events));
        } catch (err) {
            console.error("Save error", err)
            }
    }, [events]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.date) return;
        setEvents([...events, formData]);
        setFormData({
            title: "",
            category: "work",
            date: ""
        });
    }

    const goToCal = () => {
        router.push("/calendar");
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

                <button type="submit">Add Event</button>

            </form>

            <h3>Your Saved Events</h3>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.title} - {event.category} - {event.date}
                    </li>
            ))}
            </ul>
            <button onClick={goToCal}>
                See Calendar
            </button>
        </div>
    );
}