import { format } from "date-fns";
import type { ForecastData } from "../apis/types";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HourlyTempratureProps {
  data: ForecastData;
}

const HourlyTemprature = ({ data }: HourlyTempratureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <div className="flex-1 basis-2/3 bg-stone-950 border border-white/10 rounded-xl">
      <div className="p-6">
        <div>
          <h1 className="font-medium">Today's Temperature</h1>
        </div>
        <div className="mt-4">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                />
                {/* tooltip */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border bg-stone-950 border-white/5 p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-white/60">
                                Temprature
                              </span>
                              <span className="text-sm font-bold">
                                {payload[0].value}°
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-white/60">
                                Feels Like
                              </span>
                              <span className="text-sm font-bold">
                                {payload[1].value}°
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyTemprature;
