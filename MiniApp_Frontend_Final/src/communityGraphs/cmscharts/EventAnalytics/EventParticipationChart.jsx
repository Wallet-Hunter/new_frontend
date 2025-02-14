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
  labels = [], // Labels representing event names or IDs
  data = [],   // Data representing the number of participants for each event
  isDashboard = false,
  backgroundColorLight = "rgba(75, 192, 192, 1)", // Light theme bar color
  backgroundColorDark = "rgba(67, 229, 244, 1)"   // Dark theme bar color
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDataPoints, setChartDataPoints] = useState([]);

  // Simulated fetching logic (replace with BigQuery API integration)
  useEffect(() => {
    const fetchData = async () => {
      // Uncomment and replace with your BigQuery API fetching logic

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/event/eventparticipationchart?group_id=${groupId}`,
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );
        const result = await response.json();
        if(result.error){

        }
        else{
          const fetchedLabels = result.data.map((row) => row.eventName); // Adjust field names based on BigQuery schema
          const fetchedData = result.data.map((row) => row.participantCount); // Adjust field names
          setChartLabels(fetchedLabels);
          setChartDataPoints(fetchedData);
        }

      } catch (error) {
        console.error("Error fetching data from BigQuery:", error);
      }


      // Hardcoded data for testing
      const hardcodedLabels = ["Event A", "Event B", "Event C", "Event D"];
      const hardcodedData = [120, 150, 90, 200];
      //setChartLabels(hardcodedLabels);
      //setChartDataPoints(hardcodedData);
    };

    fetchData();
  }, [groupId]);

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

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [groupId]);

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
                display: false, // Hide legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Participants: ${tooltipItem.raw}`; // Tooltip showing number of participants
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Events", // X-axis label
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Participants", // Y-axis label
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

export default EventParticipationChart;
