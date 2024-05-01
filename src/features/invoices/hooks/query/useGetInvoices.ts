import { useQuery } from "@tanstack/react-query";
import { InvoicesFilter } from "features/invoices/types";
import { getInvoices } from "features/invoices/services/api/invoicesService";
import { GetInvoicesReturn } from "features/invoices/services/api/types";
import { toastifyClient } from "services/toastifyClient";
import { Optional } from "types";

export const INVOICES_KEY = "invoice";

export const useGetInvoices = (
  filter: InvoicesFilter,
  propertyId: Optional<string>
) => {
  const newFilter = {
    ...filter,
    property: propertyId,
  };
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetInvoicesReturn,
    Error
  >({
    queryKey: [INVOICES_KEY, { ...filter }],
    queryFn: () => getInvoices(newFilter),
    onError: (err) => toastifyClient.error({ message: err.message }),
    enabled: !!propertyId,
  });
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useGetInvoices;
