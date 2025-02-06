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

const GroupRoleMisuseChart = ({
  memberIds = [], // Member IDs as X-axis labels
  misuseActivities = [], // Number of misuse activities for each member
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Hardcoded data for testing purposes
  const hardcodedMemberIds = [1, 2, 3, 4];
  const hardcodedMisuseActivities = [12, 5, 8, 3];

  // Chart data configuration
  const chartData = {
    labels: memberIds.length > 0 ? memberIds : hardcodedMemberIds, // Member IDs as X-axis labels
    datasets: [
      {
        label: "Misuse Activities", // Dataset label
        data: misuseActivities.length > 0 ? misuseActivities : hardcodedMisuseActivities, // Misuse activities count
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Fetch dynamic data (commented out for now)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}", {
  //         method: "GET",
  //         //credentials: "include", // Include credentials (cookies, etc.)
  //       });
  //
  //       // Parse the JSON response
  //       const result = await response.json();
  //       // setData(hardcodeddData)
  //       setData(result);
  //       console.log("Data successfully fetched from the backend:");
  //       console.log(result); // Log the result for debugging
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
                    return `Misuse Activities: ${tooltipItem.raw}`; // Tooltip shows misuse activity count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member ID", // X-axis title (Member ID)
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
                  text: "Number of Misuse Activities", // Y-axis title
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
                  ? `${backgroundColorDark}CC`
                  : `${backgroundColorLight}CC`,
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

export default GroupRoleMisuseChart;
