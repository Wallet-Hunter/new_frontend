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

const SelfPromoterChart = ({
  groupId ,
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/selfpromoter?group_id=${groupId}`
        );
        const result = await response.json();
        
        // Aggregate promo_posts for each sender_name
        const aggregatedData = {};
        result.data.forEach(({ sender_name, promo_posts }) => {
          aggregatedData[sender_name] = (aggregatedData[sender_name] || 0) + promo_posts;
        });
        
        const senderNames = Object.keys(aggregatedData);
        const promoCounts = Object.values(aggregatedData);
        
        setChartData({
          labels: senderNames,
          datasets: [
            {
              label: "Self-Promotional Message Count",
              data: promoCounts,
              backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
              borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [groupId]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

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
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Self-Promotional Messages: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: { display: true, text: "Number of Self-Promotional Messages", color: "white" },
                ticks: { color: "#fff" },
                beginAtZero: true,
                grid: { color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)" },
              },
              y: {
                title: { display: true, text: "Sender's", color: "white" },
                ticks: {  display:false ,color: "#fff" },
                grid: { display: false },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                hoverBackgroundColor: isDarkMode ? `${backgroundColorDark}CC` : `${backgroundColorLight}CC`,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SelfPromoterChart;