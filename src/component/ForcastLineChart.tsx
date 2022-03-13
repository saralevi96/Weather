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

export function ForcastLineChart(props: { weather: Weather }) {
  const minTemp = Math.min(
    ...props.weather.map((item) => item.temperature),
  );
  const maxTemp = Math.max(
    ...props.weather.map((item) => item.temperature),
  );

  return (
    <>
      <ResponsiveContainer width="70%" aspect={3}>
        <LineChart data={props.weather} margin={{ right: 500 }}>
          <CartesianGrid />
          <XAxis dataKey="date" interval={'preserveStartEnd'} />
          <YAxis
            type="number"
            domain={[
              Math.round(minTemp) - 5,
              Math.round(maxTemp) + 5,
            ]}
          ></YAxis>
          <Legend />
          <Tooltip />
          <Line
            dataKey="temperature"
            stroke="black"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
