export interface WeatherForecastItemDto {
  city: City;
  cnt: number;
  list: Array<WeatherForecast>;
  message: number;
}

interface City {
  coord: Coord;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface WeatherForecast {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: SingleForecast;
  pop: number;
  snow: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  visibility: number;
  weather: Array<WeatherSettings>;
  wind: Wind;
}

interface SingleForecast {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface WeatherSettings {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Wind {
  deg: number;
  gust: number;
  speed: number;
}
