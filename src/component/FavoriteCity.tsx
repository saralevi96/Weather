import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import './FavoriteCity.css';
import { useState } from 'react';
import { isArrayBuffer } from 'util/types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function FavoriteCity(props: {
  city: string;
  toggelCity: () => void;
  favoriteCities: string[];
}) {
  return (
    <div className="favorite-city">
      <h2>city: {props.city}</h2>
      <IconButton onClick={props.toggelCity}>
        {props.favoriteCities.includes(props.city) && (
          <FavoriteIcon />
        )}
        {!props.favoriteCities.includes(props.city) && (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </div>
  );
}
