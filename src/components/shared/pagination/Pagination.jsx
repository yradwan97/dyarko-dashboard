import React from "react";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Typography } from "components/shared/UI";
import { t } from "i18next";

const PAGE_SIZE = 10;

const Pagination = (props) => {
  const { currentPage, pagesCount, itemsCount, onPageChange } = props;
  const isNextDisabled = currentPage >= pagesCount - 1;
  const isPrevDisabled = currentPage <= 0;
  const minRange = 1 + PAGE_SIZE * currentPage;
  const maxRang =
    (currentPage + 1) * PAGE_SIZE > itemsCount
      ? itemsCount
      : (currentPage + 1) * PAGE_SIZE;

  const nextClickHandler = () => {
    if (isNextDisabled) return;
    const newPage = currentPage + 2;
    onPageChange(newPage);
  };
  const prevClickHandler = () => {
    if (isPrevDisabled) return;
    onPageChange(currentPage);
  };

  return (
    <div className="mt-7 flex items-center justify-between md:px-6">
      <Typography variant="body-sm-medium" as="span" className="text-black">
        {minRange}－{maxRang} {t("general.pagination.of")} {itemsCount}
      </Typography>
      <div className="flex items-center gap-x-4">
        <Typography variant="body-sm-medium" as="span" className="text-black">
          {itemsCount > 0 ? currentPage + 1 : 0} {t("general.pagination.of")} {pagesCount}
        </Typography>
        <button
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-main-secondary shadow-basicSm disabled:cursor-not-allowed disabled:bg-gray-200"
          onClick={prevClickHandler}
          disabled={isPrevDisabled}
        >
          <ChevronLeftIcon className="h-4 w-4 text-main-secondary" />
        </button>
        <button
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-main-secondary shadow-basicSm disabled:cursor-not-allowed disabled:bg-gray-200"
          onClick={nextClickHandler}
          disabled={isNextDisabled}
        >
          <ChevronRightIcon className="h-4 w-4 text-main-secondary" />
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
