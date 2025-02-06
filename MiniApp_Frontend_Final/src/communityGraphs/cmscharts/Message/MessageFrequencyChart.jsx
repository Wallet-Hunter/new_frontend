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

const MessageFrequencyChart = ({
  labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // Days of the week
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        data: [],
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        '${process.env.REACT_APP_SERVER_URL}/graphs/messages/messagefrequency?group_id=${group_id}',
        {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();
      const messageFrequency = result.map((item) => item.message_count); // Adjust based on API response

      setChartData({
        labels,
        datasets: [
          {
            data: messageFrequency,
            backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderWidth: 1,
          },
        ],
      });

      console.log("Data successfully fetched from the backend:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDarkMode, labels]);

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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
              mode: 'nearest',
              intersect: true,
            },
            plugins: {
              legend: {
                display: false, // Legend removed
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Message Frequency: ${tooltipItem.raw}`; // Tooltip updated to show message frequency
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Days of the Week", // X-axis label updated to Days of the Week
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
                  text: "Message Frequency", // Y-axis label updated to Message Frequency
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? 'rgba(220, 220, 220, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
                hoverBackgroundColor: isDarkMode ? `${backgroundColorDark}0.7` : `${backgroundColorLight}0.7`,
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

export default MessageFrequencyChart;
