import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface WeatherInputState {
  cityName: string;
  countryCode: string;
  units: string;
}

// Define the initial state using that type
const initialState: WeatherInputState = {
  cityName: "",
  countryCode: "",
  units: "",
};
export const weatherInputSlice = createSlice({
  name: "weatherInput",
  initialState,
  reducers: {
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },

    resetInput: () => initialState,
  },
});
export const { setCityName, setCountryCode, resetInput } =
  weatherInputSlice.actions;
// Other code such as selectors can use the imported `RootState` type
