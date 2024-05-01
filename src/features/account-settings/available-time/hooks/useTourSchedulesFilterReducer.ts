import { TourSchedulesFilter } from "features/account-settings/available-time/types";
import { defaultFilter } from "configs/defaultFilter";
import useUrlFilter from "hooks/useUrlFilter";
import { useEffect, useReducer } from "react";

export enum TOUR_SCHEDULES_FILTER {
  PAGE = "page",
  SIZE = "size",
}

interface Action {
  updateAll?: boolean;
  filter?: TOUR_SCHEDULES_FILTER;
  value: any;
}

const reducer = (
  state: TourSchedulesFilter,
  action: Action
): TourSchedulesFilter => {
  const { filter, value, updateAll = false } = action;

  if (updateAll) {
    return { ...state, ...value };
  }

  if (!filter) return state;

  const filterKey = filter.toString() as keyof TourSchedulesFilter;
  const newState: Record<string, any> = { ...state };
  newState[filterKey] = value;
  return newState;
};

export const useTourSchedulesFilterReducer = (
  initValue: TourSchedulesFilter = defaultFilter
) => {
  const { urlParams, isLoading, setUrlParams } =
    useUrlFilter<TourSchedulesFilter>(Object.values(TOUR_SCHEDULES_FILTER));
  const [filter, dispatch] = useReducer(reducer, initValue);

  useEffect(() => {
    if (isLoading) return;
    dispatch({ updateAll: true, value: urlParams });
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    setUrlParams(filter);
  }, [filter]);

  return [filter, dispatch] as const;
};
