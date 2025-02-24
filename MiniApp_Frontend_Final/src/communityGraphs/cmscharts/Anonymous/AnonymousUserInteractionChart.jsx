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

const AnonymousUserInteractionChart = ({
  groupId,
  backgroundColorLight = ["rgba(75, 192, 192, 1)", "rgba(67, 229, 244, 1)", "rgba(85, 249, 244, 1)"],
  backgroundColorDark = ["rgba(67, 229, 244, 1)", "rgba(75, 192, 192, 1)", "rgba(85, 249, 244, 1)"],
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["No Data"],
    datasets: [
      { label: "Replies", data: [0], backgroundColor: backgroundColorLight[0] },
      { label: "Forwards", data: [0], backgroundColor: backgroundColorLight[1] },
      { label: "Views", data: [0], backgroundColor: backgroundColorLight[2] },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/anonymoususerinteraction?group_id=${groupId}`
      );
      const result = await response.json();
      console.log("API Response:", result);

      if (!Array.isArray(result) || result.length === 0) {
        console.warn("No data received, using default values.");
        return;
      }

      const dates = result.map((item) => item.date || "Unknown");
      const replies = result.map((item) => item.replies ?? 0);
      const forwards = result.map((item) => item.forwards ?? 0);
      const views = result.map((item) => item.views ?? 0);
      
      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Replies",
            data: replies,
            backgroundColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
          },
          {
            label: "Forwards",
            data: forwards,
            backgroundColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
          },
          {
            label: "Views",
            data: views,
            backgroundColor: isDarkMode ? backgroundColorDark[2] : backgroundColorLight[2],
          },
        ],
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
  }, [groupId]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000, easing: "easeOutQuart" },
          hover: { animationDuration: 500 },
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
          indexAxis: "x",
          stacked: true,
        }}
      />
    </div>
  );
};

export default AnonymousUserInteractionChart;
