import { useQuery } from "@tanstack/react-query";
import {
  WalletFilter,
  getWalletRecords,
  GetWalletRecordsReturn,
} from "features/wallet";
import { walletFilter } from "configs/defaultFilter";

export const WALLET_RECORDS_KEY = "wallet_records";

export interface UseGetWalletRecordsParams {
  filter: WalletFilter;
}

export const useGetWalletRecords = ({
  filter = walletFilter,
}: UseGetWalletRecordsParams) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetWalletRecordsReturn,
    Error
  >(
    [WALLET_RECORDS_KEY, { ...filter }],
    async () => await getWalletRecords(filter)
  );
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
