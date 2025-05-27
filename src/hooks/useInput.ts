import { useAppDispatch } from "@/app/hooks";
import {
  setError,
  setForecastData,
  setWeatherData,
} from "@/components/weather-display/displaySlice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  cityName: z.string().min(1, "City name is required"),
  units: z.enum(["metric", "imperial", "standard"]),
});

const useInput = () => {
  const dispatch = useAppDispatch();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityName: "",
      units: "metric",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    // get the current weather data from the API

    await axios
      .get(import.meta.env.VITE_API_BASE_URL + "weather", {
        params: {
          q: values.cityName,
          units: values.units,
          appid: import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log("Weather data received:", data);
        dispatch(setWeatherData(data));
        localStorage.setItem("weatherData", JSON.stringify(data));
        dispatch(setError(null));
        return data;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        dispatch(setError("Failed to fetch weather data. Please try again."));
        return null;
      });
    await axios
      .get(import.meta.env.VITE_API_BASE_URL + "forecast", {
        params: {
          q: values.cityName,
          units: values.units,
          appid: import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log("Forecast data received:", data);
        dispatch(setForecastData(data));
        localStorage.setItem("forecastData", JSON.stringify(data));
        dispatch(setError(null));
        return data;
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
        dispatch(setError("Failed to fetch forecast data. Please try again."));
        return null;
      });
    form.reset({
      cityName: "",
      units: "metric",
    });
  }
  // 3. Return the form methods and the submit handler.
  return {
    form,
    onSubmit,
  };
};

export default useInput;
