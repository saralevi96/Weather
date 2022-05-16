import React, { useState } from "react";
import { LineChartWidget } from "./LineChartWidget";

import Tab from "@mui/material/Tab";
import {
  ForecastWidgetsWrapper,
  BarPage,
  Description,
  CardDescriptionWrapper,
  FavoriteCityTitle,
  DateStyle,
  DegreesChoice,
  Separate,
  TabsStyle,
} from "./ForecastWidgetsStyle";
import FavoriteCity from "./FavoriteCity";
import { Degree } from "../enums";

export const ForecastWidgets = (props: {
  forecast: Forecast | null;
  favoriteCities: string[];
  updateFavoriteCities: () => void;
}) => {
  const [degreeType, setDegreeType] = React.useState(Degree.Celsius);
  if (!props.forecast) {
    return null;
  }

  const handleChange = (
    event: React.SyntheticEvent,
    newGranularity: Degree
  ) => {
    setDegreeType(newGranularity);
  };

  return (
    <ForecastWidgetsWrapper>
      <BarPage>
        <CardDescriptionWrapper>
          <DegreesChoice>
            <Description>
              <img
                src={`https://openweathermap.org/img/wn/${props.forecast.iconId}@2x.png`}
                alt="Logo"
                width="50%"
              />
              {props.forecast.weather[0].temperature}
            </Description>
            <TabsStyle value={degreeType} onChange={handleChange}>
              <Tab value={Degree.Celsius} label="°C" />
              <Separate>|</Separate>
              <Tab value={Degree.Fahrenheit} label="°F" />
            </TabsStyle>
          </DegreesChoice>
          <div>
            <FavoriteCityTitle>
              <h2>{props.forecast.city}</h2>
              <FavoriteCity
                city={props.forecast.city}
                toggleCity={props.updateFavoriteCities}
                favoriteCities={props.favoriteCities}
              />
            </FavoriteCityTitle>
            <DateStyle>
              {new Date(props.forecast.weather[0].date).toDateString()}
            </DateStyle>
          </div>
        </CardDescriptionWrapper>
      </BarPage>
      <div>
        <LineChartWidget
          weather={props.forecast.weather}
          degreeType={degreeType}
        />
      </div>
    </ForecastWidgetsWrapper>
  );
};
