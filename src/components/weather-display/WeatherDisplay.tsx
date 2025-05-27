import { useAppSelector } from "@/app/hooks";
import "./WeatherDisplay.css";
import { Cloud, CloudDrizzle, Sun, Wind } from "lucide-react";

const WeatherDisplay = () => {
  const weatherState = useAppSelector((state) => state.weather);
  return (
    <div id="weatherDisplay" className="weather-display">
      {weatherState.isLoading && <p>Loading...</p>}
      {weatherState.error && <p>Error: {weatherState.error}</p>}
      {weatherState.weatherData && (
        <>
          <div className="weather-container">
            <div className="weather-header">
              <div className="sample-text">{weatherState.weatherData.base}</div>
              <div className="place-time">
                <div>{weatherState.weatherData.name}</div>
                <div>
                  {new Date(
                    weatherState.weatherData.dt * 1000
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            <div className="weather-main-icon">
              {weatherState.weatherData.weather[0].main.includes("clear") ? (
                <Sun className="weather-icon" />
              ) : weatherState.weatherData.weather[0].main.includes(
                  "Clouds"
                ) ? (
                <Cloud className="weather-icon" />
              ) : weatherState.weatherData.weather[0].main === "Rain" ? (
                <CloudDrizzle className="weather-icon" />
              ) : (
                <Wind />
              )}
            </div>

            <div className="weather-info">
              <div className="label">
                {weatherState.weatherData.weather[0].description}
              </div>
              <div className="temp">
                {Math.round(weatherState.weatherData.main.temp)}
                <sup>°</sup>
              </div>
              <div className="day">
                {new Date(
                  weatherState.weatherData.dt * 1000
                ).toLocaleDateString([], {
                  day: "numeric",
                  weekday: "long",
                })}
              </div>
              <div className="details">
                <p>
                  Wind: {weatherState.weatherData.wind.speed} m/s&nbsp;
                  {weatherState.weatherData.wind.deg}
                  <sup>o</sup>
                </p>
              </div>
              <div>
                <p>Humidity: {weatherState.weatherData.main.humidity}%</p>
              </div>
            </div>

            <div className="weather-forecast overflow">
              {weatherState.forecastData &&
                weatherState.forecastData.list
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
                        {Math.round(forecast.main.temp)}°
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
