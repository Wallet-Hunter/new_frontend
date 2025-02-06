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

const RepetitiveFeedbackChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Fetch data from Backend (currently commented out)
  /*
  const fetchData = async () => {
    try {
      const response = await fetch("${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}", {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Parse the JSON response
      const result = await response.json();
      setData(result);
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  */

  useEffect(() => {
    // Dark Mode Detection
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Commented dynamic data fetching for Backend
    // fetchData();

    // Hardcoded test data for "Repetitive Feedback in Surveys"
    const testLabels = ["Member1", "Member2", "Member3", "Member4", "Member5"];
    const testData = [3, 5, 2, 4, 6]; // Repeated feedback entries

    setChartData({
      labels: testLabels,
      datasets: [
        {
          label: "Number of Repeated Feedback Entries",
          data: testData,
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

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [isDarkMode]);

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
                    return `Repeated Feedback Entries: ${tooltipItem.raw}`; // Tooltip shows feedback count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member IDs", // X-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // X-axis tick color
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "No of Repeated Entries", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // Y-axis tick color
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
          transform: scale(1.05); /* Scale the chart on hover */
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default RepetitiveFeedbackChart;
