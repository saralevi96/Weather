import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Autocomplete from "@mui/material/Autocomplete";

export const ForecastWidgetsWrapper = styled.div`
   {
    margin-top: 3%;
  }
`;
export const BarPage = styled.div`
   {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const CardDescriptionWrapper = styled.div`
   {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
`;
export const Description = styled.h1`
   {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0;
  }
`;

export const FavoriteCityTitle = styled.div`
   {
    margin: 0;
    display: flex;
    flex-direction: row;
  }
`;
export const DateStyle = styled.h5`
   {
    color: #737373;
    margin: 0;
    padding: 0;
  }
`;

export const DegreesButton = styled.button`
   {
    background-color: white;
    border: none;
    vertical-align: middle;
    display: flex;
    align-items: center;
    color: #4d4d4d;
  }
`;
export const DegreesChoice = styled.div`
   {
    margin: 0;
    display: flex;
    flex-direction: row;

    .MuiTabs-indicator {
      display: none;
    }
  }
`;
export const DegreesButtonClick = styled.button`
   {
    background-color: white;
    border: none;
    vertical-align: middle;
    display: flex;
    align-items: center;
    font-weight: bold;
  }
`;

export const Separate = styled.h5`
   {
    vertical-align: middle;
    display: flex;
    align-items: center;
    color: #4d4d4d;
  }
`;

export const TabsStyle = styled(Tabs)`
   {
    display: flex;
    align-items: center;
  }
`;
