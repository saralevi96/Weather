import React, { useState } from 'react';
import './App.css';

import { ForcastWidgets } from './component/ForcastWidgets';
import CitySelector from './component/SearchCity';
import { fetchForcast } from './function/forcastApi';
function App() {
  const [city, setCity] = useState<string>('');
  const [forcast, setForcast] = useState<Forcast | null>(null);
  const updatecity = async (city: string) => {
    setCity(city);
    setForcast(await fetchForcast(city));
  };

  console.log(`forcast`, forcast);

  return (
    <div className="app">
      <div className="city-selector-wrapper">
        <CitySelector updateCity={updatecity} city={city} />
      </div>
      <div className="forcast-dashboards-wrapper">
        {forcast && <ForcastWidgets forcast={forcast} />}
      </div>
    </div>
  );
}

export default App;
