import React, { useEffect, useState } from "react";
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

const BotEngagementChart = () => {
  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Function to fetch data using the new structure
  /*
  const fetchData = async () => {
    try {
      const response = await fetch(
        '${process.env.REACT_APP_SERVER_URL}/graphs/bots/botengagement?{group_id}',
        {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      const data = result.data; // Adjust based on the API response structure

      // Parse the fetched data
      const dates = data.map((row) => row.date);
      const replies = data.map((row) => row.replies);
      const forwards = data.map((row) => row.forwards);

      // Update chartData state with the fetched data
      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Replies",
            data: replies,
            backgroundColor: isDarkMode ? "#43aaae" : "#54d5d9",
            borderColor: isDarkMode ? "#43aaae" : "#54d5d9",
            borderWidth: 1,
          },
          {
            label: "Forwards",
            data: forwards,
            backgroundColor: isDarkMode ? "#225557" : "#43aaae",
            borderColor: isDarkMode ? "#225557" : "#43aaae",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  */

  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Commented out the fetchData for testing
    // fetchData();

    // Hardcoded data for testing
    const dates = ["2024-12-20", "2024-12-21", "2024-12-22", "2024-12-23"];
    const replies = [100, 120, 90, 150];
    const forwards = [50, 60, 70, 80];

    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Replies",
          data: replies,
          backgroundColor: isDarkMode ? "#43aaae" : "#54d5d9",
          borderColor: isDarkMode ? "#43aae" : "#54d5d9",
          borderWidth: 1,
        },
        {
          label: "Forwards",
          data: forwards,
          backgroundColor: isDarkMode ? "#225557" : "#43aaae",
          borderColor: isDarkMode ? "#225557" : "#43aaae",
          borderWidth: 1,
        },
      ],
    });

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

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
                display: true, // Enable legend
                position: "top",
                labels: {
                  color: isDarkMode ? "#FFFFFF" : "#000000",
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
                stacked: true, // Enable stacking
                title: {
                  display: true,
                  text: "Date",
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                },
                ticks: {
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                },
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                stacked: true, // Enable stacking
                title: {
                  display: true,
                  text: "Bot Engagement",
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                },
                ticks: {
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
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

export default BotEngagementChart;
