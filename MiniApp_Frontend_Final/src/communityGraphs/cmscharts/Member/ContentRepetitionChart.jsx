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

const ContentRepetitionChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Repeated Content Count",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/member/contentrepetition?group_id=${groupId}`
      );
      const result = await response.json();
      
      // Extract relevant data
      const senderData = {};
      result.content_repetition.forEach((item) => {
        if (senderData[item.sender_name]) {
          senderData[item.sender_name] += item.repeated_posts;
        } else {
          senderData[item.sender_name] = item.repeated_posts;
        }
      });
      
      const senderNames = Object.keys(senderData);
      const repeatedCounts = Object.values(senderData);

      setChartData({
        labels: senderNames,
        datasets: [
          {
            label: "Repeated Content Count",
            data: repeatedCounts,
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
      console.error("Error fetching data:", error.message);
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
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Repetitions: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Sender's",
                  color: "white",
                },
                ticks: {
                  display:false,
                  color: "#fff",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Content Repetition Count",
                  color: "white",
                },
                ticks: {
                  color: "#fff",
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ContentRepetitionChart;