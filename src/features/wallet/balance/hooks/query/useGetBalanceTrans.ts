import { useQuery } from "@tanstack/react-query";
import {
  BalanceTransactionFilter,
  GetBalanceTransactionsReturn,
  getTransactions,
} from "features/wallet";
import { defaultFilter } from "configs/defaultFilter";

export const BALANCE_TRANSACTIONS_KEY = "balance_transactions";

export interface UseGetBalanceTransParams {
  filter: BalanceTransactionFilter;
}

export const useGetBalanceTrans = ({
  filter = defaultFilter,
}: UseGetBalanceTransParams) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetBalanceTransactionsReturn,
    Error
  >(
    [BALANCE_TRANSACTIONS_KEY, { ...filter }],
    async () => await getTransactions(filter)
  );
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
