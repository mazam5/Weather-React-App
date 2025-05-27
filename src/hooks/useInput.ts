import { useAppDispatch } from "@/app/hooks";
import {
  resetWeatherDisplay,
  setError,
  setForecastData,
  setWeatherData,
} from "@/components/weather-display/displaySlice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import { z } from "zod";

const formSchema = z.object({
  cityName: z.string().min(1, "City name is required"),
  units: z.enum(["metric", "imperial", "standard"]),
});

const useInput = () => {
  const dispatch = useAppDispatch();
  const latestValues = useRef<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityName: "",
      units: "metric",
    },
  });

  const convertToLocalTime = (
    timestamp: number,
    timezoneOffset: number
  ): string => {
    return DateTime.fromSeconds(timestamp, { zone: "utc" })
      .plus({
        seconds: timezoneOffset,
      })
      .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  };

  const fetchWeatherData = async (values: z.infer<typeof formSchema>) => {
    try {
      const weatherRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}weather`,
        {
          params: {
            q: values.cityName,
            units: values.units,
            appid: import.meta.env.VITE_API_KEY,
          },
        }
      );

      const weatherData = weatherRes.data;
      if (weatherData.cod === "404") {
        dispatch(setError("City not found"));
        return;
      }
      dispatch(resetWeatherDisplay());
      dispatch(setWeatherData(weatherData));
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
      dispatch(setError(null));
    } catch (error) {
      console.error("Weather fetch error:", error);
      dispatch(setError("City not found"));
    }

    try {
      const forecastRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}forecast`,
        {
          params: {
            q: values.cityName,
            units: values.units,
            appid: import.meta.env.VITE_API_KEY,
          },
        }
      );

      const forecastData = forecastRes.data;
      dispatch(setForecastData(forecastData));
      localStorage.setItem("forecastData", JSON.stringify(forecastData));
      dispatch(setError(null));
    } catch (error) {
      console.error("Forecast fetch error:", error);
      dispatch(setError("City not found"));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    latestValues.current = values;
    await fetchWeatherData(values);
    form.reset({ cityName: "", units: "metric" });
  };

  useEffect(() => {
    const localWeatherData = localStorage.getItem("weatherData");
    const localForecastData = localStorage.getItem("forecastData");

    if (localWeatherData) {
      dispatch(setWeatherData(JSON.parse(localWeatherData)));
    }

    if (localForecastData) {
      dispatch(setForecastData(JSON.parse(localForecastData)));
    }
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (latestValues.current) {
        fetchWeatherData(latestValues.current);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    form,
    onSubmit,
    convertToLocalTime,
  };
};

export default useInput;
