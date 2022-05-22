import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import * as React from "react";
import { FC } from "react";

interface IForecastLineChartProps {
  weather: Weather;
}

export const ForecastLineChart: FC<IForecastLineChartProps> = ({ weather }) => {
  const arrayTemperature = weather.map((item) => item.temperature);
  const minTemp = Math.min(...arrayTemperature);
  const maxTemp = Math.max(...arrayTemperature);

  return (
    <>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={weather}>
          <CartesianGrid />
          <XAxis dataKey="date" interval={"preserveStartEnd"} />
          <YAxis
            type="number"
            domain={[Math.round(minTemp) - 5, Math.round(maxTemp) + 5]}
          />
          <Legend />
          <Tooltip />

          <Line dataKey="temperature" stroke="black" />
          {Object.keys(weather[0]).includes("nightTimeTemperature") && (
            <Line dataKey="nightTimeTemperature" stroke="blue" />
          )}
          {Object.keys(weather[0]).includes("dayTimeTemperature") && (
            <Line dataKey="dayTimeTemperature" stroke="red" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
