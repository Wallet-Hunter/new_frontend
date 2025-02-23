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

const EventParticipationPatternsChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Function to fetch data dynamically from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/members/eventparticipation?group_id=${groupId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      // Extracting data from API response
      const labels = result.event_participation.map((item) => item.sender_name);
      const data = result.event_participation.map(
        (item) => item.total_event_participation
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Number of Events Participated",
            data: data,
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

      console.log("Data successfully fetched from the backend:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);

      // Default test data in case of an error
      setChartData({
        labels: ["Member1", "Member2", "Member3", "Member4", "Member5"],
        datasets: [
          {
            label: "Number of Events Participated",
            data: [3, 7, 5, 2, 4],
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
    }
  };

  useEffect(() => {
    // Detect Dark Mode
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    fetchData(); // Fetch data from backend

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [groupId, isDarkMode]);

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
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Events Participated: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member Names",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "No. of Participated Events",
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

export default EventParticipationPatternsChart;
