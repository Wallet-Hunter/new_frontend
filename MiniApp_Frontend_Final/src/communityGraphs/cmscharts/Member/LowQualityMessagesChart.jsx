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

const MessageQualityChart = ({
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [memberIDs, setMemberIDs] = useState([]); // Member IDs for X-axis
  const [qualityScores, setQualityScores] = useState([]); // Quality score
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Flag to check if data is loaded

  // Hardcoded data for testing
  const hardcodedData = {
    memberIDs: ["M1", "M2", "M3", "M4", "M5"],
    qualityScores: [85, 70, 90, 60, 75],
  };

  // Fetch dynamic data (e.g., from Backend)
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

  useEffect(() => {
    // For testing, use hardcoded data
    setMemberIDs(hardcodedData.memberIDs);
    setQualityScores(hardcodedData.qualityScores);
    setIsDataLoaded(true);

    // Uncomment the line below to fetch real data from an API (Backend)
    // fetchData();

    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  if (!isDataLoaded) {
    return <div>Loading chart data...</div>; // Display loading message while data is being fetched
  }

  // Chart data configuration
  const chartData = {
    labels: memberIDs, // Member IDs as X-axis labels
    datasets: [
      {
        label: "Quality Score", // Dataset label
        data: qualityScores, // Quality score
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={chartData}
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
                    return `Quality Score: ${tooltipItem.raw}`; // Tooltip shows quality score
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
                  color: "#fff", // X-axis tick color
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Quality Score", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // Y-axis tick color
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

export default MessageQualityChart;
