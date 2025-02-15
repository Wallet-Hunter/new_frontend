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

const TopCommandChart = ({
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Hardcoded fallback data for bot commands
  const hardcodedData = [
    
  ];

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        '${process.env.REACT_APP_SERVER_URL}/graphs/bots/frequency',
        {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        }
      );

      // Parse the JSON response
      const result = await response.json();
      console.log("Data successfully fetched from the backend:", result);

      // Update chart data with fetched data
      setChartData({
        labels: result.map((item) => item.command_name),
        datasets: [
          {
            data: result.map((item) => item.frequency),
            backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);

      // Fallback to hardcoded data in case of an error
      console.log("Using hardcoded data as a fallback.");
      setChartData({
        labels: hardcodedData.map((item) => item.command_name),
        datasets: [
          {
            data: hardcodedData.map((item) => item.frequency),
            backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderWidth: 1,
          },
        ],
      });
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    // Update chart colors based on theme
    if (chartData.labels.length > 0) {
      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: prevChartData.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
          borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        })),
      }));
    }
  }, [isDarkMode, backgroundColorLight, backgroundColorDark]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
              mode: "nearest",
              intersect: true,
            },
            plugins: {
              legend: {
                display: false, // Legend hidden
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Frequency: ${tooltipItem.raw}`; // Tooltip showing frequency
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Commands", // X-axis label
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Frequency of Use", // Y-axis label
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
    </div>
  );
};

export default TopCommandChart;
