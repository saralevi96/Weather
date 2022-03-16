import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import _ from 'lodash';
import { ForecastLineChart } from './ForecastLineChart';
import { FunctionComponent } from 'react';
import styled from "styled-components";

const LineChartWidgetWrapper = styled.div`{
    display: flex;
    flex-direction: column;
}`
const LineChart = styled.div`{
    display: flex;
    max-width: 250px;
    margin-left: 30px;
    margin-bottom: 30px;
}`


enum Granularity {
  Daily,
  ThreeHours,
}

type LineChartWidgetProps = {
  weather: Weather;
};

export const LineChartWidget: FunctionComponent<
  LineChartWidgetProps
> = ({ weather }) => {
  const [granularity, setGranularity] = React.useState(
    Granularity.ThreeHours,
  );
  //
  // const weatherDayGroup = _.groupBy(weather, (w) =>
  //   new Date(w.date).toDateString(),
  // );
  // console.log(`weatherDayGroup`)
  //   console.log(weatherDayGroup)

  // const weatherDay: Weather = Object.keys(weatherDayGroup).map(
  //   (dailyDate) => ({
  //     date: dailyDate,
  //     temperature: _.meanBy(
  //       weatherDayGroup[dailyDate],
  //       'temperature')
  //   })
  // );
  // _____________________________________
  const weatherDayGroup = _.groupBy(weather, (w) =>
      new Date(w.date).toDateString(),
  );
  const timeNight = [18,21,0,3]
  const timeMorning = [6,9,12,15]
  const weatherNight:Weather= (weather.filter(item => timeNight.includes(new Date(item.date).getHours())))
  const weatherNightDayGroup = _.groupBy(weatherNight, (w) =>
      new Date(w.date).toDateString(),
  );
    const weatherMorning:Weather= (weather.filter(item => timeMorning.includes(new Date(item.date).getHours())))
    const weatherMorningDayGroup = _.groupBy(weatherMorning, (w) =>
        new Date(w.date).toDateString(),);

  // const weatherMorningDayGroup = _.groupBy(weather, (w) =>
  //     new Date(w.date).toDateString(),
  // );
  const MeanWeatherDay=(weatherGroup)=>{return ( Object.keys(weatherGroup).map(
      (dailyDate) => ({
        date: dailyDate,
        temperature: _.meanBy(
            weatherGroup[dailyDate],
            'temperature').toFixed(2),
        temperatureMin:_.meanBy(
            weatherNightDayGroup[dailyDate],
            'temperature').toFixed(2),
      temperatureMax:_.meanBy(
          weatherMorningDayGroup[dailyDate],
          'temperature').toFixed(2),
      })
  ))}

  const weatherDay:Weather = MeanWeatherDay(weatherDayGroup)
  // const weatherMinDay:Weather = MeanWeatherDay(weatherEveningDayGroup)
// ________________________________


  console.log(`weatherDay`);
  console.log(weatherDay)
  const handleChange = (
    event: React.SyntheticEvent,
    newGranularity: Granularity,
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
              ? weather
              : weatherDay
          }
        />
      </Box>
    </LineChartWidgetWrapper>
  );
};
