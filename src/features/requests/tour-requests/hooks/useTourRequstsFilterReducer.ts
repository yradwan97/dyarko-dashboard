import { useFilterReducer } from "hooks";
import { defaultFilter } from "configs/defaultFilter";
import { TourRequestsFilter } from "features/requests/tour-requests/types";

export enum TOUR_REQUESTS_FILTER {
  PAGE = "page",
  SIZE = "size",
}

export const useTourRequestsFilterReducer = (
  initValue: TourRequestsFilter = defaultFilter
) => {
  return useFilterReducer<TourRequestsFilter, TOUR_REQUESTS_FILTER>(
    initValue,
    TOUR_REQUESTS_FILTER
  );
};
