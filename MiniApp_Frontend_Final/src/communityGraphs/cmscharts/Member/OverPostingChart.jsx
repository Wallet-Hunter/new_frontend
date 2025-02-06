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

const OverPostingChart = ({
  senderNames = [], // Sender names as X-axis labels
  postCounts = [], // Total posts (message_id count) for each sender
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({
    senderNames: [],
    postCounts: [],
  });

  // Hardcoded data for testing
  const hardcodedData = {
    senderNames: ["User1", "User2", "User3", "User4"],
    postCounts: [20, 35, 50, 10],
  };

  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

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
        // Uncomment the line below to use fetched data
        // setData(result);
        console.log("Data successfully fetched from the backend:");
        console.log(result); // Log the result for debugging
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Uncomment the line below to fetch data from the backend
    // fetchData();

    // Set hardcoded data for now (testing)
    setData(hardcodedData);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Chart data configuration
  const chartData = {
    labels: data.senderNames, // Sender names as X-axis labels
    datasets: [
      {
        label: "Total Posts", // Dataset label
        data: data.postCounts, // Total posts count
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
                    return `Posts: ${tooltipItem.raw}`; // Tooltip shows total posts count
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
                  text: "Total Posts", // Y-axis title
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

export default OverPostingChart;
