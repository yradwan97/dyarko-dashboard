import { useFilterReducer } from "hooks";
import { InvoicesFilter } from "../types";

export enum INVOICES_FILTER {
  PAGE = "page",
  SIZE = "size",
}

export const defaultInvoicesFilter: InvoicesFilter = {
  page: "1",
  size: "10",
};

export const useInvoicesFilterReducer = () => {
  return useFilterReducer<InvoicesFilter, INVOICES_FILTER>(
    defaultInvoicesFilter,
    INVOICES_FILTER
  );
};
