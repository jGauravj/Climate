import { Coordinates } from "../apis/types";
import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "../apis/weather";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
} as const;

export function useWeatherQuerry(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null, 
    enabled: !!coordinates,
  })
}

export function useForecastQuerry(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null, 
    enabled: !!coordinates,
  })
}

export function useReverseGeocodeQuerry(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null, 
    enabled: !!coordinates,
  })
}