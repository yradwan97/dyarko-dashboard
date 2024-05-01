import { Link, Outlet } from "react-router-dom";
import {
  BALANCE_TRANSACTIONS_FILTER,
  BalanceCard,
  BalanceTable,
  useBalanceTransFilterReducer,
  useGetBalanceTrans,
} from "features/wallet";
import { toastifyClient } from "services/toastifyClient";
import { useState } from "react";
import { Typography } from "components/shared/UI";
import { ROUTES } from "configs/routes";
import { useAppSelector } from "hooks";
import { t } from "i18next";
import Paginator from "components/shared/pagination/Paginator";

const Balance = () => {
  const auth = useAppSelector(state => state.auth);
  const [filter, dispatchFilter] = useBalanceTransFilterReducer();
  const { data, isError, error } = useGetBalanceTrans({
    filter,
  });
  
  const handlePageChange = (page: number) => {
    dispatchFilter({ filter: BALANCE_TRANSACTIONS_FILTER.PAGE, value: page });
  };
  
  if (isError) toastifyClient.error({ message: error?.message ?? "" });

  return (
    <div className="flex flex-col items-center space-y-4 lg:flex-row lg:items-start lg:gap-4 lg:space-y-0 px-4">
      <div className="lg:order-2 w-full max-w-sm">
        <BalanceCard balance={auth?.user.net_balance} />
        <Link
          to={ROUTES.USER_TRANSACTION}
          className="w-full px-6 py-4 mt-6 bg-main-600 rounded-lg border-0 focus:outline-none flex justify-between items-center"
        >
          <Typography
            variant="body-md-medium"
            as="span"
            className="text-white"
          >
            {t("pages.wallet.user-transactions")}
          </Typography>
        </Link>
        <Link
          to='/wallet/balance/dyarko-transactions'
          className="w-full px-6 py-4 mt-6 bg-main-600 rounded-lg border-0 focus:outline-none flex justify-between items-center"
        >
          <Typography
            variant="body-md-medium"
            as="span"
            className="text-white"
          >
            {t("pages.wallet.dyakro-transactions.dyakro-transactions")}
          </Typography>
        </Link>
      </div>
      <div className="w-full flex-grow">
        <Outlet />
        <BalanceTable transactions={data?.balanceTransactions} />
        <Paginator
          page={Number(filter.page) ?? 0}
          lastPage={data?.pagesCount ?? 0}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Balance;
