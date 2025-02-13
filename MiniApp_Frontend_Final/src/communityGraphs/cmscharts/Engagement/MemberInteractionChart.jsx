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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartLabels, setChartLabels] = useState([
    "avgReplies",
    "avgMentions",
    "avgForwards",
    "averageInteractions",
  ]);
  const [chartData, setChartData] = useState([0, 0, 0, 0]); // Default zero values
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    const fetchData = async () => {
      if (!groupId) {
        setError("Group ID is missing");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/memberinteractions?group_id=${groupId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result); // Debugging log

        // Find data for the specific date (2025-02-06)
        const filteredData = result.find((entry) => entry.date === "2025-02-06");

        if (filteredData) {
          setChartData([
            filteredData.avgReplies ?? 0,
            filteredData.avgMentions ?? 0,
            filteredData.avgForwards ?? 0,
            filteredData.averageInteractions ?? 0,
          ]);
        } else {
          setChartData([0, 0, 0, 0]); // If no data, ensure all zeroes
        }

        setIsDataFetched(true); // Always mark data as fetched
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Failed to load data.");
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
        backgroundColor: isDarkMode ? "rgba(67, 229, 244, 1)" : "rgba(75, 192, 192, 1)",
        borderColor: isDarkMode ? "rgba(67, 229, 244, 1)" : "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {error ? (
        <p style={{ textAlign: "center", color: isDarkMode ? "white" : "black" }}>{error}</p>
      ) : isDataFetched ? (
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
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Interactions Count",
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
                    text: "Interaction Type",
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
                    ? "rgba(67, 229, 244, 0.7)"
                    : "rgba(75, 192, 192, 0.7)",
                },
              },
            }}
          />
        </div>
      ) : (
        <p style={{ textAlign: "center", color: isDarkMode ? "white" : "black" }}>
          Loading data...
        </p>
      )}
    </div>
  );
};

export default MemberInteractionsChart;
