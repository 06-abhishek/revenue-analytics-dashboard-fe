import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyRevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Revenue by Product",
        data: data.map((item) => item.totalRevenue),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // primary - blue
          "rgba(16, 185, 129, 0.8)", // secondary - emerald
          "rgba(245, 158, 11, 0.8)", // accent - amber
          "rgba(239, 68, 68, 0.8)", // red
          "rgba(168, 85, 247, 0.8)", // purple
          "rgba(6, 182, 212, 0.8)", // cyan
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(6, 182, 212, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right", // or 'top', 'bottom', 'left'
        labels: {
          font: {
            size: 14,
          },
          color: "#1F2937", // text color
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No product sales data available for this month.
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full max-w-md mx-auto">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default MonthlyRevenueChart;
