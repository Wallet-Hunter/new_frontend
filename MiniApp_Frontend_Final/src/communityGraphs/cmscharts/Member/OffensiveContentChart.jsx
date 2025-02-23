import React, { useEffect, useState } from "react";
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

const OffensiveContentChart = ({
  groupId,
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({ memberNames: [], offensiveCounts: [] });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/member/offensivecontentrepeaters?group_id=${groupId}`
      );
      const result = await response.json();
      
      if (result.offensive_content_repeaters) {
        const memberNames = result.offensive_content_repeaters.map((item) => item.sender_name);
        const offensiveCounts = result.offensive_content_repeaters.map((item) => item.offensive_posts);
        setData({ memberNames, offensiveCounts });
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);
    
    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [groupId]);

  // Chart data configuration
  const chartData = {
    labels: data.memberNames,
    datasets: [
      {
        label: "Offensive Posts",
        data: data.offensiveCounts,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: "#171717" }}>
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
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Offensive Posts: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: { display: true, text: "Member Name", color: "white" },
                ticks: { color: "#fff" },
                grid: { display: false },
              },
              y: {
                title: { display: true, text: "Offensive Posts", color: "white" },
                ticks: { color: "#fff" },
                beginAtZero: true,
                grid: { color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)" },
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

export default OffensiveContentChart;
