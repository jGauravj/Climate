import { Sunrise, Gauge, Compass, Sunset } from "lucide-react";
import type { WeatherData } from "../apis/types";
import { format } from "date-fns";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-rose-500",
    },
    {
      title: "Wind Direaction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-blue-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hpa`,
      icon: Gauge,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="border border-white/10 rounded-xl bg-stone-950">
      <div className="p-6 flex flex-col gap-6">
        <div>
          <h1 className="font-medium">Weather Details</h1>
        </div>
        <div>
          <div className="grid gap-6 sm:grid-cols-2">
            {details.map((detail) => {
              return (
                <div
                  key={detail.title}
                  className="flex items-center gap-3 rounded-xl border border-white/5 p-4"
                >
                  <detail.icon size={20} className={`${detail.color}`} />
                  <div>
                    <p className="text-sm font-medium leading-none">{detail.title}</p>
                    <p className="text-sm text-white/60">{detail.value}</p>
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

export default WeatherDetails;
