import { ModeToggle } from "./components/ModeToggle";
import { ThemeProvider } from "./components/ThemeProvider";
import WeatherDisplay from "./components/weather-display/WeatherDisplay";
import WeatherError from "./components/weather-error/WeatherError";
import WeatherInput from "./components/weather-input/WeatherInput";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div id="app">
        <nav id="navbar">
          <h1>Weather App</h1>
          <ModeToggle />
        </nav>
        <WeatherInput />
        <WeatherDisplay />
        <WeatherError />
      </div>
    </ThemeProvider>
  );
}

export default App;
