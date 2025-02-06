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

const BotErrorRateChart = ({
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Example of hardcoded data for testing
  const hardcodedLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  const hardcodedErrorRateData = [10, 15, 20, 25, 30];

  const [labels, setLabels] = useState(hardcodedLabels);
  const [errorRateData, setErrorRateData] = useState(hardcodedErrorRateData);

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}', {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Parse the JSON response
      const result = await response.json();
      // Use the fetched data (e.g., set the labels and error rate data)
      setLabels(result.map(item => item.time)); // Assuming 'time' is part of your response
      setErrorRateData(result.map(item => item.errorRate)); // Assuming 'errorRate' is part of your response
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // For now, we are not fetching data, just using hardcoded values.
    // Uncomment the following line to fetch data from the backend
    // fetchData();  // Uncomment to fetch data from the backend

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        data: errorRateData,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ width: "100%", height: "100%" }} className="chart-container">
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
                    return `Error Rate: ${tooltipItem.raw}`; // Tooltip for error rate
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date", // X-axis label indicating time (days, weeks, months)
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
                  text: "Error Rate", // Y-axis label for error rate
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
                backgroundColor: isDarkMode
                  ? backgroundColorDark
                  : backgroundColorLight,
                hoverBackgroundColor: isDarkMode
                  ? `${backgroundColorDark}0.7`
                  : `${backgroundColorLight}0.7`,
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

export default BotErrorRateChart;
