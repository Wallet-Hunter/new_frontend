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

const OverPostingChart = ({
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
  groupId,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({ senderNames: [], postCounts: [] });

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);
    

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/overposting?group_id=${groupId}`
        );
        const result = await response.json();

        if (result.over_posting) {
          const senderNames = result.over_posting.map((entry) => entry.sender_name);
          const postCounts = result.over_posting.map((entry) => entry.post_frequency);
          setData({ senderNames, postCounts });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [groupId]);

  const chartData = {
    labels: data.senderNames,
    datasets: [
      {
        label: "Total Posts",
        data: data.postCounts,
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
                  label: (tooltipItem) => `Posts: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Sender Name",
                  color: "white",
                },
                ticks: {
                  display: false,
                  color: "#fff",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Total Posts",
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
    </div>
  );
};

export default OverPostingChart;
