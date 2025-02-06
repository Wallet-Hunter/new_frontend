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

const MemberInteractionsChart = ({ groupId }) => {
  const backgroundColorLight = "rgba(75, 192, 192, 1)";
  const backgroundColorDark = "rgba(67, 229, 244, 1)";
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/membersinteractions?group_id=${groupId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Convert API response to expected format
        if (Array.isArray(result)) {
          const labels = result.map((entry) => entry.date);
          const data = result.map((entry) => entry.averageInteractions);

          setChartLabels(labels);
          setChartData(data);
        } else {
          console.error("Unexpected API response format:", result);
        }

        console.log("Fetched data:", result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [groupId]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {chartLabels.length > 0 ? (
        <div style={{ width: "100%", height: "90%" }} className="chart-container">
          <Bar
            data={data}
            options={{
              indexAxis: "y",
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                duration: 1000,
                easing: "easeOutQuart",
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `Avg Interactions: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Date",
                    color: isDarkMode ? "white" : "black",
                  },
                  ticks: { color: isDarkMode ? "white" : "black" },
                  grid: {
                    color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Average Interactions Per Member",
                    color: isDarkMode ? "white" : "black",
                  },
                  ticks: { color: isDarkMode ? "white" : "black" },
                  grid: { display: false },
                },
              },
              elements: {
                bar: {
                  borderRadius: 10,
                  hoverBackgroundColor: isDarkMode
                    ? `${backgroundColorDark}0.7`
                    : `${backgroundColorLight}0.7`,
                },
              },
            }}
          />
        </div>
      ) : (
        <p style={{ textAlign: "center", color: isDarkMode ? "white" : "black" }}>
          No data available
        </p>
      )}
    </div>
  );
};

export default MemberInteractionsChart;
