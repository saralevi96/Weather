import React, { useState } from "react";

import { ForecastWidgets } from "./component/ForecastWidgets";
import CitySelector from "./component/SearchCity";
import { fetchForcast } from "./function/forcastApi";
import styled from "styled-components";
import SelectCityFavorite from "./component/SelectCityFavorite";
import FavoriteCity from "./component/FavoriteCity";

const AppHeaderWrapper = styled.div`
   {
    background-color: rgb(195, 211, 250);
    background-repeat: no-repeat;
    background-size: 2002px 250px;
    padding: 10px;
    flex: 1;
  }
`;
// const WeatherWrapper= styled.div`{
//     //display: flex;
//     //flex-direction: column;
// }`

const AppHeader = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
    //margin-left: 20%;
  }
`;
const ForecastDashboardsWrapper = styled.div`
   {
    display: flex;
    flex-direction: column;
    //margin-left: 20%;
    width: 50%;
    margin: auto;
  }
`;
const TitleWrapper = styled.div`
   {
    margin-top: 5%;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
  }
`;
const Title = styled.h1`
   {
    margin: 0;
    width: 80%;
  }
`;

function App() {
  const [city, setCity] = useState<string>("");
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const updateCity = async (city: string) => {
    setCity(city);
    setForecast(await fetchForcast(city));
  };

  const updateFavoriteCities = () => {
    if (favoriteCities.includes(city)) {
      setFavoriteCities(
        favoriteCities.filter((favoriteCity) => favoriteCity != city)
      );
    } else {
      setFavoriteCities([...favoriteCities, city]);
    }
  };
  const deleteFavoriteCity = (deletedCity: string) => {
    setFavoriteCities(
      favoriteCities.filter((favoriteCity) => favoriteCity != deletedCity)
    );
  };

  return (
    <div>
      <AppHeaderWrapper>
        <AppHeader>
          <TitleWrapper>
            <Title>World wide weather</Title>
            <SelectCityFavorite
              deleteFavoriteCity={deleteFavoriteCity}
              favoriteCities={favoriteCities}
              updateCity={updateCity}
            />
          </TitleWrapper>
          <h4>Select a location to start</h4>
          <CitySelector updateCity={updateCity} city={city} />
        </AppHeader>
      </AppHeaderWrapper>
      <ForecastDashboardsWrapper>
        {forecast && (
          <ForecastWidgets
            forecast={forecast}
            updateFavoriteCities={updateFavoriteCities}
            favoriteCities={favoriteCities}
          />
        )}
      </ForecastDashboardsWrapper>
    </div>
  );
}

export default App;
