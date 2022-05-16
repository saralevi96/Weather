import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import _ from "lodash";
import { ForecastLineChart } from "./ForecastLineChart";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { Degree } from "../enums";

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

export const LineChartWidget: FunctionComponent<LineChartWidgetProps> = ({
  weather,
  degreeType,
}) => {
  const [granularity, setGranularity] = React.useState(Granularity.ThreeHours);
  let convertedWeather;
  if (degreeType) {
    convertedWeather = Object.keys(weather).map((wat) => ({
      temperature: (weather[wat].temperature * 9) / 5 + 32,
      date: weather[wat].date,
    }));
  } else {
    convertedWeather = weather;
  }
  console.log("convertedWeather");
  console.log(convertedWeather);
  // _____________________________________
  const weatherDayGroup = _.groupBy(convertedWeather, (w) =>
    new Date(w.date).toDateString()
  );
  const timeNight = [18, 21, 0, 3];
  const timeMorning = [6, 9, 12, 15];
  const weatherNight: Weather = convertedWeather.filter((item) =>
    timeNight.includes(new Date(item.date).getHours())
  );
  const weatherNightDayGroup = _.groupBy(weatherNight, (w) =>
    new Date(w.date).toDateString()
  );
  const weatherMorning: Weather = convertedWeather.filter((item) =>
    timeMorning.includes(new Date(item.date).getHours())
  );
  const weatherMorningDayGroup = _.groupBy(weatherMorning, (w) =>
    new Date(w.date).toDateString()
  );

  // const weatherMorningDayGroup = _.groupBy(weather, (w) =>
  //     new Date(w.date).toDateString(),
  // );
  const MeanWeatherDay = (weatherGroup) => {
    return Object.keys(weatherGroup).map((dailyDate) => ({
      date: dailyDate,
      temperature: _.meanBy(weatherGroup[dailyDate], "temperature").toFixed(2),
      nightTimeTemperature: _.meanBy(
        weatherNightDayGroup[dailyDate],
        "temperature"
      ).toFixed(2),
      dayTimeTemperature: _.meanBy(
        weatherMorningDayGroup[dailyDate],
        "temperature"
      ).toFixed(2),
    }));
  };

  const weatherDay: Weather = MeanWeatherDay(weatherDayGroup);
  // const weatherMinDay:Weather = MeanWeatherDay(weatherEveningDayGroup)
  // ________________________________

  console.log(`weatherDay`);
  console.log(weatherDay);
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
            Granularity.ThreeHours == granularity
              ? convertedWeather
              : weatherDay
          }
        />
      </Box>
    </LineChartWidgetWrapper>
  );
};

//°C× 9/5 + 32 = °F
