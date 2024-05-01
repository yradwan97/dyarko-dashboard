import React, { useEffect, useState } from "react";
import { useGetReviews } from "../hooks/useGetReviews";
import { OwnerReview } from "../types/types";
import OwnerReviewCard from "../components/OwnerReviewCard";
import { Typography } from "components/shared/UI";
import Pagination from "react-js-pagination";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { t } from "i18next";

const MyReviews = () => {
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetReviews(page , 9);
  useEffect(() => {
    refetch()
  }, [page])
  return (
    <>
      <Typography className="text-center mb-2" variant="body-lg-medium" as="h1">
        {t("account.reviews.my-reviews")}
      </Typography>
      {data && data!.reviews.length > 0 ? (
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}
        >
          {data!.reviews?.map((review: OwnerReview, index: number) => (
            <OwnerReviewCard key={index} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col rounded-lg p-2 border border-main-500 w-full m-1 mt-4">
          <Typography variant="h3" as="h3" className="text-center">
            {t("account.reviews.no-reviews")}
          </Typography>
        </div>
      )}
      <Pagination
          innerClass="flex justify-center items-center mt-10 gap-x-4"
          itemClass="page-item w-8 h-8 bg-white text-sm text-gray-500 shadow rounded-full flex justify-center items-center cursor-pointer"
          activeClass="!bg-main-600 !text-black"
          itemClassPrev="!bg-inherit !shadow-inherit"
          prevPageText={<BiChevronLeft className='text-main-600 text-xl'/>}
          itemClassNext="!bg-inherit !shadow-inherit"
          nextPageText={<BiChevronRight className='text-main-600 text-xl'/>}
          hideFirstLastPages={true}
          activePage={page}
          itemsCountPerPage={9}
          totalItemsCount={data?.itemsCount}
          pageRangeDisplayed={data?.pages || 0}
          onChange={(e) => setPage(e)}
        />
    </>
  );
};

export default MyReviews;
