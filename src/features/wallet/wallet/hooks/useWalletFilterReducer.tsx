import { WalletFilter } from "features/wallet";
import { walletFilter } from "configs/defaultFilter";
import { useEffect, useReducer } from "react";
import useUrlFilter from "hooks/useUrlFilter";

export enum WALLET_FILTER {
  PAGE = "page",
  TYPE = "type"
}

const reducer = (
  state: WalletFilter,
  action: Action
): WalletFilter => {
  const { filter, value, updateAll = false } = action;

  if (updateAll) {
    return { ...state, ...value };
  }

  if (!filter) return state;

  const filterKey = filter.toString() as keyof WalletFilter;
  const newState: Record<string, any> = { ...state };
  newState[filterKey] = value;
  return newState;
};

interface Action {
  updateAll?: boolean;
  filter?: WALLET_FILTER;
  value: any;
}

export const useWalletFilterReducer = (
  initValue: WalletFilter = walletFilter
) => {
  const { urlParams, isLoading, setUrlParams } = useUrlFilter(
    Object.values(WALLET_FILTER)
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
