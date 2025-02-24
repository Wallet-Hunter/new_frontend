import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler);

const AnonymousEngagementChart = ({
  groupId,
  backgroundColorLight = "rgba(84, 213, 217, 0.2)",
  backgroundColorDark = "rgba(67, 170, 174, 0.2)",
  borderColorLight = "#54d5d9",
  borderColorDark = "#43aaae",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/anonymousengagementtrends?group_id=${groupId}`
        );
        const result = await response.json();

        if (Array.isArray(result)) {
          const timePeriods = result.map((item) => item.date);
          const replies = result.map((item) => item.total_replies);
          const reactions = result.map((item) => item.total_views);
          const posts = result.map((item) => item.total_forwards);

          setChartData({ timePeriods, replies, reactions, posts });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [groupId]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

  const { timePeriods, replies, reactions, posts } = chartData;

  const data = {
    labels: timePeriods,
    datasets: [
      {
        label: "Replies",
        data: replies,
        fill: true,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? borderColorDark : borderColorLight,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Reactions",
        data: reactions,
        fill: true,
        backgroundColor: isDarkMode ? "rgba(67, 170, 174, 0.4)" : "rgba(84, 213, 217, 0.4)",
        borderColor: isDarkMode ? "#43aaae" : "#54d5d9",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: "Posts",
        data: posts,
        fill: true,
        backgroundColor: "rgba(34, 85, 87, 0.4)",
        borderColor: "#225557",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { mode: "index", intersect: false },
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Time", color: "white" },
        ticks: { color: "white" },
        grid: { color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)" },
      },
      y: {
        title: { display: true, text: "Engagement Levels", color: "white" },
        ticks: { color: "white" },
        beginAtZero: true,
        grid: { color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AnonymousEngagementChart;
