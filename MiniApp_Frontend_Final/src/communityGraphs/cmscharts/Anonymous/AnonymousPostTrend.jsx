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

const AnonymousPostTrends = ({groupId}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Dark Mode Detection
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
  
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/anonymousposttrends?group_id=${groupId}`, {
          method: "GET",
        });
        const result = await response.json();
        console.log("Fetched Data: ", result);  // Log to see the backend response
  
        const dates = result.map((item) => item.date.value);
        const postCounts = result.map((item) => item.anonymous_post_count);
  
        console.log("Chart Data: ", { labels: dates, datasets: postCounts });  // Log the chart data
  
        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Number of Anonymous Posts",
              data: postCounts,
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
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    fetchData();
  
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [isDarkMode, groupId]);  // Make sure `groupId` is included as a dependency
  

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
                display: false, // Display legend for context
                labels: {
                  color: isDarkMode ? "white" : "black",
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Posts: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date ", // X-axis title
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Anonymous Posts", // Y-axis title
                  color: isDarkMode ? "white" : "black",
                },
                ticks: {
                  color: isDarkMode ? "white" : "black",
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
                  ? "rgba(67, 229, 244, 1)"
                  : "rgba(75, 192, 192, 1)",
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

export default AnonymousPostTrends;
