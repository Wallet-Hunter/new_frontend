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

const EventEngagementChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBigQueryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/event/eventengagementchart?group_id=${groupId}`
      );
      const result = await response.json();

      if (!result || !result.rows || result.rows.length === 0) {
        setChartData(null);
      } else {
        // Extracting data from API response
        const eventNames = result.rows.map(row => row.event_name);
        const messages = result.rows.map(row => row.messages);
        const reactions = result.rows.map(row => row.reactions);
        const replies = result.rows.map(row => row.replies);

        setChartData({
          labels: eventNames,
          datasets: [
            {
              label: "Messages",
              data: messages,
              backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
              borderColor: isDarkMode ? "#225557" : "#54d5d9",
              borderWidth: 1,
            },
            {
              label: "Reactions",
              data: reactions,
              backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
              borderColor: isDarkMode ? "#54d5d9" : "#43aaae",
              borderWidth: 1,
            },
            {
              label: "Replies",
              data: replies,
              backgroundColor: isDarkMode ? "#43aaae" : "#225557",
              borderColor: isDarkMode ? "#43aaae" : "#225557",
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
      fetchBigQueryData(); // Refetch data when theme changes
    };

    matchMedia.addEventListener("change", handleThemeChange);
    
    return () => matchMedia.removeEventListener("change", handleThemeChange);
  }, []);

  useEffect(() => {
    if (groupId) {
      fetchBigQueryData();
    }
  }, [groupId]);

  if (loading) return <div>Loading chart data...</div>;
  if (!chartData) return <div>No engagement data available</div>;

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
                  label: (tooltipItem) =>
                    `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                stacked: true,
                title: { display: true, text: "Events", color: "white" },
                ticks: { color: "white" },
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: "Average Engagement",
                  color: "white",
                },
                ticks: { color: "white" },
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

export default EventEngagementChart;
