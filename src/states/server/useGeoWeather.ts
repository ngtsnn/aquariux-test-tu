import { API_WEATHER } from "@/services/client/weather/api";
import weatherService from "@/services/client/weather/weatherService";
import useSWR from "swr";

export const useGeoWeather = (geoId?: number) => {
  const param = new URLSearchParams({ geoId: geoId?.toString() ?? '' });
  const key = geoId ? API_WEATHER + "?" + param.toString() : null;

  const swrResponse = useSWR(
    key,
    async () => {
      try {
        const data = await weatherService.getWeather(geoId!);
        return data;
      } catch (error) {
        return null;
      }
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
