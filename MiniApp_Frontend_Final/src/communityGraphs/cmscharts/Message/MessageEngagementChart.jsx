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

const MessageEngagementChart = ({
  timeLabels = [], // Time (days/weeks/months) or Messages on the X-axis
  replies = [], // Replies per message
  reactions = [], // Reactions per message
  backgroundColorLight = "#54d5d9", // Light mode bar color for replies
  backgroundColorDark = "#43aaae", // Dark mode bar color for replies
  backgroundColorLightReactions = "#225557", // Light mode color for reactions
  backgroundColorDarkReactions = "#54d5d9", // Dark mode color for reactions
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({
    timeLabels: [],
    replies: [],
    reactions: [],
  });

  // Fetch data logic from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/messages/messageengagementrate?group_id=${group_id}', {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        });

        // Parse the JSON response
        const result = await response.json();

        // Assuming the response contains arrays of timeLabels, replies, and reactions
        setData({
          timeLabels: result.timeLabels || [],
          replies: result.replies || [],
          reactions: result.reactions || [],
        });
        console.log("Data successfully fetched from the backend:");
        console.log(result); // Log the result for debugging
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Calculate engagement rate (replies + reactions per message)
  const calculateEngagementRate = (replies, reactions) => {
    return replies.map((reply, index) => {
      const totalInteractions = reply + reactions[index];
      return totalInteractions / 2; // Average engagement rate per message
    });
  };

  // Calculate engagement rate data
  const engagementRates = calculateEngagementRate(data.replies, data.reactions);

  // Chart data configuration
  const chartData = {
    labels: data.timeLabels, // Time (days/weeks/months) or Messages on the X-axis
    datasets: [
      {
        label: "Replies Engagement Rate", // Dataset label for replies engagement rate
        data: engagementRates, // Engagement rate for replies
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
      {
        label: "Reactions Engagement Rate", // Dataset label for reactions engagement rate
        data: engagementRates, // Engagement rate for reactions
        backgroundColor: isDarkMode
          ? backgroundColorDarkReactions
          : backgroundColorLightReactions,
        borderColor: isDarkMode
          ? backgroundColorDarkReactions
          : backgroundColorLightReactions,
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
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                display:false
                //position: "top", // Place legend at the top
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Tooltip shows engagement rate
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time ", // X-axis title
                  color:"white"
                },
                ticks:{
                  color:"white"
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
                  text: "Engagement Rate", // Y-axis title
                  color:"white"
                },
                ticks:{
                  color:"white"
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

export default MessageEngagementChart;
