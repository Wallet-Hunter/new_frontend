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

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ReactionsAnalysisChart = ({ groupId }) => {
  const backgroundColorDark = "rgba(67, 229, 244, 1)";
  const backgroundColorLight = "rgba(75, 192, 192, 1)";
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  // Fetch data logic
 const fetchData = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/reactionsanalysis?group_id=${groupId}`, 
      { method: "GET" }
    );

    const result = await response.json();
    
    // Convert the response object into labels and data arrays
    const reactionsData = Object.keys(result);  // ["replies", "views", "forwards"]
    const countsData = Object.values(result);  // [0, 0, 0]

    setChartData({
      labels: reactionsData,
      datasets: [
        {
          data: countsData,
          backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
          borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
          borderWidth: 1,
        },
      ],
    });

    console.log("Data successfully fetched from the backend:", result);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};


  useEffect(() => {
    fetchData();

    // Detect system theme
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [isDarkMode]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            hover: {
              animationDuration: 500,
              mode: "nearest",
              intersect: true,
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Reactions: ${tooltipItem.raw}`;
                  },
                },
              },
              title: {
                display: true,
                font: {
                  size: 18,
                  weight: "bold",
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Count of Reactions",
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
                  text: "Reaction Types",
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
                hoverBackgroundColor: isDarkMode
                  ? `${backgroundColorDark}0.7`
                  : `${backgroundColorLight}0.7`,
              },
            },
          }}
        />
      </div>

      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        .chartjs-render-monitor:hover {
          transition: transform 0.3s ease;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ReactionsAnalysisChart;
