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

const RepeatedActivityChart = ({
  senderNames = [], // Sender names as X-axis labels
  messageCounts = [], // Count of repeated messages for each sender
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fetchedData, setFetchedData] = useState({ senderNames: [], messageCounts: [] }); // State for fetched data

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        '${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?group_id=${group_id}',
        {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        }
      );

      // Parse the JSON response
      const result = await response.json();
      // Uncomment when ready to use the backend data:
      // setFetchedData(result);
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Hardcoded data for testing (replace this with your actual fetched data)
  const hardcodedData = {
    senderNames: ["User1", "User2", "User3", "User4", "User5"],
    messageCounts: [15, 25, 30, 20, 50],
  };

  // Use hardcoded data for now (fetchedData will be used once the API is functional)
  const dataToDisplay = fetchedData.senderNames.length > 0 ? fetchedData : hardcodedData;

  // Chart data configuration
  const chartData = {
    labels: dataToDisplay.senderNames, // Sender names as X-axis labels
    datasets: [
      {
        label: "Repeated Messages", // Dataset label
        data: dataToDisplay.messageCounts, // Repeated message counts
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

    // Fetch data (commented for now)
    // fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

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
                    return `Count: ${tooltipItem.raw}`; // Tooltip shows message count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Sender Name", // X-axis title
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
                  text: "Repeated Messages", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // Y-axis tick color
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
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

export default RepeatedActivityChart;
