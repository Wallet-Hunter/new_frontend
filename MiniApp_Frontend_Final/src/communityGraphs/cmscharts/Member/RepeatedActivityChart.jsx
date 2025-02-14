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

const RepeatedActivityChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const fetchData = async () => {
    setIsTransitioning(true); // Start transition effect
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/member/repeatedactivity?group_id=${groupId}`
      );
      const result = await response.json();

      if (!result.repeated_activity || result.repeated_activity.length === 0) {
        throw new Error("Invalid API response or no data available");
      }

      const senderNames = result.repeated_activity.map(
        (item) => item.sender_name
      );
      const messageCounts = result.repeated_activity.map(
        (item) => item.message_count
      );

      setTimeout(() => {
        setChartData({
          labels: senderNames,
          datasets: [
            {
              label: "Repeated Messages",
              data: messageCounts,
              backgroundColor: isDarkMode
                ? "rgba(67, 229, 244, 1)"
                : "rgba(67, 229, 244, 1)",
              borderColor: isDarkMode
                ? "rgba(67, 229, 244, 1)"
                : "rgba(67, 229, 244, 1)",
              borderWidth: 1,
            },
          ],
        });
        setIsTransitioning(false); // End transition effect
      }, 500); // Delay for smooth transition
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Re-fetch when groupId or theme changes

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

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "90%",
          opacity: isTransitioning ? 0.5 : 1, // Smooth transition
          transition: "opacity 0.5s ease-in-out",
        }}
        className="chart-container"
      >
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
                  label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Sender Name",
                  color: "white",
                },
                ticks: {
                  display: false,
                  color: "#fff",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Repeated Messages",
                  color: "white",
                },
                ticks: {
                  color: "#fff",
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
    </div>
  );
};

export default RepeatedActivityChart;
