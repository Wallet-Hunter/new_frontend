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

const PostEngagementChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({}); // State to store fetched data

   // Color variables moved below the arguments
   const backgroundColorLight = "#54d5d9"; // Light mode bar color for replies
   const backgroundColorDark = "#43aaae"; // Dark mode bar color for replies
   const backgroundColorLightShares = "#225557"; // Light mode color for shares
   const backgroundColorDarkShares = "#54d5d9"; // Dark mode color for shares
   const backgroundColorLightReactions = "#43aaae"; // Light mode color for reactions
   const backgroundColorDarkReactions = "#225557"; // Dark mode color for reactions

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/engagement/postengagement?group_id=${groupId}`, {
        method: "GET",
        // headers: {
        //   "ngrok-skip-browser-warning": "true"
        // }
      });

      // Parse the JSON response
      const result = await response.json();
      setData(result); // Set the fetched data
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Use effect to detect dark mode preference and fetch data
  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Fetch data when the component mounts
    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Prepare chart data based on fetched data
  const chartData = {
    labels: data.postNames || [], // Posts on the X-axis
    datasets: [
      {
        label: "Replies",
        data: data.replies || [], // Replies data
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
      {
        label: "Shares",
        data: data.shares || [], // Shares data
        backgroundColor: isDarkMode ? backgroundColorDarkShares : backgroundColorLightShares,
        borderColor: isDarkMode ? backgroundColorDarkShares : backgroundColorLightShares,
        borderWidth: 1,
      },
      {
        label: "Reactions",
        data: data.reactions || [], // Reactions data
        backgroundColor: isDarkMode ? backgroundColorDarkReactions : backgroundColorLightReactions,
        borderColor: isDarkMode ? backgroundColorDarkReactions : backgroundColorLightReactions,
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
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Tooltip shows metric and count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Posts", // X-axis title
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Engagement Metrics", // Y-axis title
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

export default PostEngagementChart;
