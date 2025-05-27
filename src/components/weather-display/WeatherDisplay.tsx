import { useAppSelector } from "@/app/hooks";
import { Cloud, CloudDrizzle, RefreshCw, Sun, Wind } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import "./WeatherDisplay.css";
import useInput from "@/hooks/useInput";

const WeatherDisplay = () => {
  const weatherState = useAppSelector((state) => state.weather);
  const { weatherData, forecastData, isLoading } = weatherState;
  const { convertToLocalTime } = useInput();

  const [isCelsius, setIsCelsius] = useState(true);

  const convertTemp = (temp: number) =>
    isCelsius ? Math.round(temp) : Math.round(temp * 1.8 + 32);

  const tempUnit = isCelsius ? "°C" : "°F";

  const toggleTempUnit = () => setIsCelsius((prev) => !prev);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {weatherData && (
        <>
          <div className="weather-container" id="weatherDisplay">
            <div className="weather-header">
              <div className="sample-text">{weatherData.base}</div>
              <div className="place-time">
                <div>{weatherData.name}</div>
                <div>
                  {
                    convertToLocalTime(
                      weatherData.dt,
                      weatherData.timezone
                    ).split(",")[2]
                  }
                </div>
                <Button className="temp-toggle-button" onClick={toggleTempUnit}>
                  <RefreshCw />
                  {isCelsius ? "Fahrenheit" : "Celsius"}
                </Button>
              </div>
            </div>
            <div className="weather-main-icon ">
              <div>
                {weatherData.weather[0].main.includes("clear") ? (
                  <Sun className="weather-icon" />
                ) : weatherData.weather[0].main.includes("Clouds") ? (
                  <Cloud className="weather-icon" />
                ) : weatherData.weather[0].main === "Rain" ? (
                  <CloudDrizzle className="weather-icon" />
                ) : (
                  <Wind />
                )}
              </div>
            </div>

            <div className="weather-info">
              <div className="label">{weatherData.weather[0].description}</div>
              <div className="temp">
                {convertTemp(weatherData.main.temp)}
                {tempUnit}
              </div>
              <div className="day">
                {
                  convertToLocalTime(
                    weatherData.dt,
                    weatherData.timezone
                  ).split(",")[0]
                }
              </div>
              <div className="details">
                <p>
                  Wind: {weatherData.wind.speed} m/s&nbsp;
                  {weatherData.wind.deg}°
                </p>
              </div>
              <div>
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
            </div>

            <div className="weather-forecast">
              {forecastData &&
                forecastData.list
                  .filter(
                    (forecast) => new Date(forecast.dt * 1000).getHours() === 8
                  )
                  .map((forecast, index) => (
                    <div key={index} className="forecast-item">
                      <div className="forecast-time">
                        {new Date(forecast.dt * 1000).toLocaleDateString([], {
                          weekday: "short",
                        })}
                      </div>
                      <div className="forecast-icon">
                        {forecast.weather[0].main === "Clear" ? (
                          <Sun />
                        ) : forecast.weather[0].main === "Clouds" ? (
                          <Cloud />
                        ) : forecast.weather[0].main === "Rain" ? (
                          <CloudDrizzle />
                        ) : (
                          <Wind />
                        )}
                      </div>
                      <div className="forecast-temp">
                        {convertTemp(forecast.main.temp)}
                        {tempUnit}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default WeatherDisplay;
