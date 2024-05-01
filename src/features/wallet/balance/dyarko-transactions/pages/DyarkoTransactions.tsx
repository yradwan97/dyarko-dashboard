import React, { useEffect } from 'react'
import { toastifyClient } from 'services/toastifyClient';
import { useBalanceTransFilterReducer, BALANCE_TRANSACTIONS_FILTER } from '../../hooks/useBalanceTransFilterReducer';
import { useGetDyarkoTrans } from '../hooks/query/useGetDyarkoTrans';
import DyarkoTransactionsTable from '../../components/DyarkoTransactionsTable';
import Paginator from 'components/shared/pagination/Paginator';

const DyarkoTransactions = () => {
  const [filter, dispatchFilter] = useBalanceTransFilterReducer();
  const { data, isError, error } = useGetDyarkoTrans({
    filter,
  });
  const handlePageChange = (page: number) => {
    dispatchFilter({ filter: BALANCE_TRANSACTIONS_FILTER.PAGE, value: page });
  };
  if (isError) toastifyClient.error({ message: error?.message ?? "" });

  return (
    <div className="flex flex-col items-center space-y-4 lg:flex-row lg:items-start lg:gap-4 lg:space-y-0 px-4">
      <div className="w-full flex-grow">
        <DyarkoTransactionsTable transactions={data?.balanceTransactions} />
        <Paginator
          page={Number(filter.page) ?? 0}
          lastPage={data?.pagesCount ?? 0}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default DyarkoTransactions