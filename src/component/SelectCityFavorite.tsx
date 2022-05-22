import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { FC } from "react";

const SelectCityFavoriteWrapper = styled(FormControl)`
   {
    display: flex;
    justify-content: flex-end;
    width: 20%;
  }
`;
const FavoriteCityItem = styled.div`
   {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
interface ISelectCityFavoriteProps {
  deleteFavoriteCity: (city: string) => void;
  updateCity: (city: string) => void;
  favoriteCities: string[];
}

export const SelectCityFavorite: FC<ISelectCityFavoriteProps> = ({
  deleteFavoriteCity,
  updateCity,
  favoriteCities,
}) => {
  return (
    <SelectCityFavoriteWrapper
      variant="standard"
      disabled={!favoriteCities.length}
    >
      <InputLabel id="demo-customized-select-label">Favorites</InputLabel>
      <Select>
        {favoriteCities.map((favoriteCity) => (
          <MenuItem value={favoriteCity}>
            <FavoriteCityItem>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => {
                  updateCity(favoriteCity);
                }}
              >
                {favoriteCity.charAt(0) +
                  favoriteCity.substring(1).toLocaleLowerCase()}
              </Button>
              <IconButton
                onClick={() => {
                  deleteFavoriteCity(favoriteCity);
                }}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </FavoriteCityItem>
          </MenuItem>
        ))}
      </Select>
    </SelectCityFavoriteWrapper>
  );
};
