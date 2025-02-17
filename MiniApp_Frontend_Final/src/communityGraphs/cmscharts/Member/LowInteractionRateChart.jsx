import React, { useEffect, useState } from "react";
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

const LowInteractionRateChart = ({
  groupId,
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  

  // Function to fetch and process the data
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/member/lowinteractionrate?group_id=${groupId}`
      );
      const result = await response.json();

      // Process data: group interaction counts by sender_id
      const interactionMap = {};
      result.data.forEach((entry) => {
        if (interactionMap[entry.sender_name]) {
          interactionMap[entry.sender_name] += entry.low_interaction_count;
        } else {
          interactionMap[entry.sender_name] = entry.low_interaction_count;
        }
      });

      // Convert map into arrays for chart
      const members = Object.keys(interactionMap);
      const interactionRates = Object.values(interactionMap);

      // Update chart state
      setChartData({
        labels: members,
        datasets: [
          {
            label: "Interaction Rate",
            data: interactionRates,
            backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderWidth: 1,
          },
        ],
      });

      console.log("Processed Chart Data:", { members, interactionRates });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    matchMedia.addEventListener("change", (e) => setIsDarkMode(e.matches));

    fetchData(); // Fetch data on mount

    return () => matchMedia.removeEventListener("change", (e) => setIsDarkMode(e.matches));
  }, [groupId]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#171717",
      }}
    >
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: "easeOutQuart" },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Interaction Rate: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: { display: true, text: "Member's", color: "white" },
                ticks: { display:false, color: "#fff" },
                grid: { display: false },
              },
              y: {
                title: { display: true, text: "Interaction Rate", color: "white" },
                ticks: { color: "#fff" },
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
                backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
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

export default LowInteractionRateChart;
