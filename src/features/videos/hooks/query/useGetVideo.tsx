import { useQuery } from "@tanstack/react-query";
import {
  getVideoById,
  GetVideoResponse,
} from "features/videos/services/api/videosService";

const KEY = "videos";

function useGetVideo(id: string) {
  const { isLoading, isError, data, isSuccess } = useQuery<
    GetVideoResponse,
    Error
  >([KEY, id], () => getVideoById(id));

  return { isLoading, isError, isSuccess, data };
}

export default useGetVideo;
