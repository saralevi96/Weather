type Forecast = {
    city : string,
    descriptionToday:string,
    weather:Weather,
    iconId:string
}|null

type Weather = {
    date: string,
    temperature: number,
    temperatureMin?:number
    temperatureMax?:number
}[]