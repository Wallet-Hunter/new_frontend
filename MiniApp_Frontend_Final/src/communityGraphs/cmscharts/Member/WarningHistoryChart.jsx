import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WarningHistoryChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Dark Mode Detection
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/members/memberswithwarnings?group_id=${groupId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched Data:", result);

        // Extract data correctly
        const warningLabels = result.members_with_warnings.map(
          (item) => item.sender_name
        );
        const warningCounts = result.members_with_warnings.map(
          (item) => item.warning_count
        );

        // Set chart data
        setChartData({
          labels: warningLabels,
          datasets: [
            {
              label: "Number of Warnings Received",
              data: warningCounts,
              backgroundColor: isDarkMode
                ? "rgba(67, 229, 244, 1)" // Dark mode: Blue tone
                : "rgba(75, 192, 192, 1)", // Light mode: Green tone
              borderColor: isDarkMode
                ? "rgba(67, 229, 244, 1)"
                : "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [groupId, isDarkMode]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1200,
              easing: "easeOutBounce",
            },
            plugins: {
              legend: {
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Warnings: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Members", // X-axis title
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "No of Warnings Received", // Y-axis title
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                hoverBackgroundColor: isDarkMode
                  ? "rgba(67, 229, 244, 1)"
                  : "rgba(75, 192, 192, 1)",
              },
            },
          }}
        />
      </div>
      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05); /* Scale on hover */
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default WarningHistoryChart;
