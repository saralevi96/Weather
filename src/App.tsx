import React, { useState } from 'react';
import './App.css';
import { ForcastWidgets } from './component/ForcastWidgets';
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

function App() {
  const [city, setCity] = useState<string>('');
  const [forcast, setForcast] = useState<Forcast | null>(null);
  const updatecity = async (city: string) => {
    setCity(city);
    setForcast(await fetchForcast(city));
  };

  console.log(`forcast2`, forcast);

  return (
    <div className="app">
      <CitySelectorWrapper>
        <CitySelector updateCity={updatecity} city={city} />
      </CitySelectorWrapper>
      <div className="forcast-dashboards-wrapper">
        {forcast && <ForcastWidgets forcast={forcast} />}
      </div>
    </div>
  );
}

export default App;
