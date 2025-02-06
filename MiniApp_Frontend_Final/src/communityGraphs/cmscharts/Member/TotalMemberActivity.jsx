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

const TotalMemberActivity = () => {
  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Placeholder for fetching data from API
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/event/eventcontentperformance?group_id=${group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );
        const data = await response.json();
        // Process and set data accordingly
        const processedData = {
          labels: data.memberIDs, // Member IDs on the X-axis
          datasets: [
            {
              label: "Messages",
              data: data.messages, // Total messages for each member
              backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
            },
            {
              label: "Reactions",
              data: data.reactions, // Total reactions for each member
              backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
            },
            {
              label: "Posts",
              data: data.posts, // Total posts for each member
              backgroundColor: isDarkMode ? "#43aaae" : "#225557",
            },
          ],
        };
        setChartData(processedData.length ? processedData : []);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    // Uncomment the next line to fetch data
    fetchChartData();

    // Hardcoded data for testing (Replace with actual data from API)
    const memberIDs = ["Member1", "Member2", "Member3"];
    const messages = [200, 150, 300];
    const reactions = [100, 120, 150];
    const posts = [50, 75, 100];

    setChartData({
      labels: memberIDs,
      datasets: [
        {
          label: "Messages",
          data: messages,
          backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
        },
        {
          label: "Reactions",
          data: reactions,
          backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
        },
        {
          label: "Posts",
          data: posts,
          backgroundColor: isDarkMode ? "#43aaae" : "#225557",
        },
      ],
    });
  }, [isDarkMode]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

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
                display: true,
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: "Member IDs",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: "Total Actions",
                  color: "white",
                },
                ticks: {
                  color: "white",
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
                hoverBackgroundColor: isDarkMode
                  ? "#43aaaeCC"
                  : "#54d5d9CC",
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

export default TotalMemberActivity;
