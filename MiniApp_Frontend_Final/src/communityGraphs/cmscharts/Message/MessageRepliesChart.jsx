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

// Registering necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MessageRepliesChart = ({
  labels = [], // Labels representing messages
  data = [],   // Data representing average replies per message
  isDashboard = false,
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dynamicLabels, setDynamicLabels] = useState(labels);
  const [dynamicData, setDynamicData] = useState(data);

  const chartData = {
    labels: dynamicLabels,
    datasets: [
      {
        data: dynamicData,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/messages/messagesreplies?group_id=${group_id}', {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Parse the JSON response
      const result = await response.json();
      // Assuming the response structure has message and avgReplies
      const labelsFromAPI = result.map(item => item.message);
      const dataFromAPI = result.map(item => item.avgReplies);

      // Update state with the data fetched from the backend
      setDynamicLabels(labelsFromAPI);
      setDynamicData(dataFromAPI);

      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Set theme based on system preference and fetch data on mount
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();

    // Set theme based on system preference
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
                    return `Avg. Replies: ${tooltipItem.raw}`; // Tooltip for average replies
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Messages", // X-axis label updated to Messages
                  color:"white"
                },
                ticks:{
                  color:"white"
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Avg. Replies", // Y-axis label updated to Avg. Replies
                  color:"white"
                },
                ticks:{
                  color:"white"
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

export default MessageRepliesChart;
