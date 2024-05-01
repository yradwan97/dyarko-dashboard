import { useEffect, useReducer } from "react";
import { VideosFilter } from "../types";
import { defaultFilter } from "configs/defaultFilter";
import useUrlFilter from "hooks/useUrlFilter";

export enum VIDEOS_FILTER {
  PAGE = "page",
  SIZE = "size",
  PINNED = "pinned",
  COMMENTS = "comments",
  TITLE = "title",
}

interface Action {
  updateAll?: boolean;
  filter?: VIDEOS_FILTER;
  value: any;
}

const reducer = (state: VideosFilter, action: Action): VideosFilter => {
  const { filter, value, updateAll = false } = action;

  if (updateAll) {
    return { ...state, ...value };
  }

  if (!filter) return state;

  const filterKey = filter.toString() as keyof VideosFilter;
  const newState: Record<string, any> = { ...state };
  newState[filterKey] = value;
  return newState;
};

function useVideosFilterReducer(initValue: VideosFilter = defaultFilter) {
  const { urlParams, isLoading, setUrlParams } = useUrlFilter(
    Object.values(VIDEOS_FILTER)
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

export default useVideosFilterReducer;
