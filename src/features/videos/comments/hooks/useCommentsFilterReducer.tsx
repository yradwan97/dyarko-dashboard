import { useEffect, useReducer } from "react";
import { CommentsFilter } from "features/videos/comments/types";
import { defaultFilter } from "configs/defaultFilter";
import useUrlFilter from "hooks/useUrlFilter";

export enum FILTER {
  PAGE = "page",
  SIZE = "size",
}

interface Action {
  updateAll?: boolean;
  filter?: FILTER;
  value: any;
}

const reducer = (state: CommentsFilter, action: Action): CommentsFilter => {
  const { filter, value, updateAll = false } = action;

  if (updateAll) {
    return { ...state, ...value };
  }

  if (!filter) return state;

  const filterKey = filter.toString() as keyof CommentsFilter;
  const newState: Record<string, any> = { ...state };
  newState[filterKey] = value;
  return newState;
};

function useCommentsFilterReducer(initValue: CommentsFilter = defaultFilter) {
  const { urlParams, isLoading, setUrlParams } = useUrlFilter(
    Object.values(FILTER)
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
}

export default useCommentsFilterReducer;
