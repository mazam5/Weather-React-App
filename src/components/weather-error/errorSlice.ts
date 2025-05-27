import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface WeatherErrorState {
  errorMessage: string | null;
}

// Define the initial state using that type
const initialState: WeatherErrorState = {
  errorMessage: null,
};
export const weatherErrorSlice = createSlice({
  name: "weatherError",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    resetWeatherError: () => initialState,
  },
});
export const { setErrorMessage, clearErrorMessage, resetWeatherError } =
  weatherErrorSlice.actions;
