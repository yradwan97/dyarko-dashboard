import { useQuery } from "@tanstack/react-query";
import { defaultFilter } from "configs/defaultFilter";
import {
  getPointsTransactions,
  GetPointsTransactionsResponse,
  PointsTransactionFilter,
} from "features/wallet";

export const POINTS_TRANSACTIONS_KEY = "points_transactions";

export interface UseGetPointsTransParams {
  filter: PointsTransactionFilter;
}

export const useGetPointsTrans = ({
  filter = defaultFilter,
}: UseGetPointsTransParams) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetPointsTransactionsResponse,
    Error
  >(
    [POINTS_TRANSACTIONS_KEY, filter.page],
    async () => await getPointsTransactions(filter)
  );
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
