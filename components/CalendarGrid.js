import styles from "../styles/CalendarGrid.module.css";

export default function CalendarGrid({ events }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); 
  }
  for (let day = 1; day <= lastDateOfMonth; day++) {
    calendarDays.push(day);
  }

  return (
      <div className={styles.calendar}>
      <div className={styles.monthHeader}>
            <h2>{monthName} {year}</h2>
        </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayName}>{day}</div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {calendarDays.map((day, index) => {
          const dayEvents = events.filter((event) => {
            if (!day) return false;

            const [yearStr, monthStr, dayStr] = event.date.split("-");
            const eventDay = Number(dayStr);
            const eventMonth = Number(monthStr) - 1;
            return eventDay === day && eventMonth === month;
          });

          return (
            <div key={index} className={styles.dayCell}>
              {day && <span className={styles.dayNumber}>{day}</span>}
              {dayEvents.map((event, i) => (
                <div key={i} className={styles.eventTag}>
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}