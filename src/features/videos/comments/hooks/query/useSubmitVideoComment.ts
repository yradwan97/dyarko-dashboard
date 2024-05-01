import { useMutation } from "@tanstack/react-query";
import {
  GetAllCommentsReturn,
  GetCommentResponse,
  postComment,
} from "features/videos/comments/services/commentsService";
import { queryClient } from "services/queryClient";
import { VideoComment } from "features/videos/comments/types";
import { Id } from "react-toastify";
import { useContext, useRef } from "react";
import { Toastify } from "providers/ToastifyProvider";

const KEY = "comments";

type UseSubmitVideoCommentProps = {
  videoId: string;
  page: string;
  onSuccess?: () => void;
  onLoading?: () => void;
  onError?: (error: Error) => void;
};

export const useSubmitVideoComment = ({
  videoId,
  page,
}: UseSubmitVideoCommentProps) => {
  const queryKey = [videoId, KEY, page];
  const toastifyClient = useContext(Toastify);
  const toastId = useRef<Id | null>(null);
  return useMutation<GetCommentResponse, Error, VideoComment>({
    mutationFn: postComment,
    onMutate: () => {
      toastId.current = toastifyClient.loading({ message: "Please wait..." });
    },
    onError: (error: Error) =>
      toastId.current &&
      toastifyClient.error({
        message: `${error.name}: ${error.message}`,
        id: toastId.current,
      }),
    onSuccess: async (data) => {
      queryClient.setQueryData<GetAllCommentsReturn>(queryKey, (oldData) => {
        if (!oldData) return;
        const newData = { ...oldData };
        newData.comments.unshift(data.comment);
        return newData;
      });
      toastId.current &&
        toastifyClient.success({
          message: "Your comment submitted successfully!",
          id: toastId.current,
        });
    },
  });
};
