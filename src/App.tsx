import React, { useState } from 'react';

import { ForecastWidgets } from './component/ForecastWidgets';
import CitySelector from './component/SearchCity';
import { fetchForcast } from './function/forcastApi';
import styled from "styled-components";

const CitySelectorWrapper = styled.div `{
    background-color: rgb(150, 190, 255);
    background-repeat: no-repeat;
    background-size: 2002px 250px;
    padding: 10px;
    flex: 1;
}`
const WeatherWrapper= styled.div`{
    display: flex;
    flex-direction: column;
}`




function App() {
  const [city, setCity] = useState<string>('');
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const updatecity = async (city: string) => {
    setCity(city);
    setForecast(await fetchForcast(city));
  };

  console.log(`forecast2`, forecast);


    return (
    <WeatherWrapper>
      <CitySelectorWrapper>
        <CitySelector updateCity={updatecity} city={city} />
      </CitySelectorWrapper>
      <div className="forecast-dashboards-wrapper">
        {forecast && <ForecastWidgets forecast={forecast} />}
      </div>
    </WeatherWrapper>
  );
}

export default App;
