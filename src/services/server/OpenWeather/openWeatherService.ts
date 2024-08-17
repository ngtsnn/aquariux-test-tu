import axios from "axios";
import { HTTPInstance } from "../../http";
import { Coordinates } from "@/types/weather";

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY || "";
const OPEN_WEATHER_API =
  process.env.OPEN_WEATHER_API || "https://api.openweathermap.org";

class OpenWeatherService {
  openWeatherApi: HTTPInstance;

  constructor() {
    // http parts
    const _openWeatherApi = axios.create({
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    });
    _openWeatherApi.interceptors.request.use((config) => {
      const overridedParams = config.params ?? {};
      overridedParams.appid = OPEN_WEATHER_API_KEY;

      config.params = overridedParams;
      config.baseURL = OPEN_WEATHER_API;

      return config;
    });
    _openWeatherApi.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        throw err;
      }
    );
    this.openWeatherApi = _openWeatherApi;
  }

  async search(q: string) {
    const url = "/data/2.5/find";

    try {
      const results = await this.openWeatherApi.get(url, {
        params: {
          q,
          units: "metric",
        },
      });

      return results;
    } catch (error) {
      return {
        cod: 400,
        count: 0,
        list: [],
        message: "",
      };
    }
  }

  async getWeather(geoId: string) {
    const url = "/data/2.5/weather";

    const results = await this.openWeatherApi.get(url, {
      params: {
        id: geoId,
        units: "metric",
      },
    });
    return results;
  }

  async forecast(geo: Coordinates) {
    const url = "/data/2.5/forecast";

    try {
      const results = await this.openWeatherApi.get(url, {
        params: {
          ...geo,
          units: "metric",
        },
      });
      return results;
    } catch (error) {
      return {
        cod: 400,
        count: 0,
        list: [],
        message: "bad request",
      };
    }
  }
}

const openWeatherApi = new OpenWeatherService();
export default openWeatherApi;
