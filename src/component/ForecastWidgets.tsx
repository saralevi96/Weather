import React, { FC } from "react";
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
import { FavoriteToggle } from "./FavoriteToggle";
import { Degree } from "../enums";

interface IForecastWidgetsProps {
  forecast?: Forecast;
  favoriteCities: string[];
  updateFavoriteCities: () => void;
}

export const ForecastWidgets: FC<IForecastWidgetsProps> = ({
  forecast,
  favoriteCities,
  updateFavoriteCities,
}) => {
  const [degreeType, setDegreeType] = React.useState(Degree.Celsius);
  if (!forecast) {
    return null;
  }

  const handleChange = (
    event: React.SyntheticEvent,
    newGranularity: Degree
  ) => {
    setDegreeType(newGranularity);
  };
  const temperature = degreeType
    ? ((forecast.weather[0].temperature * 9) / 5 + 32).toFixed(2)
    : forecast.weather[0].temperature;

  return (
    <ForecastWidgetsWrapper>
      <BarPage>
        <CardDescriptionWrapper>
          <DegreesChoice>
            <Description>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.iconId}@2x.png`}
                alt="Logo"
                width="50%"
              />
              {temperature}
            </Description>
            <TabsStyle value={degreeType} onChange={handleChange}>
              <Tab value={Degree.Celsius} label="°C" />
              <Separate>|</Separate>
              <Tab value={Degree.Fahrenheit} label="°F" />
            </TabsStyle>
          </DegreesChoice>
          <div>
            <FavoriteCityTitle>
              <h2>{forecast.city}</h2>
              <FavoriteToggle
                isInFavorite={favoriteCities.includes(forecast.city)}
                updateFavorite={updateFavoriteCities}
              />
            </FavoriteCityTitle>
            <DateStyle>
              {new Date(forecast.weather[0].date).toDateString()}
            </DateStyle>
          </div>
        </CardDescriptionWrapper>
      </BarPage>
      <div>
        <LineChartWidget weather={forecast.weather} degreeType={degreeType} />
      </div>
    </ForecastWidgetsWrapper>
  );
};
