import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { FC } from "react";
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
interface IFavoriteProps {
  isInFavorite: boolean;
  updateFavorite: () => void;
}
export const FavoriteToggle: FC<IFavoriteProps> = ({
  isInFavorite,
  updateFavorite,
}) => {
  return (
    <FavoriteCityWrapper>
      {isInFavorite ? (
        <Tooltip title="remove from favorites" placement="bottom">
          <IconButton onClick={updateFavorite}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="save to favorites" placement="bottom">
          <IconButton onClick={updateFavorite}>
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
      )}
    </FavoriteCityWrapper>
  );
};
