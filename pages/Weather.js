import styles from '../styles/weatherPage.module.css';
import dynamic from "next/dynamic";

const WeatherApi = dynamic(
    () => import("../components/WeatherAPI"),
    {
        loading: () => <p>Loading weather...</p>,
        ssr: false,
  }
);


export default function WeatherData() {
    return (
        <div className={styles.background}>
            <WeatherApi />
        </div>
    );
}