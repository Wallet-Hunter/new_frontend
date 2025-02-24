import React, { useState, useEffect, useMemo } from "react";
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

const MessagePerformanceChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/messages/messagePerformance?group_id=${groupId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Fetched Data:", result);

        if (!Array.isArray(result) || result.length === 0) {
          throw new Error("No data available.");
        }

        setChartData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  const formattedChartData = useMemo(() => {
    if (!chartData) return null;

    return {
      labels: chartData.map((item) => `Msg ${item.message_id}`),
      datasets: [
        {
          label: "Replies",
          data: chartData.map((item) => item.total_replies),
          backgroundColor: "rgba(75, 192, 192, 0.8)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Forwards",
          data: chartData.map((item) => item.total_forwards),
          backgroundColor: "rgba(255, 159, 64, 0.8)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [chartData]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={formattedChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
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
                  label: (tooltipItem) =>
                    `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Messages",
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
                },
                grid: { display: false },
              },
              y: {
                title: {
                  display: true,
                  text: "Count",
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
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

export default MessagePerformanceChart;
