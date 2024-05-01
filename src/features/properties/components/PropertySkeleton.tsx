import { Skeleton } from "@mui/material";
import clsx from "classnames";

const PropertySkeleton = () => {
  const array = Array(2).fill(0);
  return (
    <div className="flex-1">
      <Skeleton variant="rectangular" height="14rem" />
      <div
        className={clsx(
          "bg-white",
          "py-8",
          "px-6",
          "border",
          "border-main-100"
        )}
      >
        <div className={clsx("flex", "justify-between", "items-center")}>
          <Skeleton width="3rem" />
          <Skeleton variant="rounded" width="5rem" height="3rem" />
        </div>
        <Skeleton>
          <h4 className="mt-1 text-black font-medium">lorem ipsum lorem</h4>
        </Skeleton>
        <Skeleton>
          <p className="text-gray-500 my-2 text-sm font-medium">
            13086 Safat, Kuwait City
          </p>
        </Skeleton>
        <div className="border-t border-main-100 flex gap-x-4 items-center mt-5 pt-3">
          {array.map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-x-2"
            >
              <Skeleton variant="circular" width="1rem" height="1rem" />
              <Skeleton>
                <p className="text-black text-sm font-medium">3 Likes</p>
              </Skeleton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySkeleton;
