import { useQuery } from "@tanstack/react-query";
import { getChartData } from "features/invoices/services/api/invoicesService";
import { GetChartDataReturn } from "features/invoices/services/api/types";
import { toastifyClient } from "services/toastifyClient";
import { monthsMap } from "consts/months";

export const CHART_KEY = "chart";

export const useGetChartData = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<
    GetChartDataReturn,
    Error
  >({
    queryKey: [CHART_KEY],
    queryFn: () => getChartData(),
    onError: (err) => toastifyClient.error({ message: err.message }),
  });

  const chartDataMonths = data?.dataPoints.map(
    (dataPoint) => `${monthsMap[dataPoint._id.month]}/${dataPoint._id.year}`
  );
  const chartDataAmount = data?.dataPoints.map(
    (dataPoint) => dataPoint.totalAmount
  );

  return {
    chartDataMonths,
    chartDataAmount,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export default useGetChartData;
