import { weatherDisplaySlice } from "@/components/weather-display/displaySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    weather: weatherDisplaySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
