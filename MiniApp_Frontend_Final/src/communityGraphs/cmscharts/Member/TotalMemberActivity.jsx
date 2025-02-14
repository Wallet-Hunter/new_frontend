import React, { useEffect, useState } from 'react';
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

const TotalMemberActivity = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);
  

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/totalmemberactivity?group_id=${groupId}`
        );
        const data = await response.json();

        if (!data.member_activity) {
          throw new Error("Invalid API response");
        }

        const memberNames = data.member_activity.map(member => member.member_name);
        const totalActions = data.member_activity.map(member => member.total_actions);

        setChartData({
          labels: memberNames,
          datasets: [
            {
              label: "Total Actions",
              data: totalActions,
              backgroundColor: isDarkMode ? "#54d5d9" : "#225557",
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchChartData();
  }, [groupId, isDarkMode]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    matchMedia.addEventListener("change", (e) => setIsDarkMode(e.matches));
    return () => matchMedia.removeEventListener("change", (e) => setIsDarkMode(e.matches));
  }, []);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: "easeOutQuart" },
            plugins: {
              legend: { display: false, position: "top" },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: { display: true, text: "Members", color: "white" },
                ticks: { display:false,
                  color: "white" },
                grid: { color: isDarkMode ? "rgba(220,220,220,0.1)" : "rgba(0,0,0,0.1)" },
              },
              y: {
                title: { display: true, text: "Total Actions", color: "white" },
                ticks: { color: "white" },
                beginAtZero: true,
                grid: { color: isDarkMode ? "rgba(220,220,220,0.1)" : "rgba(0,0,0,0.1)" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TotalMemberActivity;
