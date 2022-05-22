import React, { useMemo, useState } from "react";

import { ForecastWidgets } from "./component/ForecastWidgets";
import { CitySelector } from "./component/CitySelector";
import { fetchForecast } from "./function/forcastApi";
import styled from "styled-components";
import { SelectCityFavorite } from "./component/SelectCityFavorite";

const AppHeaderWrapper = styled.div`
   {
    background-color: rgb(195, 211, 250);
    background-repeat: no-repeat;
    padding: 10px;
    height: 40%;
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
  const favoriteCitiesStorage = localStorage.getItem("favoriteCitiesStorage");
  const [city, setCity] = useState<string>("");
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [isApiError, setIsApiError] = useState<boolean>(false);
  const [favoriteCities, setFavoriteCities] = useState<string[]>(
    favoriteCitiesStorage ? favoriteCitiesStorage.split(",") : []
  );

  const updateCity = async (city: string) => {
    setCity(city);
    try {
      const APIFetchForecast = await fetchForecast(city);
      setForecast(APIFetchForecast);
      setIsApiError(false);
    } catch (error) {
      console.error("Error from the forcast API", error);
      setForecast(null);
      setIsApiError(true);
    }
  };

  const updateFavoriteCities = () => {
    if (favoriteCities.includes(city)) {
      setFavoriteCities(
        favoriteCities.filter((favoriteCity) => favoriteCity != city)
      );
      localStorage.setItem(
        "favoriteCitiesStorage",
        favoriteCities.filter((favoriteCity) => favoriteCity != city).toString()
      );
    } else {
      setFavoriteCities([...favoriteCities, city]);
      localStorage.setItem(
        "favoriteCitiesStorage",
        [...favoriteCities, city].toString()
      );
    }
  };
  const deleteFavoriteCity = (deletedCity: string) => {
    setFavoriteCities(
      favoriteCities.filter((favoriteCity) => favoriteCity != deletedCity)
    );
    localStorage.setItem(
      "favoriteCitiesStorage",
      favoriteCities
        .filter((favoriteCity) => favoriteCity != deletedCity)
        .toString()
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
          <CitySelector updateCity={updateCity} />
        </AppHeader>
      </AppHeaderWrapper>
      <ForecastDashboardsWrapper>
        {forecast && !isApiError && (
          <ForecastWidgets
            forecast={forecast}
            updateFavoriteCities={updateFavoriteCities}
            favoriteCities={favoriteCities}
          />
        )}
        {isApiError && <h4>Sorry there was an error...</h4>}
      </ForecastDashboardsWrapper>
    </div>
  );
}

export default App;
