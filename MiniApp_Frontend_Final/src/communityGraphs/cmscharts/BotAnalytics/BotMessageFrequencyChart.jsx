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

const BotMessageFrequencyChart = ({
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    // Fetch data from Backend
    const fetchData = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials (cookies, etc.)
          }
        );

        // Parse the JSON response
        const result = await response.json();
        // setData(hardcodeddData)
        setChartData({
          labels: result.map((row) => row.bot_name),
          datasets: [
            {
              data: result.map((row) => row.message_count),
              backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
              borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
              borderWidth: 1,
            },
          ],
        });
        console.log("Data successfully fetched from the backend:");
        console.log(result); // Log the result for debugging
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Uncomment this line to fetch data when needed
    // fetchData();

    // For testing, use hardcoded data
    const labels = [];
    const messagesData = [];
    setChartData({
      labels,
      datasets: [
        {
          data: messagesData,
          backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
          borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
          borderWidth: 1,
        },
      ],
    });
  }, [isDarkMode, backgroundColorLight, backgroundColorDark]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%" }} className="chart-container">
        <Bar
          data={chartData}
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
                    return `Messages: ${tooltipItem.raw}`; // Tooltip showing number of messages
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Bots", // X-axis label
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
                  text: "No of Messages", // Y-axis label
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

export default BotMessageFrequencyChart;
