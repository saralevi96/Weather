export const fetchForecast = async (
  city: string | null
): Promise<Forecast | null> => {
  if (!city) {
    return null;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=879803ac0f80e25472b15da30c4b7030`
  );
  const data = await response.json();
  const weather = data.list.map((listItem) => ({
    date: listItem.dt_txt,
    temperature: Number((listItem.main.temp - 273.15).toFixed(2)),
  }));
  console.log(`api`);
  console.log(weather);
  return {
    city,
    weather,
    description: data.list.map((listItem) => ({
      description: listItem.weather[0].main,
    })),
    iconId: data.list[0].weather[0].icon,
  };
};
