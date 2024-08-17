import localStorageService from "@/services/client/LocalStorage";
import { Coordinates } from "@/types/weather";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GeoState {
  id: number;
  name: string;
  timezone?: string;
  timezone_offset?: number;
  geo: Coordinates;
}

const defaultGeo: GeoState = {
  id: 1566083,
  name: "Ho Chi Minh City",
  timezone: "Asia/Ho_Chi_Minh",
  timezone_offset: 25200,
  geo: {
    lat: 10.75,
    lon: 106.6667,
  },
};

export const useGeoStore = create<GeoState>()(
  persist(() => defaultGeo, {
    name: "geo-storage",
    storage: localStorageService,
  })
);

export const mutateGeo = useGeoStore.setState;
