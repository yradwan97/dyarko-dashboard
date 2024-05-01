import { useQuery } from "@tanstack/react-query";
import {
  DyarkoTransactionFilter,
  getDyarkoTransactions,
  GetDyarkoTransactionsReturn,
  getTransactions,
} from "features/wallet";
import { defaultFilter } from "configs/defaultFilter";

export const DYARKO_TRANSACTIONS_KEY = "dyarko_transactions";

export interface UseGetBalanceTransParams {
  filter: DyarkoTransactionFilter;
}

export const useGetDyarkoTrans = ({
  filter = defaultFilter,
}: UseGetBalanceTransParams) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetDyarkoTransactionsReturn,
    Error
  >(
    [DYARKO_TRANSACTIONS_KEY, { ...filter }],
    async () => await getDyarkoTransactions(filter)
  );
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
