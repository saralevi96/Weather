import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import _ from 'lodash';
import { ForcastLineChart } from './ForcastLineChart';
import { FunctionComponent } from 'react';
import './LineChartWidget.css';

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

  const weatherDayGroup = _.groupBy(weather, (w) =>
    new Date(w.date).toDateString(),
  );
  const weatherDay: Weather = Object.keys(weatherDayGroup).map(
    (dailyDate) => ({
      date: dailyDate,
      temperature: _.meanBy(
        weatherDayGroup[dailyDate],
        'temperature',
      ),
    }),
  );
  // let dailyDate = weather[0].dailyDate;
  // let counter = 1;
  // let sumTemp = weather[0].temperature;
  // let WeatherDay: Weather = [];
  // for (let index = 1; index < weather.length; index++) {
  //   if (weather[index].dailyDate == dailyDate) {
  //     counter++;
  //     sumTemp += weather[index].temperature;
  //   } else {
  //     WeatherDay.push({
  //       date: dailyDate,
  //       dailyDate: dailyDate,
  //       temperature: sumTemp / counter,
  //     });
  //     dailyDate = weather[index].dailyDate;
  //     counter = 1;
  //     sumTemp = weather[index].temperature;
  //   }
  // }

  console.log(weatherDay);
  const handleChange = (
    event: React.SyntheticEvent,
    newGranularity: Granularity,
  ) => {
    setGranularity(newGranularity);
  };

  return (
    <div className="lineChart-widget-wrapper">
      <div className="lineChart-widget">
        <Tabs value={granularity} onChange={handleChange} centered>
          <Tab value={Granularity.ThreeHours} label="Every 3 hours" />
          <Tab value={Granularity.Daily} label="Day" />
        </Tabs>
      </div>
      <Box>
        <ForcastLineChart
          weather={
            Granularity.ThreeHours == granularity
              ? weather
              : weatherDay
          }
        />
      </Box>
    </div>
  );
};
