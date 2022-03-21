export function getCurrentCity(onCityFound: (city: string | null) => void) {
  const onSuccess = async (location: any) => {
    console.log(`location`, location);
    const city = await getCity(
      location.coords.latitude,
      location.coords.longitude
    );
    onCityFound(city);
  };
  const onError = (error: any) => {
    console.log("Failed get cordinates", error);
    return null;
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

export async function getCity(lat: number, lon: number) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=879803ac0f80e25472b15da30c4b7030`
    );
    const data = await response.json();
    console.log(`fetch forcast data`, data);
    return data.city.name;
  } catch {
    console.error("error");
    return null;
  }
}
