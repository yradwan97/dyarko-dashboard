import InvoicesTable from "../components/InvoicesTable";
import useGetInvoices from "../hooks/query/useGetInvoices";
import {
  INVOICES_FILTER,
  useInvoicesFilterReducer,
} from "../hooks/useInvoicesFilterReducer";
import { Input, Label } from "components/shared/form";
import { FiSearch } from "react-icons/fi";
import { ChangeEventHandler } from "react";
import { TableSkeleton } from "components/shared/UI/table";
import { useParams } from "react-router-dom";
import { t } from "i18next";
import Paginator from "components/shared/pagination/Paginator";

const PropertyInvoices = () => {
  const [filter, dispatchFilter] = useInvoicesFilterReducer();
  const propertyId = useParams().id;
  const { data, isSuccess, isLoading } = useGetInvoices(filter, propertyId);

  const handlePageChange = (page: number) => {
    dispatchFilter({ filter: INVOICES_FILTER.PAGE, value: page });
  };

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {};

  return (
    <div>
      <div className="relative w-7/12">
        <Label htmlFor="search">
          <FiSearch className="text-2xl text-main-secondary absolute top-1/2 left-3 -translate-y-1/2 z-1" />
        </Label>
        <Input
          id="search"
          className="pl-12"
          placeholder={`${t("general.search")}`}
          type="search"
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="rounded-lg px-2 mt-6">
        {isLoading ? <TableSkeleton colsNumber={6} /> : null}
        {isSuccess ? <InvoicesTable invoices={data?.invoices} /> : null}
      </div>
      <Paginator
        page={Number(filter.page)}
        lastPage={data?.pages || 0}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PropertyInvoices;
