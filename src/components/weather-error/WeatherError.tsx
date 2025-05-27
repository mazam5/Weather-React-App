import { useAppSelector } from "@/app/hooks";
import "./WeatherError.css";

const WeatherError = () => {
  const { error } = useAppSelector((state) => state.weather);
  return (
    <div className="weather-error">
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};
export default WeatherError;
