import { useMutation } from "@tanstack/react-query";
import {
  createVideoLike,
  deleteVideoLike,
} from "features/videos/likes/services/likesService";
import { toastifyClient } from "services/toastifyClient";
import { useState } from "react";
import { queryClient } from "services/queryClient";
import { Like } from "features/videos/likes/types";
import { Optional } from "types/optional";

interface UseToggleLikeProps {
  videoId: string;
}

// interface UseUnlikeVideoProps extends UseLikeVideoProps {}

export const useToggleLike = ({videoId}: UseToggleLikeProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSuccess = async () => {
    setIsDisabled(false);
    await queryClient.invalidateQueries({queryKey: ["videos"]});
  };

  const createLike = useMutation(async () => await createVideoLike(videoId), {
    onMutate: () => {
      setIsDisabled(true);
    },
    onError: (error: Error) => {
      toastifyClient.error({
        message: `${error.name}: ${error.message}`,
      });
    },
    onSuccess: handleSuccess,
  });

  const deleteLike = useMutation(async () => await deleteVideoLike(videoId), {
    onMutate: () => {
      setIsDisabled(true);
    },
    onError: (error: Error) => {
      toastifyClient.error({
        message: `${error.name}: ${error.message}`,
      });
    },
    onSuccess: handleSuccess,
  });

  const toggleLike = async (like: Optional<Like>) => {
    if (!like) return;
    if (like.status) {
      await deleteLike.mutate();
    } else {
      await createLike.mutate();
    }
  };

  return {
    isDisabled,
    toggleLike,
  };
};

// export const useUnLike = ({ videoId, onSuccess }: UseUnlikeVideoProps) => {
//   const [isDisabled, setIsDisabled] = useState(false);
//   const mutation = useMutation([], async () => await deleteVideoLike(videoId), {
//     onMutate: () => setIsDisabled(true),
//     onError: (error: Error) =>
//       toastifyClient.error({
//         message: `${error.name}: ${error.message}`,
//       }),
//     onSuccess: async () => {
//       await onSuccess();
//       setIsDisabled(false);
//     },
//   });
//   return {
//     mutation,
//     isDisabled,
//   };
// };
