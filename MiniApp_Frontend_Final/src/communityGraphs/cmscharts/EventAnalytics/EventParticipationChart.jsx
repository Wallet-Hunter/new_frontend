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

const EventParticipationChart = ({
  groupId,
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDataPoints, setChartDataPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/event/eventparticipationchart?group_id=${groupId}`
        );
        const result = await response.json();
        
        if (result.data) {
          const fetchedLabels = result.data.map((row) => row.eventName);
          const fetchedData = result.data.map((row) => row.participantCount);
          setChartLabels(fetchedLabels);
          setChartDataPoints(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
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

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartDataPoints,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

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
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `Participants: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: { display: true, text: "Events" },
                grid: { display: false },
              },
              y: {
                title: { display: true, text: "Number of Participants" },
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
                hoverBackgroundColor: isDarkMode ? `${backgroundColorDark}0.7` : `${backgroundColorLight}0.7`,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EventParticipationChart;
