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

const DelayedMemberResponseTimeChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/members/delayedresponse?group_id=${groupId}`
      );
      const result = await response.json();
      
      // Extract relevant data
      const labels = result.delayed_response.map((item) => item.sender_name);
      const data = result.delayed_response.map((item) => item.average_response_day);

      setChartData({
        labels,
        datasets: [
          {
            label: "Average Response Time (Days)",
            data,
            backgroundColor: isDarkMode
              ? "rgba(67, 229, 244, 1)"
              : "rgba(75, 192, 192, 1)",
            borderColor: isDarkMode
              ? "rgba(67, 229, 244, 1)"
              : "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);
    
    fetchData(); // Fetch data when component mounts

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [groupId]);

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
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Response Time: ${tooltipItem.raw} days`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: { display: true, text: "Member Names", color: "white" },
                ticks: { color: "white" },
                grid: { display: false },
              },
              y: {
                title: { display: true, text: "Average Response Time (Days)", color: "white" },
                ticks: { color: "white" },
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
                  ? "rgba(67, 229, 244, 0.8)"
                  : "rgba(75, 192, 192, 0.8)",
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

export default DelayedMemberResponseTimeChart;
