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

const GroupCultureChart = ({
  groupId,
  timeLabels = [], // Default time labels (days/weeks/months/member IDs)
  avgInteractionReplies = [], // Default average replies
  avgInteractionReactions = [], // Default average reactions
  backgroundColorLight = ["rgba(75, 192, 192, 1)", "rgba(67, 229, 244, 1)"], // Light mode colors
  backgroundColorDark = ["rgba(67, 229, 244, 1)", "rgba(75, 192, 192, 1)"], // Dark mode colors
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: timeLabels,
    datasets: [
      {
        label: "Average Replies",
        data: avgInteractionReplies,
        backgroundColor: backgroundColorLight[0], // Default light mode color
        borderColor: backgroundColorLight[0],
        borderWidth: 1,
      },
      {
        label: "Average Reactions",
        data: avgInteractionReactions,
        backgroundColor: backgroundColorLight[1], // Default light mode color
        borderColor: backgroundColorLight[1],
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/groupculturewithanonymity?group_id=${groupId}`, {
        method: "GET",
        //credentials: "include",
      });

      const result = await response.json();

      const timeLabels = result.map((item) => item.timeLabel);
      const avgInteractionReplies = result.map((item) => item.avgReplies);
      const avgInteractionReactions = result.map((item) => item.avgReactions);

      setChartData({
        labels: timeLabels,
        datasets: [
          {
            label: "Average Replies",
            data: avgInteractionReplies,
            backgroundColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderColor: isDarkMode ? backgroundColorDark[0] : backgroundColorLight[0],
            borderWidth: 1,
          },
          {
            label: "Average Reactions",
            data: avgInteractionReactions,
            backgroundColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
            borderColor: isDarkMode ? backgroundColorDark[1] : backgroundColorLight[1],
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
            plugins: {
              legend: {
                display: false,
                //position: "top",
                labels: {
                  color: isDarkMode ? "white" : "black",
                },
              },

            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: " Member IDs",
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Average Interaction",
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
                },
                beginAtZero: true,
              },
            },
            elements: {
              bar: {
                borderRadius: 5,
                hoverBackgroundColor: isDarkMode
                  ? `${backgroundColorDark[1]}0.7`
                  : `${backgroundColorLight[1]}0.7`,
              },
            },
            indexAxis: "x", // Horizontal bars
            stacked: true,
          }}
        />
      </div>
    </div>
  );
};

export default GroupCultureChart;
