import { useRef, useState } from "react";
import Chart from "features/reports/components/Chart";
import NoReports from "features/reports/components/NoReports";
import { BsDownload } from "react-icons/bs";
import ReportsFilter from "features/reports/components/ReportsFilter";
import { useDownloadExcel } from "react-export-table-to-excel";
import { FilterIcon } from "components/shared/icons";
import { Select } from "components/shared/form";
import {
  InvoicesTable,
  useInvoicesFilterReducer, 
  INVOICES_FILTER,
  defaultInvoicesFilter,
} from "features/invoices";
import { TableSkeleton } from "components/shared/UI/table";
import useGetReports from "../hooks/query/useGetReports";
import useGetChartData from "../hooks/query/useGetChartData";
import { ReportsFilterFormData } from "../hooks/useReportsFilterForm";
import Paginator from "components/shared/pagination/Paginator";

interface SortOption {
  text: string;
}

const sortOptions: SortOption[] = [
  { text: "last month" },
  { text: "last week" },
];

const Reports = () => {
  const [filter, dispatchFilter] = useInvoicesFilterReducer();
  const [isFiltersShown, setIsFiltersShown] = useState(false);
  const {
    data,
    isLoading: isReportsLoading,
    isSuccess: isReportsSuccess,
    isFetching: isReportsFetching,
    isRefetching: isReportsRefetching
  } = useGetReports(filter);
  const {
    chartDataMonths,
    chartDataAmount,
    isLoading: isChartDataLoading,
    isSuccess: isChartDataSuccess,
  } = useGetChartData();
  const [selected, setSelected] = useState<SortOption>(sortOptions[0]);
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Reports table",
    sheet: "Reports",
  });

  const hideFilters = () => setIsFiltersShown(false);
  const showFilters = () => setIsFiltersShown(true);
  const optionElement = (option: SortOption) => (
    <span
      className={`block truncate capitalize ${
        selected ? "font-medium" : "font-normal"
      }`}
    >
      {option.text}
    </span>
  );

  const handlePageChange = (page: number) => {
    dispatchFilter({ filter: INVOICES_FILTER.PAGE, value: page });
  };

  const handleFilterChange = (reportsFilter: ReportsFilterFormData) => {
    dispatchFilter({ updateAll: true, value: { ...reportsFilter } });
  };

  const handleFilterReset = () => {
    dispatchFilter({ updateAll: true, value: { ...defaultInvoicesFilter } });
  };

  return (
    <>
      {(isReportsFetching || isReportsRefetching) ? <TableSkeleton colsNumber={6} /> : null}
      {(isReportsSuccess && data?.invoices.length! > 0) ? (
        <div className="w-full">
          <div className="flex justify-end items-center gap-x-3 mb-6">
            <button
              className="bg-white p-2.5 rounded-lg border border-gray-200"
              onClick={onDownload}
            >
              <BsDownload className="text-main-yellow-600 text-lg" />
            </button>
            <button
              className="bg-white p-2.5 rounded-lg border border-gray-200"
              onClick={showFilters}
            >
              <FilterIcon className="w-5 h-5 stroke-main-600" />
            </button>
            <div className="w-48">
              <Select
                options={sortOptions}
                selectedOption={selected}
                onChange={(option) => setSelected(option)}
                buttonElement={
                  <span className="block truncate capitalize">
                    {selected.text}
                  </span>
                }
                renderOption={optionElement}
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-4">
            <div className="xl:w-3/5">
              <Chart
                chartDataMonths={chartDataMonths ?? []}
                chartDataAmount={chartDataAmount ?? []}
              />
            </div>
            <div className="w-full">
              <InvoicesTable invoices={data?.invoices} />
            </div>
          </div>
        </div>
      ) : (isReportsSuccess && data?.invoices.length! === 0) ? (
        <NoReports />
      ): null}
      <Paginator
        page={Number(filter.page)}
        lastPage={data?.pages ?? 0}
        onChange={handlePageChange}
      />
      <ReportsFilter
        isFiltersShown={isFiltersShown}
        hideFilters={hideFilters}
        onFilter={handleFilterChange}
        onReset={handleFilterReset}
      />
    </>
  );
};

export default Reports;
