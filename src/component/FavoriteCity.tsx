import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { useState } from 'react';
import { isArrayBuffer } from 'util/types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from "styled-components";
const FavoriteCityWrapper = styled.div` {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
}`


export default function FavoriteCity(props: {
  city: string;
  toggelCity: () => void;
  favoriteCities: string[];
}) {
  return (
    <FavoriteCityWrapper>
      <h2>city: {props.city}</h2>
      <IconButton onClick={props.toggelCity}>
        {props.favoriteCities.includes(props.city) && (
          <FavoriteIcon />
        )}
        {!props.favoriteCities.includes(props.city) && (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </FavoriteCityWrapper>
  );
}
