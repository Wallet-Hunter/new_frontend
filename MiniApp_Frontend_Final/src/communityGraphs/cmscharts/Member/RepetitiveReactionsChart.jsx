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

const RepetitiveReactionsChart = ({
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [senderNames, setSenderNames] = useState([]); // Sender names
  const [reactionsCounts, setReactionsCounts] = useState([]); // Reactions counts

  // Fetch data from Backend (currently commented out)
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}", {
  //       method: "GET",
  //       //credentials: "include", // Include credentials (cookies, etc.)
  //     });
  //     // Parse the JSON response
  //     const result = await response.json();
  //     setData(result);
  //     console.log("Data successfully fetched from the backend:");
  //     console.log(result); // Log the result for debugging
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };

  // Hardcoded data for testing (replace this with your actual fetched data)
  const hardcodedData = {
    senderNames: ["User1", "User2", "User3", "User4", "User5"],
    reactionsCounts: [15, 30, 45, 25, 50],
  };

  // Use hardcoded data for now (fetchedData will be used once the API is functional)
  useEffect(() => {
    setSenderNames(hardcodedData.senderNames);
    setReactionsCounts(hardcodedData.reactionsCounts);
  }, []);

  // Chart data configuration
  const chartData = {
    labels: senderNames, // Sender names as Y-axis labels
    datasets: [
      {
        label: "Total Reactions", // Dataset label
        data: reactionsCounts, // Total reactions counts
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
                    return `Total Reactions: ${tooltipItem.raw}`; // Tooltip shows reactions count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Total Reactions", // X-axis title
                  color:"white"
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
                  color:"white"
                },
                ticks: {
                  color: "#fff", // X-axis tick color
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

export default RepetitiveReactionsChart;
