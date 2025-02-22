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

const RepetitiveReactionsChart = ({ groupId  }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/repetitivereactions?group_id=${groupId}`
        );
        const result = await response.json();

        if (result.repetitive_reactions) {
          // Aggregate repeated reactions per sender_id
          const reactionsMap = new Map();

          result.repetitive_reactions.forEach(({ sender_id, sender_name, repeated_reactions }) => {
            if (reactionsMap.has(sender_id)) {
              reactionsMap.get(sender_id).repeated_reactions += repeated_reactions;
            } else {
              reactionsMap.set(sender_id, { sender_name, repeated_reactions });
            }
          });

          // Convert Map to array and sort by highest reactions
          const sortedData = Array.from(reactionsMap.values()).sort(
            (a, b) => b.repeated_reactions - a.repeated_reactions
          );

          const labels = sortedData.map((item) => item.sender_name);
          const data = sortedData.map((item) => item.repeated_reactions);

          setChartData({
            labels,
            datasets: [
              {
                label: "Number of Reactions",
                data,
                backgroundColor: isDarkMode
                  ? "rgba(67, 229, 244, 1)"
                  : "rgba(75, 192, 192, 1)",
                borderColor: isDarkMode
                  ? "rgba(67, 229, 244, 1)"
                  : "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [groupId]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000, easing: "easeOutQuart" },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Reactions: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: { display: true, text: "Members", color: "white" },
                ticks: { display : false ,color: "#fff" },
                grid: { display: false },
              },
              y: {
                title: { display: true, text: "Number of Reactions", color: "white" },
                ticks: { color: "#fff" },
                beginAtZero: true,
                grid: { color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)" },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                hoverBackgroundColor: isDarkMode
                  ? "rgba(67, 229, 244, 0.8)"
                  : "rgba(75, 192, 192, 0.8)",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RepetitiveReactionsChart;
