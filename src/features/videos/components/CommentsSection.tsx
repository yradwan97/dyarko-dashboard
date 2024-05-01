import { Typography } from "components/shared/UI";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import { defaultFilter } from "configs/defaultFilter";
import { Id } from "react-toastify";
import VideoCommentsList from "features/videos/comments/components/VideoCommentsList";
import AddCommentForm from "features/videos/comments/components/AddCommentForm";
import { useSubmitVideoComment } from "features/videos/comments/hooks/query/useSubmitVideoComment";
import useGetVideoComments from "features/videos/comments/hooks/query/useGetVideoComments";
import { Optional } from "types/optional";
import { Video } from "features/videos";
import { t } from "i18next";

type VideoCommentsPanelProps = {
  video: Optional<Video>;
};

const CommentsSection = ({ video }: VideoCommentsPanelProps) => {
  const [commentInputValue, setCommentInputValue] = useState("");
  const videoId = video?._id as string;
  const { isLoading, isError, isSuccess, data, error } = useGetVideoComments({
    videoId,
    filter: defaultFilter,
  });
  const comments = data?.comments;
  const toastId = useRef<Id | null>(null);

  const mutation = useSubmitVideoComment({
    videoId,
    page: String(data?.pages),
  });

  const handleCommentSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutation.mutate({
      comment_body: commentInputValue,
      video: videoId,
    });
    setCommentInputValue("");
  };

  const handleCommentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const commentInputText = e.target.value;
    setCommentInputValue(commentInputText);
  };

  const isSubmitButtonDisabled = commentInputValue.trim() === "";

  return (
    <>
      <Typography variant="h5" as="h4">
        {t("general.comments")}
      </Typography>
      <div className="relative flex h-full flex-grow flex-col justify-between overflow-y-auto">
        {/*{isLoading ? <Loader isFullScreen={false} /> : null}*/}
        <div className="overflow-y-auto p-3">
          <div className="px-8">
            {isSuccess ? <VideoCommentsList comments={comments} /> : null}
          </div>
        </div>
        <AddCommentForm
          onCommentChange={handleCommentChange}
          commentInputValue={commentInputValue}
          isSubmitButtonDisabled={isSubmitButtonDisabled}
          onSubmitComment={handleCommentSubmit}
        />
      </div>
    </>
  );
};

export default CommentsSection;
