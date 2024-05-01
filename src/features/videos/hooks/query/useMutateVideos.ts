import { useMutation } from "@tanstack/react-query";
import { hideAddVideoModal, postVideo, VIDEOS_KEY } from "features/videos";
import { toastifyClient } from "services/toastifyClient";
import { queryClient } from "services/queryClient";
import { useAppDispatch } from "hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";

export const useMutateVideos = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createVideoMutation = useMutation({
    mutationFn: postVideo,
    onError: (error: Error) => toastifyClient.error({ message: error.message }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [VIDEOS_KEY] });
      dispatch(hideAddVideoModal());
      navigate(ROUTES.VIDEOS);
    },
  });
  const createVideo = (video: FormData) => {
    createVideoMutation.mutate(video);
  };
  return { createVideo };
};
