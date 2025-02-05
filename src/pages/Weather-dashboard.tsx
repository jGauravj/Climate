import { RefreshCw } from "lucide-react";
import { useGeolocation } from "../hooks/use-geolocation";
import Skeleton from "../components/Skeleton";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import {
  useForecastQuerry,
  useReverseGeocodeQuerry,
  useWeatherQuerry,
} from "../hooks/use-weather";
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemprature from "../components/HourlyTemprature";
import WeatherDetails from "../components/WeatherDetails";
import WeatherForecast from "../components/WeatherForecast";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuerry = useWeatherQuerry(coordinates);
  const forecastQuerry = useForecastQuerry(coordinates);
  const locationQuerry = useReverseGeocodeQuerry(coordinates);

  const handleRequest = () => {
    getLocation();
    if (coordinates) {
      weatherQuerry.refetch();
      forecastQuerry.refetch();
      locationQuerry.refetch();
    }
  };

  const locationName = locationQuerry?.data?.[0];

  useEffect(() => {
    // if (!coordinates) {
    //   toast.error("Please enable location access to see your weather.");
    // }

    if (locationError) {
      toast.error("📍 Location Error: Please enable location!");
    }

    if (weatherQuerry.error || forecastQuerry.error) {
      toast.error("Faild to fetch weather data. Please try again!");
    }
  }, [locationError, coordinates, weatherQuerry, forecastQuerry]);

  if (locationLoading) {
    return <Skeleton />;
  }

  if (!weatherQuerry.data || !forecastQuerry.data) {
    return <Skeleton />;
  }

  return (
    <div className=" space-y-4">
      {/* Favorite Cities */}
      <div className=" flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">My location</h1>
        <button
          className="py-1.5 px-2.5 border bg-stone-900 rounded-md border-white/10 "
          onClick={handleRequest}
          disabled={weatherQuerry.isFetching || forecastQuerry.isFetching}
        >
          <RefreshCw
            size={18}
            className={`${weatherQuerry.isFetching ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuerry.data}
            locationName={locationName}
          />
          <HourlyTemprature data={forecastQuerry.data} />
          {/* hourly temprature */}
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuerry.data} />
          <WeatherForecast data={forecastQuerry.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
