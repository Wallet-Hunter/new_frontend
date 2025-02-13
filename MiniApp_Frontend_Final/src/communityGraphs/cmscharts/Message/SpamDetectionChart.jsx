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

const SpamDetectionChart = ({
  groupId,
  spamCategories = [], // Spam categories (e.g., repetition, irrelevant content)
  spamCounts = [], // Count of spam messages for each category
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState({
    categories: spamCategories,
    counts: spamCounts,
  });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/message/spamDetection?group_id=${groupId}`,
        {
          method: "GET",
        }
      );
  
      // Parse the JSON response
      const result = await response.json();
  
      // Convert response into the required format
      const formattedData = {
        categories: ["Spam", "Non-Spam"],  // Labels
        counts: [result.total_spam_count, result.total_non_spam_count], // Values
      };
  
      // Set the data state with formatted values
      setData(formattedData);
  
      console.log("Data successfully fetched and formatted:", formattedData); // Debugging log
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  

  // Hardcoded data for testing (commented out)
  // const hardcodedData = {
  //   categories: ["Repetition", "Content", "Profanity", "Other"], // Spam categories
  //   counts: [120, 80, 55, 35], // Count of spam messages for each category
  // };

  useEffect(() => {
    fetchData(); // Call fetchData to fetch data from the backend

    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [groupId]);

  // Chart data configuration
  const chartData = {
    labels: data.categories, // ["Spam", "Non-Spam"]
    datasets: [
      {
        label: "Message Count",
        data: data.counts, // [spam count, non-spam count]
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };
  

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            indexAxis: "y", // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Spam Count: ${tooltipItem.raw}`; // Tooltip shows spam count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Count of Spam Messages", // X-axis title
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
              y: {
                title: {
                  display: true,
                  text: "Spam Categories", // Y-axis title
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  display: false,
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
                  ? `${backgroundColorDark}CC`
                  : `${backgroundColorLight}CC`,
              },
            },
          }}
        />
      </div>
      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05); /* Scale the chart on hover */
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default SpamDetectionChart;
