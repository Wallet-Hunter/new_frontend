import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const AnonymousUserInteractionChart = ({
  groupId,
  backgroundColorLight = ["rgba(75, 192, 192, 1)", "rgba(67, 229, 244, 1)", "rgba(255, 165, 0, 1)"], // Light mode colors for Replies, Forwards, Views
  backgroundColorDark = ["rgba(67, 229, 244, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 99, 71, 1)"], // Dark mode colors for Replies, Forwards, Views
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["No Data"], // Default placeholder
    datasets: [
      {
        label: "Replies",
        data: [0],
        backgroundColor: backgroundColorLight[0],
        borderColor: backgroundColorLight[0],
        borderWidth: 1,
      },
      {
        label: "Forwards",
        data: [0],
        backgroundColor: backgroundColorLight[1],
        borderColor: backgroundColorLight[1],
        borderWidth: 1,
      },
      {
        label: "Views",
        data: [0],
        backgroundColor: backgroundColorLight[2],
        borderColor: backgroundColorLight[2],
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/anonymoususerinteraction?group_id=${groupId}`,
        {
          method: "GET",
        }
      );

      // Parse the JSON response
      const result = await response.json();

      console.log("API Response:", result); // Debugging

      if (!Array.isArray(result) || result.length === 0) {
        console.warn("No data received from API, using default values.");
        return;
      }

      // Extract data and ensure zeros if all values are 0 or null
      const dates = result.map((item) => item.date || "Unknown");
      const replies = result.map((item) => item.replies ?? 0);
      const forwards = result.map((item) => item.forwards ?? 0);
      const views = result.map((item) => item.views ?? 0);

      // Check if all values in a row are zero
      const allZero = replies.every((val) => val === 0) &&
                      forwards.every((val) => val === 0) &&
                      views.every((val) => val === 0);

      // If all values are zero, show 0 instead of empty chart
      setChartData({
        labels: allZero ? ["No Data"] : dates,
        datasets: [
          {
            label: "Replies",
            data: allZero ? [0] : replies,
            backgroundColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderWidth: 1,
          },
          {
            label: "Forwards",
            data: allZero ? [0] : forwards,
            backgroundColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
            borderColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
            borderWidth: 1,
          },
          {
            label: "Views",
            data: allZero ? [0] : views,
            backgroundColor: isDarkMode ? backgroundColorDark[2] : backgroundColorLight[2],
            borderColor: isDarkMode ? backgroundColorDark[2] : backgroundColorLight[2],
            borderWidth: 1,
          },
        ],
      });

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Fetch data when the component is mounted
    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

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
            hover: {
              animationDuration: 500,
              mode: "nearest",
              intersect: true,
            },
            plugins: {
              legend: {
                display: true, // Displaying the legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Tooltip showing the interaction count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date", // X-axis label
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
                  text: "Count", // Y-axis label
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
                hoverBackgroundColor: isDarkMode
                  ? `${backgroundColorDark[0]}0.7`
                  : `${backgroundColorLight[0]}0.7`,
              },
            },
            // Stacked bar chart configuration
            indexAxis: "x",
            stacked: true,
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

export default AnonymousUserInteractionChart;
