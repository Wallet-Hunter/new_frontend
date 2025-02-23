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

const GroupRoleMisuseChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [memberIds, setMemberIds] = useState([]);
  const [misuseActivities, setMisuseActivities] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/members/grouprolemisuse?group_id=${groupId}`
        );
        const result = await response.json();

        if (result.role_misuse) {
          const ids = result.role_misuse.map((item) => item.sender_id);
          const misuseCounts = result.role_misuse.map((item) => item.role_misuse);
          setMemberIds(ids);
          setMisuseActivities(misuseCounts);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (groupId) {
      fetchData();
    }
  }, [groupId]);

  const chartData = {
    labels: memberIds,
    datasets: [
      {
        label: "Misuse Activities",
        data: misuseActivities,
        backgroundColor: isDarkMode ? "rgba(67, 229, 244, 1)" : "rgba(75, 192, 192, 1)",
        borderColor: isDarkMode ? "rgba(67, 229, 244, 1)" : "rgba(75, 192, 192, 1)",
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
                  label: (tooltipItem) => {
                    return `Misuse Activities: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member ID",
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
                  text: "Number of Misuse Activities",
                  color: "white",
                },
                ticks: {
                  color: "white",
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

export default GroupRoleMisuseChart;
