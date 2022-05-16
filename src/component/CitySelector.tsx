import * as React from "react";
import TextField from "@mui/material/TextField";
import CITIES_IL from "../data/cityIL.json";
import { getCurrentCity } from "../function/getCurrentCity2";
import { useState } from "react";

import {
  SearchCityWrapper,
  SearchCityStyle,
  SelectCity,
  LinkStyle,
  AutocompleteStyled,
} from "./SearchCityStyle";

const CITIES_NAMES: string[] = CITIES_IL.map((city: any) => city.name);

export function CitySelector(props: {
  updateCity: (city: string) => void;
  city: string;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const setCurrentCity = async () => {
    await getCurrentCity((currentCity) => {
      props.updateCity(currentCity as string);
      setInputValue(currentCity as string);
    });
  };

  const options = [
    ...new Set(
      CITIES_NAMES.filter((c: string) =>
        c.toUpperCase().includes(inputValue.toUpperCase())
      ).slice(0, 200)
    ),
  ];

  return (
    <SearchCityWrapper>
      <SelectCity>
        <SearchCityStyle>
          <AutocompleteStyled
            onChange={(event: any, newValue: string | null) => {
              if (newValue !== null) {
                props.updateCity(newValue);
                setInputValue(newValue);
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              if (!event) return;
              setInputValue(newInputValue);
              if (!newInputValue) {
                props.updateCity(newInputValue);
              }
            }}
            disablePortal
            id="combo-box-demo"
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search any city in the worlds"
              />
            )}
            style={{ height: 55, backgroundColor: "white", marginRight: 15 }}
          />
          <LinkStyle
            component="button"
            variant="body2"
            onClick={setCurrentCity}
          >
            use my current location
          </LinkStyle>
        </SearchCityStyle>
      </SelectCity>
    </SearchCityWrapper>
  );
}
