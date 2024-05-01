import { Chart as ChartJS, registerables } from "chart.js";
import { t } from "i18next";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Transactions",
    },
  },
};

interface ReportsChartProps {
  chartDataMonths: string[];
  chartDataAmount: number[];
}

function Chart({ chartDataAmount, chartDataMonths }: ReportsChartProps) {
  const data = {
    labels: chartDataMonths,
    datasets: [
      {
        label: `${t("pages.reports.chart.label")}`,
        data: chartDataAmount,
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <>
      <Line data={data} options={options} className="bg-white p-2 rounded-lg" />
    </>
  );
}

export default Chart;
