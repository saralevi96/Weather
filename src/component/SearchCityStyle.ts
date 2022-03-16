import styled from "styled-components";
import Box from "@mui/material/Box";

export  const SearchCityWrapper = styled.div `{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}`
export const SearchCityStyle  = styled.div `{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}`
export const ShowFavoriteListCity = styled.div `{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}`
export const ShowFavoriteCity =styled.div `{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}`
export const SelectCity =styled.div ` {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 2;
}`

export const ShowFavoriteCitys = styled.div`{
  flex: 1;
}`
 export const BoxStyle = styled(Box)`{
  overflow: scroll;
  width: 100%;
  height: 250px;
  max-width: 360px;
  background-color: white;
}`
