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

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RepetitiveReactionsChart = ({ groupId, backgroundColorLight = "rgba(75, 192, 192, 1)", backgroundColorDark = "rgba(67, 229, 244, 1)" }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [senderNames, setSenderNames] = useState([]);
  const [reactionsCounts, setReactionsCounts] = useState([]);

  // Function to fetch repetitive reactions data from the backend API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/member/repetitivereactions?group_id=${groupId}`
      );
      const result = await response.json();
      
      if (result && result.repetitive_reactions) {
        const names = result.repetitive_reactions.map(item => item.sender_name);
        const reactions = result.repetitive_reactions.map(item => item.repeated_reactions);
        
        setSenderNames(names);
        setReactionsCounts(reactions);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Fetch data when the component mounts or groupId changes
  useEffect(() => {
    fetchData();
  }, [groupId]);

  // Detect and apply dark mode preferences
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Chart dataset and configurations
  const chartData = {
    labels: senderNames,
    datasets: [
      {
        label: "Total Reactions",
        data: reactionsCounts,
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
            indexAxis: "y", // Horizontal bar chart
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
                  label: (tooltipItem) => `Total Reactions: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Total Reactions",
                  color: isDarkMode ? "#fff" : "#000",
                },
                ticks: {
                  color: isDarkMode ? "#fff" : "#000",
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sender Name",
                  color: isDarkMode ? "#fff" : "#000",
                },
                ticks: {
                  display:false,
                  color: isDarkMode ? "#fff" : "#000",
                },
                grid: {
                  display: false,
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                hoverBackgroundColor: isDarkMode
                  ? `${backgroundColorDark}CC`
                  : `${backgroundColorLight}CC`,
              },
            },
          }}
        />
      </div>
      <style jsx>{`
        .chart-container:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default RepetitiveReactionsChart;