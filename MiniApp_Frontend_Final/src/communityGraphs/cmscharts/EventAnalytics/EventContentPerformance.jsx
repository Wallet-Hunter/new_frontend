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

const EventContentPerformance = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/event/eventcontentperformance?group_id=${groupId}`
        );
        const data = await response.json();
        
        if (!data.rows || data.rows.length === 0) {
          setChartData(null);
          return;
        }

        const eventIDs = data.rows.map(row => `E${row.event_id}`);
        const videosCount = data.rows.map(row => row.total_videos);
        const imagesCount = data.rows.map(row => row.total_images);
        const textCount = data.rows.map(row => row.total_texts);

        setChartData({
          labels: eventIDs,
          datasets: [
            {
              label: "Videos",
              data: videosCount,
              backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
            },
            {
              label: "Images",
              data: imagesCount,
              backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
            },
            {
              label: "Text",
              data: textCount,
              backgroundColor: isDarkMode ? "#43aaae" : "#225557",
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChartData();
  }, [isDarkMode, groupId]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  if (!chartData) {
    return <div>Loading chart...</div>;
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
                display: false,
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
                stacked: true,
                title: {
                  display: true,
                  text: "Event IDs",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: "Count of Content Types",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                hoverBackgroundColor: isDarkMode ? "#43aaaeCC" : "#54d5d9CC",
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

export default EventContentPerformance;