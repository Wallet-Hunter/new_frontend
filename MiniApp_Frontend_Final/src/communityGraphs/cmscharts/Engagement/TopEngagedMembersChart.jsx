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

const TopEngagedMembersChart = ({ groupId }) => {
  const backgroundColorLight = "rgba(153, 102, 255, 1)";
  const backgroundColorDark = "rgba(104, 219, 254, 1)";

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({ labels: [], values: [] }); // Merged into a single data state

  // Fetch data from BigQuery
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/topengagedmembers?group_id=${groupId}`,
        {
          method: "GET",
          // headers: {
          //   "ngrok-skip-browser-warning": "true",
          // },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      const memberNames = result.map((item) => item.userName);
      const engagementCounts = result.map((item) => item.engagementCount);

      setData({
        labels: memberNames,
        values: engagementCounts,
      });

      console.log("Transformed data:", { memberNames, engagementCounts });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts

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
    labels: data.labels,
    datasets: [
      {
        label: "Engagement Count",
        data: data.values, // Use data from state
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
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Engagement Count: ${tooltipItem.raw}`; // Tooltip shows engagement count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Engagement Count",
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
              y: {
                title: {
                  display: true,
                  text: "Member Names or IDs",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  display: false,
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
                  ? `${backgroundColorDark}CC`
                  : `${backgroundColorLight}CC`,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopEngagedMembersChart;
