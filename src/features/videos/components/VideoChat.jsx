import React from "react";
import Button from "components/shared/UI/buttons/Button";
import Comment from "features/videos/components/Comment";
import { BsChat, BsFillPlayCircleFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function VideoChat() {
  return (
    <>
      <Link
        to="/"
        className="text-gray-500 text-base font-bold flex items-center gap-x-2 my-6"
      >
        <HiOutlineArrowNarrowLeft />
        <span>Back to Dashboard</span>
      </Link>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative bg-vedioImg bg-cover bg-center">
          <BsFillPlayCircleFill className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-black/40 cursor-pointer" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col rounded-lg bg-white border border-main-200">
          <div className="py-2 px-1">
            <div className="flex justify-between items-center w-full mt-5 mb-3 px-6">
              <div className="flex items-center gap-x-4">
                <div className="flex flex-col space-y-2">
                  <FiHeart className="text-main-600 text-lg" />
                  <span className="text-black text-xs font-bold">133k</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <BsChat className="text-main-600 text-lg" />
                  <span className="text-black text-xs font-bold">133k</span>
                </div>
              </div>
              <div
                className={`rounded-md bg-main-100 py-1 px-4 text-center border border-main-600`}
              >
                <span className="text-main-600 text-sm font-bold capitalize">
                  Promote
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 relative grow">
            <h6 className="text-base font-bold text-black mb-6">Comments</h6>
            <Comment />
            <Comment>
              <Comment>
                <Comment />
              </Comment>
            </Comment>
            <div className="absolute bg-white flex bottom-0 left-0 right-0 py-3 px-6 gap-x-4">
              <Button
                variant="input"
                placeholder="Leave a comment"
                className="grow !font-medium !text-sm !placeholder-gray-400 !rounded-2xl !border !border-gray-200"
              />
              <span className="bg-main-600 w-12 h-12 rounded-2xl flex justify-center items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0698 5.50995L6.50978 1.22995C0.759776 -1.65005 -1.60022 0.709951 1.27978 6.45995L2.14978 8.19995C2.39978 8.70995 2.39978 9.29995 2.14978 9.80995L1.27978 11.54C-1.60022 17.2899 0.749775 19.65 6.50978 16.77L15.0698 12.4899C18.9098 10.57 18.9098 7.42995 15.0698 5.50995ZM11.8398 9.74995H6.43977C6.02978 9.74995 5.68977 9.40995 5.68977 8.99995C5.68977 8.58995 6.02978 8.24995 6.43977 8.24995H11.8398C12.2498 8.24995 12.5898 8.58995 12.5898 8.99995C12.5898 9.40995 12.2498 9.74995 11.8398 9.74995Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoChat;
