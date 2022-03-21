import React, { useState } from "react";
import { LineChartWidget } from "./LineChartWidget";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import {
  ForecastWidgetsWrapper,
  BarPage,
  Description,
  CardDescription,
  FavoriteCityTitle,
} from "./ForecastWidgetsStyle";
import { Icon } from "@mui/material";
import FavoriteCity from "./FavoriteCity";

export const ForecastWidgets = (props: {
  forecast: Forecast | null;
  favoriteCities: string[];
  updateFavoriteCities: () => void;
}) => {
  if (!props.forecast) {
    return null;
  }

  // @ts-ignore
  return (
    <ForecastWidgetsWrapper>
      <BarPage>
        <FavoriteCityTitle>
          <h2>{`Weather in ${props.forecast.city}`}</h2>
          <FavoriteCity
            city={props.forecast.city}
            toggelCity={props.updateFavoriteCities}
            favoriteCities={props.favoriteCities}
          />
        </FavoriteCityTitle>
        <CardDescription>
          <Description>
            <CalendarMonthIcon />
            {new Date(props.forecast.weather[0].date).toDateString()}
          </Description>
          <Description>
            <img
              src={`https://openweathermap.org/img/wn/${props.forecast.iconId}@2x.png`}
              alt="Logo"
              width="20%"
            />
            {props.forecast.descriptionToday}
          </Description>
          <Description>
            <DeviceThermostatIcon />
            {`${props.forecast.weather[0].temperature}\u{00B0}`}
          </Description>
        </CardDescription>
      </BarPage>
      <div>
        <LineChartWidget weather={props.forecast.weather} />
      </div>
    </ForecastWidgetsWrapper>
  );
};
