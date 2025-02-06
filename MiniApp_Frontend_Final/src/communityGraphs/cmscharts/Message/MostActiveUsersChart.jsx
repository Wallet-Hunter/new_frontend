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

const MostActiveUsersChart = ({
  members = [], // Member names or IDs (Y-axis)
  messageCounts = [], // Number of messages sent by each member (X-axis)
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({
    labels: members, // Member names/IDs for Y-axis
    values: messageCounts, // Number of messages for X-axis
  });

  // Fetch data from BigQuery (commented out for now)
  const fetchData = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/messages/mostactiveusers?group_id=${group_id}', {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();

      // Set the data state with member names/IDs and message counts
      setData({
        labels: result.members, // Assuming the result contains member names/IDs
        values: result.messageCounts, // Assuming the result contains message counts
      });

      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Hardcoded data for testing
  const hardcodedData = {
    labels: [], // Member names/IDs
    values: [], // Number of messages sent
  };

  useEffect(() => {
    // Commented out: fetchData(); // Call fetchData when the component mounts

    // For testing, use hardcoded data
    setData(hardcodedData);

    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Chart data configuration
  const chartData = {
    labels: data.labels, // Member names/IDs
    datasets: [
      {
        label: "Messages Sent", // Dataset label
        data: data.values, // Number of messages sent by each member
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

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
                    return `Messages: ${tooltipItem.raw}`; // Tooltip shows number of messages
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Number of Messages", // X-axis title (Number of Messages Sent)
                  color:"white"
                },
                ticks:{
                  color:"white"
                },
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Members", // Y-axis title (Members)
                  color:"white"
                },

                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 10,
                  color:"white"
                },
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

export default MostActiveUsersChart;
