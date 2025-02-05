import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import type { GeocodingResponse, WeatherData } from "../apis/types";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_max, temp_min, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <div className=" bg-stone-950 basis-1/2 border border-white/10 rounded-xl">
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className=" space-y-2">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-semibold tracking-tighter ">
                  {locationName?.name},
                </h2>
                {locationName?.state && (
                  <span className="text-white/60">{locationName.state}</span>
                )}
              </div>
              <p className="text-sm text-white/60">{locationName?.country}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-6xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>

              <div className=" space-y-1">
                <p className="text-sm font-medium text-white/60">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown size={18} />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp size={18} />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets size={18} className="text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm font-medium text-white/60">
                    {humidity}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wind size={18} className="text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm font-medium text-white/60">
                    {speed}m/s
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col  items-center justify-center">
            <div className=" relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                alt={CurrentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className=" absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {CurrentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
