export type Coordinates = {
  lat: number;
  lon: number;
};

export type WeatherCondition = {
  /**
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: number;
  /**
   * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feels_like: number;
  temp_min: number;
  temp_max: number;
  /**
   * Atmospheric pressure on the sea level, hPa
   */
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type WindData = {
  /**
   * Wind speed
   */
  speed: number;
  /**
   * Wind gust
   */
  gust: number | undefined;
  /**
   * Wind direction, degrees (meteorological)
   */
  deg: number;
};

export type WeatherRecap = {
  /**
   * Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
   */
  id: number;
  /**
   * Group of weather parameters (Rain, Snow, Extreme etc.)
   */
  main: string;
  /**
   * Description of the weather
   */
  description: string;

  /**
   * id of icon img
   */
  icon: string;
};

export type GeoWeather = {
  id: number;
  name: string;
  coord: Coordinates;
  main: WeatherCondition;
  /**
   * Datetime: last update time in second
   */
  dt: number;
  /**
   * Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
   */
  wind: WindData;
  sys: {
    country: string;
  };
  visibility: number;
  /**
   * Precipitation volume, mm
   */
  rain: Record<string, number> | null;
  /**
   * Snow volume, mm
   */
  snow: Record<string, number> | null;
  /**
   * Cloudiness, %
   */
  clouds: {
    all: number;
  };
  weather: WeatherRecap[];
};


export type PaginationRes<D = unknown> = {
  message: string;
  cod: string | number;
  count: number;
  list: D[];
};

export type Forecast = {
  dt: number;
  main: WeatherCondition;
  weather: WeatherRecap[];
  clouds: {
    all: number;
  };
  wind: WindData;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};
