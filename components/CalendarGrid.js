import styles from "../styles/CalendarGrid.module.css";

export default function CalendarGrid({ events }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); 

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
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayName}>{day}</div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {calendarDays.map((day, index) => {
          const dayEvents = events.filter(
            (event) => new Date(event.date).getDate() === day &&
                       new Date(event.date).getMonth() === month
          );

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