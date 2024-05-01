import { useQuery } from "@tanstack/react-query";
import {
  getAllComments,
  GetAllCommentsReturn,
} from "features/videos/comments/services/commentsService";
import { CommentsFilter } from "features/videos/comments/types";
import { Optional } from "types/optional";

const KEY = "comments";

export interface useGetVideoCommentsProps {
  videoId: Optional<string>;
  filter: CommentsFilter;
}

function useGetVideoComments({ videoId, filter }: useGetVideoCommentsProps) {
  const { isLoading, isError, data, isSuccess, error } = useQuery<
    GetAllCommentsReturn,
    Error
  >(
    [videoId, KEY, filter.page],
    () => getAllComments(videoId as string, { ...filter }),
    {
      enabled: !!videoId,
    }
  );
  return { isLoading, isError, isSuccess, data, error };
}

export default useGetVideoComments;
