import { API_SEARCH, API_WEATHER } from "@/services/client/weather/api";
import weatherService from "@/services/client/weather/weatherService";
import useSWR from "swr";

export const useForecast = (lon: number, lat: number) => {
  const param = new URLSearchParams({
    lon: lon?.toString(),
    lat: lat?.toString(),
  });
  const key =
    typeof lon === "number" || typeof lat === "number"
      ? API_SEARCH + "?" + param.toString()
      : null;

  const swrResponse = useSWR(
    key,
    async () => {
      const data = await weatherService.forecast({ lon, lat });
      return data;
    },
    {
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );
  return swrResponse;
};
