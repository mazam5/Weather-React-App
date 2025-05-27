import { createSlice } from "@reduxjs/toolkit";
import type { WeatherModel } from "@/models/WeatherModel";
import type { ForecastModel } from "@/models/ForecastModel";

// Define a type for the slice state
export interface WeatherDisplayState {
  weatherData: WeatherModel | null;
  forecastData: ForecastModel | null;
  isLoading: boolean;
  error: string | null;
}
// Define the initial state using that type
const initialState: WeatherDisplayState = {
  weatherData: null,
  forecastData: null,
  isLoading: false,
  error: null,
};

export const weatherDisplaySlice = createSlice({
  name: "weatherDisplay",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setForecastData: (state, action) => {
      state.forecastData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetWeatherDisplay: () => initialState,
  },
});
export const {
  setWeatherData,
  setLoading,
  setError,
  resetWeatherDisplay,
  setForecastData,
} = weatherDisplaySlice.actions;
