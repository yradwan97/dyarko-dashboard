import { BalanceTransactionFilter } from "features/wallet";
import { defaultFilter } from "configs/defaultFilter";
import { useEffect, useReducer } from "react";
import useUrlFilter from "hooks/useUrlFilter";

export enum BALANCE_TRANSACTIONS_FILTER {
  PAGE = "page",
  SIZE = "size",
}

const reducer = (
  state: BalanceTransactionFilter,
  action: Action
): BalanceTransactionFilter => {
  const { filter, value, updateAll = false } = action;

  if (updateAll) {
    return { ...state, ...value };
  }

  if (!filter) return state;

  const filterKey = filter.toString() as keyof BalanceTransactionFilter;
  const newState: Record<string, any> = { ...state };
  newState[filterKey] = value;
  return newState;
};

interface Action {
  updateAll?: boolean;
  filter?: BALANCE_TRANSACTIONS_FILTER;
  value: any;
}

export const useBalanceTransFilterReducer = (
  initValue: BalanceTransactionFilter = defaultFilter
) => {
  const { urlParams, isLoading, setUrlParams } = useUrlFilter(
    Object.values(BALANCE_TRANSACTIONS_FILTER)
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
