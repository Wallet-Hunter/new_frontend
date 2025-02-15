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

const PollTicketChart = ({ groupId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/member/overactivepollticket?group_id=${groupId}`
      );
      const result = await response.json();
      
      // Extract labels (sender names) and data (poll/ticket creation count)
      const labels = result.poll_ticket_creation.map((item) => item.sender_name);
      const data = result.poll_ticket_creation.map((item) => item.poll_ticket_creation);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Polls/Tickets Created",
            data,
            backgroundColor: "rgba(67, 229, 244, 1)",
            borderColor: "rgba(67, 229, 244, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    // Detect dark mode
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);
    
    // Fetch data from backend
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
            animation: {
              duration: 1200,
              easing: "easeOutBounce",
            },
            plugins: {
              legend: {
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Polls/Tickets: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member Names", // X-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // X-axis tick color
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Polls/Tickets", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "#fff", // Y-axis tick color
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
                hoverBackgroundColor: "rgba(67, 229, 244, 1)",
              },
            },
          }}
        />
      </div>
      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05); /* Scale on hover */
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PollTicketChart;
