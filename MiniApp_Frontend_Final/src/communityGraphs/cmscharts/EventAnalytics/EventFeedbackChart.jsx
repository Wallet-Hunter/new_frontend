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

const EventFeedback = () => {
  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Placeholder for fetching data from BigQuery
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/event/eventfeedback?group_id=1471430787',
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );
        const data = await response.json();
        // Process and set data accordingly
        const processedData = {
          labels: data.feedbackKeywords, // Feedback keywords on the X-axis
          datasets: [
            {
              label: "Positive Feedback",
              data: data.positiveFeedback,
              backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
            },
            {
              label: "Negative Feedback",
              data: data.negativeFeedback,
              backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
            },
            {
              label: "Neutral Feedback",
              data: data.neutralFeedback,
              backgroundColor: isDarkMode ? "#43aaae" : "#225557",
            },
          ],
        };
        setChartData(processedData.length ? processedData : []);
      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
      }
    };

    // Uncomment the next line to fetch data
    fetchChartData();

    // Hardcoded data for testing (useful for when the fetch logic is commented out)
    const feedbackKeywords = ["Excellent", "Good", "Average", "Bad", "Poor"];
    const positiveFeedback = [50, 30, 20, 10, 5];
    const negativeFeedback = [5, 10, 20, 50, 60];
    const neutralFeedback = [30, 40, 35, 25, 20];

    setChartData({
      labels: feedbackKeywords,
      datasets: [
        {
          label: "Positive Feedback",
          data: positiveFeedback,
          backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
        },
        {
          label: "Negative Feedback",
          data: negativeFeedback,
          backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
        },
        {
          label: "Neutral Feedback",
          data: neutralFeedback,
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
                display: false, // Hide the legend
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
                  text: "Feedback Keywords",
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
                  text: "Count of Feedback",
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

export default EventFeedback;
