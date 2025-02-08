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

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PostEngagementChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({}); // State to store fetched data

  // Define color schemes for dark and light modes
  const backgroundColorLight = "#54d5d9";
  const backgroundColorDark = "#43aaae";
  const backgroundColorLightShares = "#225557";
  const backgroundColorDarkShares = "#54d5d9";
  const backgroundColorLightReactions = "#43aaae";
  const backgroundColorDarkReactions = "#225557";

  // Fetch engagement data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/postengagement?group_id=${groupId}`
      );
      
      const result = await response.json();
      
      // Ensure that null or undefined values are replaced with 0
      setData({
        postNames: result.postNames || [],
        replies: result.replies?.map(val => val ?? 0) || [],
        shares: result.shares?.map(val => val ?? 0) || [],
        reactions: result.reactions?.map(val => val ?? 0) || [],
      });

      console.log("Data successfully fetched:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Detect dark mode preference and fetch data when the component mounts
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Prepare chart data for rendering
  const chartData = {
    labels: data.postNames,
    datasets: [
      {
        label: "Replies",
        data: data.replies,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
      {
        label: "Shares",
        data: data.shares,
        backgroundColor: isDarkMode ? backgroundColorDarkShares : backgroundColorLightShares,
        borderColor: isDarkMode ? backgroundColorDarkShares : backgroundColorLightShares,
        borderWidth: 1,
      },
      {
        label: "Reactions",
        data: data.reactions,
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
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Posts",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Engagement Metrics",
                  color: "white",
                },
                ticks: {
                  color: "white",
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
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PostEngagementChart;
