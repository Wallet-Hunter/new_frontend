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
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/postengagement?group_id=${groupId}`
      );
      const result = await response.json();
      
      // Transform API response
      setData({
        postIds: result.map(item => item.postId) || [],
        replies: result.map(item => item.replies ?? 0) || [],
        views: result.map(item => item.views ?? 0) || [],
        forwards: result.map(item => item.forwards ?? 0) || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    fetchData();
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  const chartData = {
    labels: data.postIds,
    datasets: [
      {
        label: "Replies",
        data: data.replies,
        backgroundColor: isDarkMode ? "#43aaae" : "#54d5d9",
      },
      {
        label: "Views",
        data: data.views,
        backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
      },
      {
        label: "Forwards",
        data: data.forwards,
        backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
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
                display: true,
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
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PostEngagementChart;
