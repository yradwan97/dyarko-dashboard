import React from 'react'
import { BALANCE_TRANSACTIONS_FILTER, useBalanceTransFilterReducer } from '../../hooks/useBalanceTransFilterReducer';
import { useGetBalanceTrans } from '../../hooks/query/useGetBalanceTrans';
import { toastifyClient } from 'services/toastifyClient';
import BalanceTable from '../../components/BalanceTable';
import { t } from 'i18next';
import Paginator from 'components/shared/pagination/Paginator';

const UserTransactions = () => {
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
      <div className="w-full flex-grow">
        <BalanceTable tableTitle={t("pages.wallet.user-transactions")!} transactions={data?.balanceTransactions} />
        <Paginator
          page={Number(filter.page) ?? 0}
          lastPage={data?.pagesCount ?? 0}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default UserTransactions