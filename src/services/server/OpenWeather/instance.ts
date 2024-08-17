import OpenWeatherAPI from "openweather-api-node";

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY || "";

const weatherService = new OpenWeatherAPI({
  key: OPEN_WEATHER_API_KEY,
});

export default weatherService;
