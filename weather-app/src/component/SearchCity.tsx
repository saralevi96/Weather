import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CITIES from '../data/cityIL.json';
import { fetchForcast } from '../function/forcastApi';
import FavoriteCity from './FavoriteCity';
//import ButtonSearch from "./ButtonSearch"
import { getCurrentCity } from '../function/getCurrentCity2';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Block, Tune } from '@mui/icons-material';
import './SearchCity.css';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

const CitiesTemp: any = CITIES;
const CITIES_NAMES: string[] = CitiesTemp.map(
  (city: any) => city.name,
);
// export default function SearchCity(props: {
//   updateForcast: (forcast: Forcast) => void;
//   forcast: Forcast;
// }) {
export default function SearchCity(props: {
  updateCity: (city: string) => void;
  city: string;
}) {
  // const [city, setCity] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [showFavoriteButton, setshowFavoriteButton] =
    useState<boolean>(false);

  // const setForcast = async (city: string) => {
  //   const forcast = await fetchForcast(city);
  //   props.updateForcast(forcast);
  //   setshowFavoriteButton(true);
  // };
  const setCity = async (city: string) => {
    props.updateCity(city);
    setshowFavoriteButton(true);
  };
  const setCurrentCity = async () => {
    // Moshe
    await getCurrentCity((currentCity) => {
      setFavoriteCity(currentCity as string);
    });

    // Sara
    // const currentCity = await getCurrentCity();
    // setFavoriteCity(currentCity as string);
  };
  const setFavoriteCity = (favoriteCity: string) => {
    setCity(favoriteCity);
    console.log('call setInputValue with', favoriteCity);
    setInputValue(favoriteCity);
  };
  const toggleCity = () => {
    if (favoriteCities.includes(inputValue)) {
      setFavoriteCities(
        favoriteCities.filter(
          (favoriteCity) => favoriteCity != inputValue,
        ),
      );
    } else {
      setFavoriteCities([...favoriteCities, inputValue]);
    }
  };
  const deleteFavoriteCity = (deleteCity: string) => {
    setFavoriteCities(
      favoriteCities.filter(
        (favoriteCity) => favoriteCity != deleteCity,
      ),
    );
  };

  const options = [
    ...new Set(
      CITIES_NAMES.filter((c: string) =>
        c.toUpperCase().includes(inputValue.toUpperCase()),
      ).slice(0, 200),
    ),
  ];

  return (
    <div className="search-city-wrapper">
      <div className="select-city">
        <div className="search-city">
          <Autocomplete
            onChange={(event: any, newValue: string | null) => {
              if (newValue !== null) {
                setInputValue(newValue);
                setDisabledButton(false);
              } else {
                setshowFavoriteButton(false);
                setDisabledButton(true);
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              if (!event) return;
              // if (newInputValue != '') {
              // console.log(newInputValue);
              setInputValue(newInputValue);
              if (!newInputValue) {
                setCity(newInputValue);
              }
              // }
            }}
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="city" />
            )}
            style={{ height: 55, margin: 10 }}
          />
          <Button
            style={{ height: 55, margin: 10 }}
            id="Search"
            sx={{ width: 300 }}
            disabled={disabledButton}
            onClick={() => {
              setCity(inputValue);
            }}
            variant="contained"
          >
            Search
          </Button>

          <Button
            style={{ height: 55, margin: 10 }}
            id="current-location"
            sx={{ width: 300 }}
            onClick={setCurrentCity}
            variant="contained"
          >
            current location
          </Button>
        </div>
        {showFavoriteButton && (
          <FavoriteCity
            city={inputValue}
            toggelCity={toggleCity}
            favoriteCities={favoriteCities}
          ></FavoriteCity>
        )}
      </div>
      <div className="show-favorite-citys">
        <h1 style={{ color: 'white' }}>favorite city</h1>
        <Box
          className="box"
          sx={{
            width: '100%',
            height: 250,
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
        >
          <div className="show-favorite-listCity">
            {favoriteCities.map((favoriteCity) => (
              <div className="showFavoriteCity">
                <IconButton
                  onClick={() => {
                    deleteFavoriteCity(favoriteCity);
                  }}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <Button
                  onClick={() => {
                    setFavoriteCity(favoriteCity);
                  }}
                >
                  {favoriteCity}
                </Button>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
}
