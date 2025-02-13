import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const AnonymousUserInteractionChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Colors for light and dark modes
  const backgroundColorLight = [
    "rgba(75, 192, 192, 1)",   // Replies
    "rgba(67, 229, 244, 1)",   // Forwards
    "rgba(255, 206, 86, 1)",   // Views
  ];
  const backgroundColorDark = [
    "rgba(67, 229, 244, 1)",  
    "rgba(75, 192, 192, 1)",  
    "rgba(255, 206, 86, 1)",  
  ];

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/anonymoususerinteraction?group_id=${groupId}`,
        { method: "GET" }
      );

      const result = await response.json();
      console.log("API Response:", result); // Debugging

      if (!Array.isArray(result) || result.length === 0) {
        console.warn("No valid data received, displaying placeholder.");
        setChartData(null);
        return;
      }

      // Extracting data
      const dates = result.map((item) => item.date || "Unknown");
      const replies = result.map((item) => item.replies ?? 0);
      const forwards = result.map((item) => item.forwards ?? 0);
      const views = result.map((item) => item.views ?? 0);

      // Check if all values are zero
      const allZero =
        replies.every((r) => r === 0) &&
        forwards.every((f) => f === 0) &&
        views.every((v) => v === 0);

      if (allZero) {
        console.warn("All data values are zero, displaying placeholder.");
        setChartData(null);
        return;
      }

      // Update chart data
      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Replies",
            data: replies,
            backgroundColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderWidth: 1,
          },
          {
            label: "Forwards",
            data: forwards,
            backgroundColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
            borderColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
            borderWidth: 1,
          },
          {
            label: "Views",
            data: views,
            backgroundColor: isDarkMode ? backgroundColorDark[2] : backgroundColorLight[2],
            borderColor: isDarkMode ? backgroundColorDark[2] : backgroundColorLight[2],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setChartData(null);
    }
  };

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

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 1000, easing: "easeOutQuart" },
              hover: { animationDuration: 500, mode: "nearest", intersect: true },
              plugins: {
                legend: { display: true },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: "Date", color: "white" },
                  ticks: { color: "white" },
                  grid: { display: false },
                },
                y: {
                  title: { display: true, text: "Count", color: "white" },
                  ticks: { color: "white" },
                  beginAtZero: true,
                  grid: { color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)" },
                },
              },
              elements: {
                bar: {
                  borderRadius: 10,
                  hoverBackgroundColor: isDarkMode
                    ? `${backgroundColorDark[0]}0.7`
                    : `${backgroundColorLight[0]}0.7`,
                },
              },
              indexAxis: "x",
              stacked: true,
            }}
          />
        ) : (
          <p style={{ textAlign: "center", color: "gray", fontSize: "1.2rem", marginTop: "20px" }}>
            No interactions available
          </p>
        )}
      </div>
    </div>
  );
};

export default AnonymousUserInteractionChart;
