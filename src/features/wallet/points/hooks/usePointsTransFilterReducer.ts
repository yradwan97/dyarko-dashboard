import { PointsTransactionFilter } from "features/wallet";
import { defaultFilter } from "configs/defaultFilter";
import { useEffect, useReducer } from "react";
import useUrlFilter from "hooks/useUrlFilter";

export enum POINTS_TRANSACTIONS_FILTER {
  PAGE = "page",
  SIZE = "size",
}

const reducer = (
  state: PointsTransactionFilter,
  action: Action
): PointsTransactionFilter => {
  const { filter, value, updateAll = false } = action;

  if (updateAll) {
    return { ...state, ...value };
  }

  if (!filter) return state;

  const filterKey = filter.toString() as keyof PointsTransactionFilter;
  const newState: Record<string, any> = { ...state };
  newState[filterKey] = value;
  return newState;
};

interface Action {
  updateAll?: boolean;
  filter?: POINTS_TRANSACTIONS_FILTER;
  value: any;
}

export const usePointsTransFilterReducer = (
  initValue: PointsTransactionFilter = defaultFilter
) => {
  const { urlParams, isLoading, setUrlParams } = useUrlFilter(
    Object.values(POINTS_TRANSACTIONS_FILTER)
  );
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
