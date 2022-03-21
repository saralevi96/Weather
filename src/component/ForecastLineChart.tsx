import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

export function ForecastLineChart(props: { weather: Weather }) {

  const arrayTemperature=[...props.weather.map((item) => item.temperature)]
  const minTemp = Math.min(...arrayTemperature);
  const maxTemp = Math.max(...arrayTemperature);

  return (
    <>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={props.weather}>
          <CartesianGrid />
          <XAxis dataKey="date" interval={'preserveStartEnd'} />
          <YAxis
            type="number"
            domain={[
              Math.round(minTemp) - 5,
              Math.round(maxTemp) + 5,
            ]}
          />
          <Legend />
          <Tooltip />

          <Line
            dataKey="temperature"
            stroke="black"
            activeDot={{ r: 8 }}
          />
          {Object.keys(props.weather[0]).length==4 &&<Line
              dataKey="temperatureMin"
              stroke="red"
              activeDot={{ r: 8 }}
          />}
          {Object.keys(props.weather[0]).length==4 && <Line
              dataKey="temperatureMax"
              stroke="blue"
              activeDot={{ r: 8 }}
          />}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
