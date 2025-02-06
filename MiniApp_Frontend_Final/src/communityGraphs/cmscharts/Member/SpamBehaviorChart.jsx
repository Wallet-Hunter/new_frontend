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

const SpamBehaviorChart = ({
  senderNames = [], // Sender names as Y-axis labels
  spamCounts = [], // Number of spam messages for each sender
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({
    senderNames: ["Alice", "Bob", "Charlie"], // Hardcoded for testing
    spamCounts: [5, 12, 8], // Hardcoded for testing
  });

  // Fetching data from Backend (commented out for now)
  useEffect(() => {
    // Uncomment and replace with actual backend fetching logic when needed
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //       "${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}",
    //       {
    //         method: "GET",
    //         //credentials: "include", // Include credentials (cookies, etc.)
    //       }
    //     );

    //     // Parse the JSON response
    //     const result = await response.json();
    //     setData(result);
    //     console.log("Data successfully fetched from the backend:");
    //     console.log(result); // Log the result for debugging
    //   } catch (error) {
    //     console.error("Error fetching data:", error.message);
    //   }
    // };

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

  // Chart data configuration
  const chartData = {
    labels: data.senderNames, // Sender names as Y-axis labels
    datasets: [
      {
        label: "Spam Message Count", // Dataset label
        data: data.spamCounts, // Spam message counts
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
            indexAxis: "y", // Horizontal bar chart
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
                    return `Spam Messages: ${tooltipItem.raw}`; // Tooltip shows spam count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "No of Spam Messages", // X-axis title
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
              y: {
                title: {
                  display: true,
                  text: "Sender Name", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // Y-axis tick color
                },
                grid: {
                  display: false,
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

export default SpamBehaviorChart;
