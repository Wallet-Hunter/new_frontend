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
  groupId,
  backgroundColorLight = "#54d5d9",
  backgroundColorDark = "#43aaae",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null); // Set to null initially
  const [hasData, setHasData] = useState(false); // Track if we have valid data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/message/messageEngagementRate?group_id=${groupId}`
        );
        const result = await response.json();

        // Ensure data exists and is valid
        if (!result || result.length === 0 || result.every(item => item.avg_engagement_rate == null)) {
          setHasData(false);
          return;
        }

        setHasData(true);

        const labels = result.map((item) => item.date?.value || "Unknown Date");
        const engagementRates = result.map((item) => item.avg_engagement_rate ?? 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Avg Engagement Rate",
              data: engagementRates,
              backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
              borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setHasData(false);
      }
    };

    fetchData();
  }, [groupId, isDarkMode]);

  useEffect(() => {
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
      {!hasData ? (
        <div style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", padding: "20px", color: isDarkMode ? "white" : "black" }}>
          0
        </div>
      ) : (
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
                    label: (tooltipItem) => {
                      return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Date",
                    color: "white",
                  },
                  ticks: {
                    color: "white",
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
                    text: "Engagement Rate",
                    color: "white",
                  },
                  ticks: {
                    color: "white",
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
      )}
    </div>
  );
};

export default MessageEngagementChart;
