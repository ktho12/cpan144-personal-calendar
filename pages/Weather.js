import WeatherApi from '../components/WeatherAPI';
import styles from '../styles/weatherPage.module.css';

export default function WeatherData() {
    return (
        <div className={styles.background}>
            <WeatherApi />
        </div>
    );
}