import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ForecastLineChart } from "./ForecastLineChart";
import { FC } from "react";
import styled from "styled-components";
import { Degree } from "../enums";
import { meanWeatherDayCalculater } from "../function/MeanWeatherDayCalculater";

const LineChartWidgetWrapper = styled.div`
   {
    display: flex;
    flex-direction: column;
  }
`;
const LineChart = styled.div`
   {
    display: flex;
    max-width: 250px;
    margin-left: 30px;
    margin-bottom: 30px;
  }
`;

enum Granularity {
  Daily,
  ThreeHours,
}

type LineChartWidgetProps = {
  weather: Weather;
  degreeType: Degree;
};

export const LineChartWidget: FC<LineChartWidgetProps> = ({
  weather,
  degreeType,
}) => {
  const [granularity, setGranularity] = React.useState(Granularity.ThreeHours);
  let convertedWeather = weather;
  if (degreeType) {
    // convert from C to F
    convertedWeather = Object.keys(weather).map((wat) => ({
      temperature: (weather[wat].temperature * 9) / 5 + 32,
      date: weather[wat].date,
    }));
  }

  const dailyWeather = meanWeatherDayCalculater(convertedWeather);
  // const weatherMinDay:Weather = MeanWeatherDay(weatherEveningDayGroup)

  const handleChange = (
    event: React.SyntheticEvent,
    newGranularity: Granularity
  ) => {
    setGranularity(newGranularity);
  };

  return (
    <LineChartWidgetWrapper>
      <LineChart>
        <Tabs value={granularity} onChange={handleChange} centered>
          <Tab value={Granularity.ThreeHours} label="Every 3 hours" />
          <Tab value={Granularity.Daily} label="Day" />
        </Tabs>
      </LineChart>
      <Box>
        <ForecastLineChart
          weather={
            Granularity.ThreeHours === granularity
              ? convertedWeather
              : dailyWeather
          }
        />
      </Box>
    </LineChartWidgetWrapper>
  );
};
