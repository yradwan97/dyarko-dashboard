import PointsCalculateInfo from "features/wallet/components/PointsCalculateInfo";
import { useState } from "react";
import {
  POINTS_TRANSACTIONS_FILTER,
  PointsCard,
  PointsTable,
  useGetPointsTrans,
  usePointsTransFilterReducer,
} from "features/wallet";
import { BsQuestion } from "react-icons/bs";
import { Typography } from "components/shared/UI";
import { t } from "i18next";
import Paginator from "components/shared/pagination/Paginator";

const Points = () => {
  const [filter, dispatchFilter] = usePointsTransFilterReducer();
  const {
    isLoading,
    isSuccess,
    isError,
    data: transactions,
    error,
  } = useGetPointsTrans({ filter });
  const [isOpen, setIsOpen] = useState(false);
  const handlePageChange = (page: number) =>
    dispatchFilter({ filter: POINTS_TRANSACTIONS_FILTER.PAGE, value: page });

  return (
    <>
      <PointsCalculateInfo isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-col items-center space-y-4 lg:flex-row lg:items-start lg:gap-4 lg:space-y-0 px-4">
        <div className="lg:order-2 w-full max-w-sm">
          <PointsCard
            points={transactions?.data[0]?.user.points}
            amount={transactions?.data[0]?.user.balance}
          />
          <button
            className="w-full px-6 py-4 mt-6 bg-main-yellow-600 rounded-lg border-0 focus:outline-none flex justify-between items-center"
            onClick={() => setIsOpen(true)}
          >
            <Typography
              variant="body-md-medium"
              as="span"
              className="text-white"
            >
              {t("pages.wallet.points.question-mark")}
            </Typography>
            <span className="bg-white/20 w-8 h-8 rounded-full flex justify-center items-center">
              <BsQuestion className="text-white text-2xl" />
            </span>
          </button>
        </div>
        <div className="w-full flex-grow">
          <PointsTable pointsTransactions={transactions?.data} />
          <Paginator
            page={Number(filter.page)}
            lastPage={transactions?.pages || 0}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Points;
