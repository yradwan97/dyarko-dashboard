import React, { MouseEventHandler } from "react";
import { Typography } from "components/shared/UI";
import { User } from "features/users/types";
import { Optional } from "types/optional";
import Avatar from "features/users/components/Avatar";

type CommentProps = {
  children: string;
  user: Optional<User>;
};

function VideoCommentItem({ user, children }: CommentProps) {
  const handleLikeClick: MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-x-2">
        <Avatar userName={user?.name as string} link={`/owners/${user?.id}`} />
        <Typography variant="h5" as="h5" className="ml-2 text-lg font-bold">
          {user?.name}
        </Typography>
      </div>
      <div className="pl-12">
        <Typography
          variant="body-sm-medium"
          as="p"
          className="mb-2 overflow-x-hidden text-ellipsis text-gray-700"
        >
          {children}
        </Typography>
        {/*<LikeItem*/}
        {/*  commentsCount={4}*/}
        {/*  likesCount={5}*/}
        {/*  isLiked={true}*/}
        {/*  onLike={handleLikeClick}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

export default VideoCommentItem;
