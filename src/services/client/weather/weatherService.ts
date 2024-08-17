import { Forecast, GeoWeather, PaginationRes } from "@/types/weather";
import httpService from "../../http";
import { Coordinates } from "openweather-api-node";
import { API_FORECAST, API_SEARCH, API_WEATHER } from "./api";
import { GeoState, mutateGeo } from "@/states/app/useGeo";
import { emptyArray } from "@/constants/misc";

export class WeatherService {
  constructor() {}

  async search(q: string): Promise<PaginationRes<GeoWeather>> {
    try {
      const res = await httpService.get<PaginationRes<GeoWeather>>(API_SEARCH, {
        params: {
          q,
        },
      });
      return res;
    } catch (error) {
      return {
        cod: 400,
        count: 0,
        list: emptyArray,
        message: "bad request",
      };
    }
  }

  async getWeather(geoId: number): Promise<GeoWeather | null> {
    try {
      const res = await httpService.get<GeoWeather | null>(API_WEATHER, {
        params: {
          geoId,
        },
      });
      if (typeof res !== "object") {
        return null;
      }

      // TODO: Handle the better validation
      if (
        typeof res?.coord?.lat === "number" &&
        typeof res.coord?.lon === "number"
      ) {
        const cacheGeo: GeoState = {
          id: geoId,
          geo: res.coord,
          name: res.name,
        };
        mutateGeo(cacheGeo);
      }

      return res;
    } catch (error) {
      return null;
    }
  }

  async forecast(coords: Coordinates): Promise<PaginationRes<Forecast>> {
    try {
      const res = await httpService.get<PaginationRes<Forecast>>(API_FORECAST, {
        params: {
          lon: coords.lon,
          lat: coords.lat,
        },
      });
      return res;
    } catch (error) {
      return {
        cod: 400,
        count: 0,
        list: emptyArray,
        message: "bad request",
      };
    }
  }
}

const weatherService = new WeatherService();

export default weatherService;
