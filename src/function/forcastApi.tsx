export const fetchForcast = async (city: string | null) => {
  if (!city) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=879803ac0f80e25472b15da30c4b7030`,
    );
    const data = await response.json();
    console.log(`fetch forcast data`, data);
    const weather = data.list.map((listItem) => ({
      date: listItem.dt_txt,
      temperature: Number((listItem.main.temp - 273.15).toFixed(2))
    }));
    console.log(`api`)
    console.log(weather)
    return {
      city: data.city.name,
      weather,
      descriptionToday: data.list[0].weather[0].main,
      iconId:data.list[0].weather[0].icon
    };
  } catch {
    console.error('error');
    return null;
  }
};
