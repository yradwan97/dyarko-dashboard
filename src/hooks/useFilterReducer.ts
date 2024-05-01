import { useEffect, useReducer } from "react";
import useUrlFilter from "hooks/useUrlFilter";

interface FilterAction<FilterEnum> {
  updateAll?: boolean;
  filter?: FilterEnum;
  value: any;
}

const createFilterReducer =
  <TFilter extends Object, FilterEnum extends Object>() =>
  (state: TFilter, action: FilterAction<FilterEnum>): TFilter => {
    const { filter, value, updateAll = false } = action;

    if (updateAll) {
      return { ...state, ...value };
    }

    if (!filter) return state;

    const filterKey = filter.toString() as keyof TFilter;
    const newState: Record<keyof TFilter, any> = { ...state };
    newState[filterKey] = value;
    return newState;
  };

export const useFilterReducer = <
  TFilter extends Object,
  FilterEnum extends Object
>(
  initValue: TFilter,
  filterEnum: any
) => {
  const { urlParams, isLoading, setUrlParams } = useUrlFilter<TFilter>(
    Object.values(filterEnum)
  );
  const [filter, dispatch] = useReducer(
    createFilterReducer<TFilter, FilterEnum>(),
    initValue
  );

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
