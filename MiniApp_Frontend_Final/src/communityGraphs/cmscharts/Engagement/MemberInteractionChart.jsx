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
  const [error, setError] = useState(null);

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
          `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/membersinteractions?group_id=${groupId}`
        );
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log("API Response:", result); // Debugging log
    
        if (Array.isArray(result) && result.length > 0) {
          const formattedData = result.map((entry) => ({
            date: entry.date,
            avgReplies: entry.avgReplies ?? 0,
            avgMentions: entry.avgMentions ?? 0,
            avgForwards: entry.avgForwards ?? 0,
            averageInteractions: entry.averageInteractions ?? 0,
          }));
    
          setChartLabels(formattedData.map((item) => item.date));
          setChartData(formattedData.map((item) => item.averageInteractions));
        } else {
          setChartLabels([]);
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(0);
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
      {error ? (
        <p style={{ textAlign: "center", color: isDarkMode ? "white" : "black" }}>{error}</p>
      ) : chartLabels.length > 0 ? (
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
                    ? "rgba(67, 229, 244, 0.7)"
                    : "rgba(75, 192, 192, 0.7)",
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
