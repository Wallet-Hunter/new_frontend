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

const OveruseEmojisGifsChart = ({
  memberIDs = [], // Member IDs as X-axis labels
  emojiGifCounts = [], // Number of Emojis/GIFs used
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [fetchedData, setFetchedData] = useState({
    memberIDsFromData: [],
    emojiGifCountsFromData: [],
  }); // State to hold fetched data

  // Fetch data from Backend
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}", {
  //       method: "GET",
  //       //credentials: "include", // Include credentials (cookies, etc.)
  //     });

  //     // Parse the JSON response
  //     const result = await response.json();
  //     //setData(hardcodeddData)
  //     setFetchedData(result);
  //     console.log("Data successfully fetched from the backend:");
  //     console.log(result); // Log the result for debugging
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };

  // Hardcoded data for testing (replace this with your actual fetched data)
  const hardcodedData = {
    memberIDsFromData: ["User1", "User2", "User3", "User4", "User5"],
    emojiGifCountsFromData: [15, 25, 30, 20, 50],
  };

  // Use hardcoded data for now
  const { memberIDsFromData, emojiGifCountsFromData } =
    fetchedData.memberIDsFromData.length > 0 ? fetchedData : hardcodedData;

  // Chart data configuration
  const chartData = {
    labels: memberIDsFromData, // Member IDs as X-axis labels
    datasets: [
      {
        label: "Number of Emojis/GIFs Used", // Dataset label
        data: emojiGifCountsFromData, // Number of Emojis/GIFs used
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
        height: "90%",
        backgroundColor: "#171717", // Set background to dark
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div style={{ width: "100%", height: "100%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1500,
              easing: "easeOutElastic",
            },
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "#fff", // Legend color for white background
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Count: ${tooltipItem.raw}`; // Tooltip shows count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member IDs", // X-axis title
                  color: "#fff", // Title color
                },
                ticks: {
                  color: "#fff", // X-axis tick color
                },
                grid: {
                  display: false, // Hide grid lines for X-axis
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Emojis/GIFs Used", // Y-axis title
                  color: "#fff", // Title color
                },
                ticks: {
                  color: "#fff", // Y-axis tick color
                },
                beginAtZero: true,
                grid: {
                  color: "rgba(255, 255, 255, 0.1)", // Grid line color
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                hoverBackgroundColor: `rgba(75, 192, 192, 1)`, // Hover effect color
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

export default OveruseEmojisGifsChart;
