import { useState } from 'react';
import { LineChartWidget } from './LineChartWidget';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import imagtest from '../imag/few-clouds.png';

import './ForcastWidgets.css';
import { Icon } from '@mui/material';

const FORCAST_NAME_TO_IMAGE = {
  'clear sky': '../imag/clear-sky',
  'few clouds': '../imag/few-clouds',
};

export const ForcastWidgets = (props: {
  forcast: Forcast | null;
}) => {
  if (!props.forcast) {
    return null;
  }
  // const imagWeather = FORCAST_NAME_TO_IMAGE[props.forcast.descriptionToday]

  // let imagWeather = ' ';
  // switch (props.forcast.descriptionToday) {
  //   case 'clear sky': {
  //     imagWeather = '../imag/clear-sky';
  //     break;
  //   }
  //   case 'few clouds': {
  //     imagWeather = '../imag/few-clouds';
  //     break;
  //   }
  //   case 'Clouds': {
  //     imagWeather = imagtest;
  //     break;
  //   }
  //   case 'scattered clouds': {
  //     imagWeather = '../imag/scattered-clouds.png';
  //     break;
  //   }
  //   case 'broken clouds': {
  //     imagWeather = '../imag/broken-clouds';
  //     break;
  //   }
  //   case 'shower rain': {
  //     imagWeather = '../imag/shower-rain';
  //     break;
  //   }
  //   case 'rain': {
  //     imagWeather = '../imag/clear-sky';
  //     break;
  //   }
  //   case 'thunderstorm': {
  //     imagWeather = '../imag/rain';
  //     break;
  //   }
  //   case 'snow': {
  //     imagWeather = '../imag/snow';
  //     break;
  //   }
  //   case 'mist': {
  //     imagWeather = '../imag/mist';
  //     break;
  //   }
  // }

  return (
    <div className="forcast-widgets-wrapper">
      <div className="bar-page">
        <h1>{`Temperature in ${props.forcast.city}`}</h1>
        <div className="description">
          <h4 className="without-margin">
            <CalendarMonthIcon />
            {new Date(props.forcast.weather[0].date).toDateString()}
          </h4>
          <h4 className="without-margin">
            <img
              src={'https://openweathermap.org/img/wn/10d@2x.png'}
              alt="Logo"
            />
            {props.forcast.descriptionToday}
          </h4>
          <h4 className="without-margin">
            <DeviceThermostatIcon />
            {`${props.forcast.weather[0].temperature}\u{00B0}`}
          </h4>
        </div>
      </div>
      <div>
        <LineChartWidget weather={props.forcast.weather} />
      </div>
    </div>
  );
};
