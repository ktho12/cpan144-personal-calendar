"use client";
import { useState, useEffect } from 'react';
import styles from '../styles/Weather.module.css';

type Coords = {
  lat: number;
  lon: number;
};

type WeatherData = {
  dates: string[];
  tempMax: number[];
  tempMin: number[];
  weathercode: number[];
};
export default function WeatherApi() {
	const [coords, setCoords] = useState<Coords | null>(null);
	const [weather, setWeather] = useState<WeatherData | null>(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setCoords({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude,
				});
			},
			(err) => {
				console.error("Location error: ", err);
			}
		);
	}, []);

	useEffect(() => {
		if (!coords) return;
		const { lat, lon } = coords;

		async function fetchWeather() {
			const response = await fetch(
				`/api/weather?lat=${lat}&lon=${lon}`
			);
			const data = await response.json();
			setWeather(data);
		}
		fetchWeather();
	}, [coords]);

	if (!coords) {
		return (
			<div className={styles.container}>
				<p className={styles.loading}>Getting your location...</p>
			</div>
		);
	}

	if (!weather) {
		return (
			<div className={styles.container}>
				<p className={styles.loading}>Fetching weather...</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Your 7 Day Forecast</h2>
			
			<ul className={styles.list}>
				{weather.dates.map((date, index) => {
					const d = new Date(date);

					const formattedDate = d.toLocaleDateString("en-US", {
						weekday: "short",
						month: "short",
						day: "numeric",
					});
				
					return (
						<li key={index} className={styles.dayItem}>
							<span className={styles.date}>{formattedDate}</span>
							<span className={styles.weather}>
								High: {Math.round(weather.tempMax[index])}°C |{" "}
								Low: {Math.round(weather.tempMin[index])}°C </span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}