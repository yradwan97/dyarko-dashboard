import { useQuery } from "@tanstack/react-query";
import {
  getAllVideos,
  GetAllVideosResponse,
} from "features/videos/services/api/videosService";
import { VideosFilter } from "features/videos/types";
import { queryClient } from "services/queryClient";

export const VIDEOS_KEY = "videos";

export interface UseGetVideosProps {
  filter: VideosFilter;
}

function useGetVideos({ filter }: UseGetVideosProps) {
  const { isLoading, isError, data, isSuccess, error } = useQuery<
    GetAllVideosResponse,
    Error
  >([VIDEOS_KEY, { ...filter }], () => getAllVideos(filter));

  const refetch = () => queryClient.refetchQueries([VIDEOS_KEY, { ...filter }]);

  return { isLoading, isError, isSuccess, data, error, refetch };
}

export default useGetVideos;
