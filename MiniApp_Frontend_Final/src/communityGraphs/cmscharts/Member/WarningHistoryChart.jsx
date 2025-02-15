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

const WarningHistoryChart = ({groupId}) => {
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

    // Fetch data from Backend (commented out for now)
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?group_id =${groupId}`, {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        });

        // Parse the JSON response
        const result = await response.json();
        console.log("Data successfully fetched from the backend:");
        console.log(result); // Log the result for debugging

        // Assuming the result is an array of objects with `member` and `warningCount`
        const warningLabels = result.map(item => item.member);
        const warningCounts = result.map(item => item.warningCount);

        // Set chart data using fetched data
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

    // Hardcoded test data for "Members with Warning History"
    const warningLabels = [
      "Member1",
      "Member2",
      "Member3",
      "Member4",
      "Member5",
    ];
    const warningCounts = [3, 7, 5, 2, 8]; // Warnings count

    // Set chart data using hardcoded data
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

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [groupId]);

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
                  text: "Member IDs", // X-axis title
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "No of Warnings Received", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "white",
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
