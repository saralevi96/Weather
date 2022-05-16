import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import { useState } from "react";
import { isArrayBuffer } from "util/types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
const FavoriteCityWrapper = styled.div`
   {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

export default function FavoriteCity(props: {
  city: string;
  toggleCity: () => void;
  favoriteCities: string[];
}) {
  return (
    <FavoriteCityWrapper>
      {props.favoriteCities.includes(props.city) && (
        <Tooltip title="remove from favorites" placement="bottom">
          <IconButton onClick={props.toggleCity}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      )}
      {!props.favoriteCities.includes(props.city) && (
        <Tooltip title="save to favorites" placement="bottom">
          <IconButton onClick={props.toggleCity}>
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
      )}
    </FavoriteCityWrapper>
  );
}
