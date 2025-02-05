import { format } from "date-fns";
import type { ForecastData } from "../apis/types";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.min(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecast).slice(0, 6);

  // console.log(dailyForecast);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <div className="border border-white/10 rounded-xl bg-stone-950">
      <div className="p-6 flex flex-col gap-6 ">
        <div>
          <h1 className="font-medium">5-Day Forecast</h1>
        </div>
        <div>
          <div className="grid gap-4">
            {nextDays.map((day) => {
              return (
                <div
                  key={day.date}
                  className="grid grid-cols-3 items-center gap-4 rounded-xl border border-white/5 p-4"
                >
                  <div>
                    <p className="font-medium">
                      {format(new Date(day.date * 1000), "EEE, MMM d")}
                    </p>
                    <p className="text-sm text-white/60 capitalize">
                      {day.weather.description}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <span className="flex items-center text-blue-500">
                      <ArrowDown size={18} className="mr-1" />
                      {formatTemp(day.temp_min)}
                    </span>
                    <span className="flex items-center text-red-500">
                      <ArrowUp size={18} className="mr-1" />
                      {formatTemp(day.temp_max)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="flex items-center gap-1">
                      <Droplets size={18} className="text-blue-500" />
                      <span className="text-sm">{day.humidity}%</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind size={18} className="text-blue-500" />
                      <span className="text-sm">{day.wind}m/s</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
