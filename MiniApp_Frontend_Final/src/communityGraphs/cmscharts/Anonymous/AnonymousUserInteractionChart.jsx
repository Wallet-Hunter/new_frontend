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
  interactionTypes = [], // Default interaction types
  replyCounts = [], // Default reply counts for each interaction type
  reactionCounts = [], // Default reaction counts for each interaction type
  backgroundColorLight = ["rgba(75, 192, 192, 1)", "rgba(67, 229, 244, 1)"], // Light mode colors for replies and reactions
  backgroundColorDark = ["rgba(67, 229, 244, 1)", "rgba(75, 192, 192, 1)"], // Dark mode colors for replies and reactions
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: interactionTypes,
    datasets: [
      {
        label: "Replies",
        data: replyCounts,
        backgroundColor: backgroundColorLight[0], // Default color
        borderColor: backgroundColorLight[0],
        borderWidth: 1,
      },
      {
        label: "Reactions",
        data: reactionCounts,
        backgroundColor: backgroundColorLight[1], // Default color
        borderColor: backgroundColorLight[1],
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/anonymoususerinteraction?group_id=${groupId}`, {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Parse the JSON response
      const result = await response.json();

      // Assuming the backend returns an array of objects with date, replies, views, and forwards
      const dates = result.map(item => item.date);
      const replies = result.map(item => item.replies);
      const forwards = result.map(item => item.forwards);

      // Update the chart data with the fetched data
      setChartData({
        labels: dates, // Use dates as labels
        datasets: [
          {
            label: "Replies",
            data: replies,
            backgroundColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderWidth: 1,
          },
          {
            label: "Forwards",
            data: forwards,
            backgroundColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
            borderColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
            borderWidth: 1,
          },
        ],
      });

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

    // Fetch data when the component is mounted
    fetchData();

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
                display: false, // Displaying the legend
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
                  text: "Date", // X-axis label showing the date
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
                  text: "Count", // Y-axis label for interaction count
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
                hoverBackgroundColor: isDarkMode ? `${backgroundColorDark[0]}0.7` : `${backgroundColorLight[0]}0.7`,
              },
            },
            // Stacked bar chart configuration
            indexAxis: 'x', // Horizontal bars
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
