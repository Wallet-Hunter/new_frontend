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

const MessagePerformanceChart = ({
  labels = [], // Labels representing messages
  repliesData = [], // Data representing count of replies
  reactionsData = [], // Data representing count of reactions
  isDashboard = false,
  backgroundColorReplies = "rgba(75, 192, 192, 1)",
  backgroundColorReactions = "rgba(84, 213, 217, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch("https://b653-27-6-209-17.ngrok-free.app/graphs/messages/messagePerformance?{group_id}", {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Parse the JSON response
      const result = await response.json();
      setChartData({
        labels: result.labels,
        datasets: [
          {
            label: "Replies",
            data: result.repliesData,
            backgroundColor: isDarkMode ? backgroundColorReplies : backgroundColorReplies,
            borderColor: isDarkMode ? backgroundColorReplies : backgroundColorReplies,
            borderWidth: 1,
          },
          {
            label: "Reactions",
            data: result.reactionsData,
            backgroundColor: isDarkMode ? backgroundColorReactions : backgroundColorReactions,
            borderColor: isDarkMode ? backgroundColorReactions : backgroundColorReactions,
            borderWidth: 1,
          },
        ],
      });
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
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
            hover: {
              animationDuration: 500,
              mode: "nearest",
              intersect: true,
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  color: isDarkMode ? "white" : "black",
                },
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
                  text: "Messages", // X-axis label updated to Messages
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                stacked: true, // Enable stacking on X-axis
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Count", // Y-axis label updated to Count
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                beginAtZero: true,
                stacked: true, // Enable stacking on Y-axis
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
              },
            },
          }}
        />
      </div>

      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05); /* Scale the entire chart on hover */
          transition: transform 0.3s ease;
        }
        .chartjs-render-monitor:hover {
          transition: transform 0.3s ease;
          transform: scale(1.05); /* Scale specific bars on hover */
        }
      `}</style>
    </div>
  );
};

export default MessagePerformanceChart;
