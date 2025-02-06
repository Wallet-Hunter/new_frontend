import React, { useEffect, useState } from "react";
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

const LowInteractionRateChart = ({
  memberIDs = [], // Member IDs as X-axis labels
  interactionRates = [], // Interaction rates for each member
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample hardcoded data for testing
  const hardcodedData = {
    memberIDs: ["M1", "M2", "M3", "M4", "M5"],
    interactionRates: [20, 35, 55, 60, 45],
  };

  // Fetching data logic (currently commented for testing)
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}", {
  //       method: "GET",
  //       //credentials: "include", // Include credentials (cookies, etc.)
  //     });
  //
  //     // Parse the JSON response
  //     const result = await response.json();
  //     // setData(hardcodedData)
  //     setData(result);
  //     console.log("Data successfully fetched from the backend:");
  //     console.log(result); // Log the result for debugging
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };

  const [chartData, setChartData] = useState({
    memberIDs: hardcodedData.memberIDs,
    interactionRates: hardcodedData.interactionRates,
  });

  // Chart data configuration
  const chartDataConfig = {
    labels: chartData.memberIDs, // Member IDs as X-axis labels
    datasets: [
      {
        label: "Interaction Rate", // Dataset label
        data: chartData.interactionRates, // Interaction rates
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#171717", // Set background color to white
      }}
    >
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={chartDataConfig}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Interaction Rate: ${tooltipItem.raw}`; // Tooltip shows interaction rate
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member ID", // X-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // X-axis tick color
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Interaction Rate", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // X-axis tick color
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
                backgroundColor: isDarkMode
                  ? backgroundColorDark
                  : backgroundColorLight,
                hoverBackgroundColor: isDarkMode
                  ? `${backgroundColorDark}CC`
                  : `${backgroundColorLight}CC`,
              },
            },
          }}
        />
      </div>
      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05); /* Scale the chart on hover */
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default LowInteractionRateChart;
