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

const ContentRepetitionChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [], // X-axis: Sender Names
    datasets: [
      {
        label: "Repeated Content Count",
        data: [], // Y-axis: Repeated Content Counts
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        '${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?group_id=${group_id}',
        {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        }
      );

      // Parse the JSON response
      const result = await response.json();
      // Uncomment below to set the data when needed
      // setData(result);
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchDataFromBigQuery = async () => {
    try {
      // Hardcoded data for testing
      const hardcodedData = [
        { senderName: "User1", repetitionCount: 30 },
        { senderName: "User2", repetitionCount: 45 },
        { senderName: "User3", repetitionCount: 20 },
        { senderName: "User4", repetitionCount: 60 },
      ];

      const senderNames = hardcodedData.map((item) => item.senderName);
      const repeatedCounts = hardcodedData.map((item) => item.repetitionCount);

      setChartData({
        labels: senderNames,
        datasets: [
          {
            label: "Repeated Content Count",
            data: repeatedCounts,
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
    } catch (error) {
      console.error("Error fetching data from BigQuery:", error);
    }
  };

  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Fetch chart data
    fetchDataFromBigQuery();
    // Uncomment below to use the backend fetching logic
    // fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
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
                display: false, // Hide legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Repetitions: ${tooltipItem.raw}`;
                  },
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
                  color: "#fff", // X-axis tick color
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Content Repetition Count",
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

export default ContentRepetitionChart;
