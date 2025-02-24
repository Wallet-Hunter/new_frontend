import React, { useEffect, useState } from 'react';
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

const EventPopularityChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/event/eventpopularitychart?group_id=${groupId}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (data.rows && Array.isArray(data.rows)) {
          const processedData = {
            labels: data.rows.map((row) => `Event ${row.event_id}`),
            datasets: [
              {
                label: "Total Views",
                data: data.rows.map((row) => row.total_views),
                backgroundColor: isDarkMode ? "rgba(67, 229, 244, 1)" : "rgba(75, 192, 192, 1)",
              },
              {
                label: "Total Replies",
                data: data.rows.map((row) => row.total_replies),
                backgroundColor: isDarkMode ? "rgba(255, 99, 132, 1)" : "rgba(255, 159, 64, 1)",
              },
              {
                label: "Total Forwards",
                data: data.rows.map((row) => row.total_forwards),
                backgroundColor: isDarkMode ? "rgba(153, 102, 255, 1)" : "rgba(54, 162, 235, 1)",
              },
            ],
          };
          setChartData(processedData);
        }
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };

    fetchChartData();
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
      <div 
        style={{ 
          width: "100%", 
          height: "90%", 
          opacity: chartData ? 1 : 0, 
          transition: "opacity 0.5s ease-in-out" 
        }} 
        className="chart-container"
      >
        {chartData && (
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
                  display: true,
                  position: "top",
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
                    text: "Events",
                    color: isDarkMode ? "white" : "black",
                  },
                  ticks: {
                    color: isDarkMode ? "white" : "black",
                  },
                  grid: {
                    color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  },
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
                  grid: {
                    color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  },
                },
              },
              elements: {
                bar: {
                  borderRadius: 10,
                  hoverBackgroundColor: isDarkMode
                    ? "rgba(67, 229, 244, 0.7)"
                    : "rgba(75, 192, 192, 0.7)",
                },
              },
            }}
          />
        )}
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

export default EventPopularityChart;
