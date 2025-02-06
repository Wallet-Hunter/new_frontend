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

const TopPerformingBotsChart = ({
  botNames = [], // Bot names or IDs as Y-axis labels
  engagementLevels = [], // Engagement level (e.g., number of actions or interactions) per bot
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock data for testing before fetching dynamic data
  const mockBotNames = ["Bot A", "Bot B", "Bot C", "Bot D"];
  const mockEngagementLevels = [250, 400, 550, 600];

  // Set the chart data using either dynamic or mock data
  const chartData = {
    labels: botNames.length > 0 ? botNames : mockBotNames, // Use dynamic data if available, else mock data
    datasets: [
      {
        label: "Engagement Level", // Dataset label
        data: engagementLevels.length > 0 ? engagementLevels : mockEngagementLevels, // Use dynamic data if available, else mock data
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
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

  // Uncomment and implement dynamic fetching logic from BigQuery when needed
  // useEffect(() => {
  //   const fetchBotData = async () => {
  //     try {
  //       // Simulate fetching data from BigQuery (Replace with actual fetching logic)
  //       const response = await fetchBigQueryData();
  //       const fetchedBotNames = response.botNames;
  //       const fetchedEngagementLevels = response.engagementLevels;
  //       setBotNames(fetchedBotNames);
  //       setEngagementLevels(fetchedEngagementLevels);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchBotData();
  // }, []);

  // Function to simulate fetching data from BigQuery for testing (Remove this when fetching real data)
  const fetchBigQueryData = async () => {
    // Simulate a delay
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          botNames: ["Bot E", "Bot F", "Bot G", "Bot H"],
          engagementLevels: [150, 300, 450, 500],
        });
      }, 1000)
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            indexAxis: "y", // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Engagement Level: ${tooltipItem.raw}`; // Tooltip shows engagement level
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Engagement Level", // X-axis title
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
              y: {
                title: {
                  display: true,
                  text: "Bot Names or IDs", // Y-axis title
                  color:"white"
                },
                ticks:{
                  color:"white"
                },
                grid: {
                  display: false,
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                backgroundColor: isDarkMode
                  ? backgroundColorDark
                  : backgroundColorLight,
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

export default TopPerformingBotsChart;
