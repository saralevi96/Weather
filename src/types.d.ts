type Forecast = {
  city: string;
  weather: Weather;
  iconId: string;
  description: string[];
} | null;

type Weather = {
  date: string;
  temperature: number;
  nightTimeTemperature?: number;
  dayTimeTemperature?: number;
}[];
