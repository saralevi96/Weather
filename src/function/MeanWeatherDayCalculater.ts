import _ from "lodash";

export const meanWeatherDayCalculater = (convertedWeather): Weather => {
  const weatherDayGroup = _.groupBy(convertedWeather, (w) =>
    new Date(w.date).toDateString()
  );
  const timeNight = [18, 21, 0, 3];
  const timeMorning = [6, 9, 12, 15];
  const weatherNight: Weather = convertedWeather.filter((item) =>
    timeNight.includes(new Date(item.date).getHours())
  );
  const weatherNightDayGroup = _.groupBy(weatherNight, (w) =>
    new Date(w.date).toDateString()
  );
  const weatherMorning: Weather = convertedWeather.filter((item) =>
    timeMorning.includes(new Date(item.date).getHours())
  );
  const weatherMorningDayGroup = _.groupBy(weatherMorning, (w) =>
    new Date(w.date).toDateString()
  );

  return Object.keys(weatherDayGroup).map((dailyDate) => ({
    date: dailyDate,
    temperature: _.meanBy(weatherDayGroup[dailyDate], "temperature").toFixed(2),
    nightTimeTemperature: _.meanBy(
      weatherNightDayGroup[dailyDate],
      "temperature"
    ).toFixed(2),
    dayTimeTemperature: _.meanBy(
      weatherMorningDayGroup[dailyDate],
      "temperature"
    ).toFixed(2),
  }));
};
