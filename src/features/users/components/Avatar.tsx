import React from "react";
import { Typography } from "components/shared/UI";
import { CheckOutline } from "components/shared/icons";

type AvatarProps = {
  userName: string;
  link: string;
  userImg?: string;
  className?: string;
  isVerified?: boolean;
};

const Avatar = ({ userName, userImg, isVerified, className }: AvatarProps) => {
  const generateProfileImg = (name: string): string => {
    const names = name?.split(" ").slice(0, 2);
    return names?.reduce(
      (prev, curr) => prev.concat(curr[0].toUpperCase()),
      ""
    );
  };
  return (
    <div
      className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-main-600 p-2 ${
        className || ""
      }`.trimEnd()}
    >
      {userImg ? (
        <img
          className="h-full w-full object-cover"
          src={userImg}
          alt={userName}
        />
      ) : (
        <Typography variant="body-lg-bold" className="text-white" as="span">
          {generateProfileImg(userName)}
        </Typography>
      )}
      {isVerified ? (
        <div className="absolute top-[70%] right-0 flex h-3 w-3 items-center justify-center rounded-full border border-white bg-green">
          <CheckOutline className="h-2 w-2 stroke-white" />
        </div>
      ) : null}
    </div>
  );
};

export default Avatar;
