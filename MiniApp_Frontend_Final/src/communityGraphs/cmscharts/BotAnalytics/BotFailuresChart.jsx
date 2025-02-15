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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const BotFailuresChart = ({
  labels = [], // Labels representing time intervals (e.g., days, weeks, months)
  failuresData = [], // Data representing the number of failures or issues
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        data: failuresData,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}', {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Parse the JSON response
      const result = await response.json();
      //setData(hardcodeddData)
      setData(result);
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Placeholder for testing, fetchData is commented out for now
  useEffect(() => {
    // fetchData(); // Uncomment to fetch data from the backend when ready

    // Simulated data fetch for testing purposes
    const fetchDataForTesting = async () => {
      const result = {
        labels:[],
        failuresData: [], // Simulated failure data
      };
      setData({
        labels: result.labels,
        datasets: [
          {
            data: result.failuresData,
            backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
            borderWidth: 1,
          },
        ],
      });
    };

    fetchDataForTesting();

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
      <div style={{ width: "100%", height: "100%" }} className="chart-container">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
                display: false, // Legend hidden
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Failures: ${tooltipItem.raw}`; // Tooltip showing number of failures
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time", // X-axis label
                  color:"white"
                },
                ticks:{
                  color:"white"
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Failures or Issues", // Y-axis label
                  color:"white"
                },
                ticks:{
                  color:"white"
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
                  ? `${backgroundColorDark}0.7`
                  : `${backgroundColorLight}0.7`,
              },
            },
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

export default BotFailuresChart;
