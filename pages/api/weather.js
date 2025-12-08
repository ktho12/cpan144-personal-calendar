import { fetchWeatherApi } from "openmeteo";

export default async function handler(req, res) {
  const { lat, lon } = req.query;

  const params = {
    latitude: Number(lat),
    longitude: Number(lon),
    daily: ["temperature_2m_max", "temperature_2m_min", "weathercode"],
    timezone: "auto",
  };

  const url = "https://api.open-meteo.com/v1/forecast";

  const responses = await fetchWeatherApi(url, params);
  const data = responses[0];

    const daily = data.daily();
    const start = Number(daily.time());
    const end = Number(daily.timeEnd());
    const interval = Number(daily.interval());

    
  const dates = [];
  for (let t = start; t < end; t += interval) {
    dates.push(new Date(t * 1000).toISOString().split("T")[0]);
  }

  res.status(200).json({
    dates,
    tempMax: daily.variables(0).valuesArray(),
    tempMin: daily.variables(1).valuesArray(),
    weathercode: daily.variables(2).valuesArray(),
  });
}
