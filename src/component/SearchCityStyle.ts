import styled from "styled-components";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

export const SearchCityWrapper = styled.div`
   {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;
export const SearchCityStyle = styled.div`
   {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const ShowFavoriteListCity = styled.div`
   {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
export const ShowFavoriteCity = styled.div`
   {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;
export const SelectCity = styled.div`
   {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 2;
  }
`;

export const ShowFavoriteCitys = styled.div`
   {
    flex: 1;
  }
`;
export const BoxStyle = styled(Box)`
   {
    overflow: scroll;
    width: 100%;
    height: 200px;
    max-width: 360px;
    background-color: white;
  }
`;

export const LinkStyle = styled(Link)`
   {
    width: 30%;
    margin: 0;
    padding: 0;
  }
`;

export const AutocompleteStyled = styled(Autocomplete)`
   {
    width: 100%;
  }
`;
//
// export const AutocompleteDesign = styled(Autocomplete)`{
//   color: white;
//  margin-left: 0;
// }`
