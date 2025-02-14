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

const SpamBehaviorChart = ({
  groupId,
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({ senderNames: [], spamCounts: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/spamlikebehavior?group_id=${groupId}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        
        // Transform backend response into chart format
        const senderNames = result.spam_like_behavior.map((entry) => entry.sender_name);
        const spamCounts = result.spam_like_behavior.map((entry) => entry.spam_actions);

        setData({ senderNames, spamCounts });
        console.log("Fetched data:", result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [groupId]);

  const chartData = {
    labels: data.senderNames,
    datasets: [
      {
        label: "Spam Message Count",
        data: data.spamCounts,
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
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Spam Messages: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "No of Spam Messages",
                  color: "white",
                },
                ticks: {
                  color: "#fff",
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sender Name",
                  color: "white",
                },
                ticks: {
                  display:false,
                  color: "#fff",
                },
                grid: {
                  display: false,
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
                hoverBackgroundColor: isDarkMode ? `${backgroundColorDark}CC` : `${backgroundColorLight}CC`,
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
      `}</style>
    </div>
  );
};

export default SpamBehaviorChart;
