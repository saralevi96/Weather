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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

export function ForecastLineChart(props: { weather: Weather }) {
  const arrayTemperature = [...props.weather.map((item) => item.temperature)];
  const minTemp = Math.min(...arrayTemperature);
  const maxTemp = Math.max(...arrayTemperature);

  return (
    <>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={props.weather}>
          <CartesianGrid />
          <XAxis dataKey="date" interval={"preserveStartEnd"} />
          <YAxis
            type="number"
            domain={[Math.round(minTemp) - 5, Math.round(maxTemp) + 5]}
          />
          <Legend />
          <Tooltip />

          <Line dataKey="temperature" stroke="black" />
          {Object.keys(props.weather[0]).includes("nightTimeTemperature") && (
            <Line dataKey="nightTimeTemperature" stroke="blue" />
          )}
          {Object.keys(props.weather[0]).includes("dayTimeTemperature") && (
            <Line dataKey="dayTimeTemperature" stroke="red" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
