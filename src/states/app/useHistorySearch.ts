import localStorageService from "@/services/client/LocalStorage";
import { Coordinates } from "@/types/weather";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SearchState {
  search: string[];
}

const defaultHistorySearch: SearchState = {
  search: [],
};

export const useHistorySearch = create<SearchState>()(
  persist(() => defaultHistorySearch, {
    name: "history-search",
    storage: localStorageService,
  })
);

export const addSearch = (q: string) =>
  useHistorySearch.setState((s) => {
    const search = s.search;
    search?.unshift(q);
    return {
      search: search.slice(0, 6),
    };
  });

export const removeSearch = (idx: number) =>
  useHistorySearch.setState((s) => {
    const search = s.search;
    return {
      search: search.filter((_, index) => index !== idx),
    };
  });
