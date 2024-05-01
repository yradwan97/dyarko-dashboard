import { useQuery } from "@tanstack/react-query";
import { InvoicesFilter } from "features/invoices/types";
import { getInvoices } from "features/invoices/services/api/invoicesService";
import { GetInvoicesReturn } from "features/invoices/services/api/types";
import { toastifyClient } from "services/toastifyClient";

export const REPORTS_KEY = "reports";

export const useGetReports = (filter: InvoicesFilter) => {
  const { data, isLoading, isSuccess, isFetching, isRefetching, isError, error } = useQuery<
    GetInvoicesReturn,
    Error
  >({
    queryKey: [REPORTS_KEY, { ...filter }],
    queryFn: () => getInvoices(filter),
    onError: (err) => toastifyClient.error({ message: err.message }),
  });
  return {
    data,
    isLoading,
    isSuccess,
    isFetching,
    isRefetching,
    isError,
    error,
  };
};

export default useGetReports;
