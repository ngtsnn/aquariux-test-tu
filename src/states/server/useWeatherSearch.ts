import { API_SEARCH, API_WEATHER } from "@/services/client/weather/api";
import weatherService from "@/services/client/weather/weatherService";
import useSWR from "swr";

export const useWeatherSearch = (q: string) => {
  const param = new URLSearchParams({ q });
  const key = API_SEARCH + "?" + param.toString();

  const swrResponse = useSWR(
    key,
    async () => {
      const data = await weatherService.search(q);
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
