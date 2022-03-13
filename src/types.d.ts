type Forcast = { 
    city : string,
    descriptionToday:string,
    weather:Weather
}|null

type Weather = { 
    date: string,
    temperature: number
    
}[]