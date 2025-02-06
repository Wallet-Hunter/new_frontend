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

const MessageQualityChart = ({
  memberIDs = [], // Member IDs as X-axis labels
  qualityScores = [], // Quality scores for each member
  backgroundColorLight = "rgba(54, 162, 235, 1)",
  backgroundColorDark = "rgba(30, 144, 255, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Hardcoded data for testing
  const hardcodedMemberIDs = ["M001", "M002", "M003", "M004", "M005"];
  const hardcodedQualityScores = [80, 90, 70, 85, 95];

  const [chartData, setChartData] = useState({
    labels: hardcodedMemberIDs, // Default to hardcoded member IDs
    datasets: [
      {
        label: "Quality Score", // Dataset label
        data: hardcodedQualityScores, // Default to hardcoded quality scores
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from BigQuery (currently commented for testing)
  // const fetchDataFromBigQuery = async () => {
  //   try {
  //     const response = await fetch("YOUR_BIGQUERY_API_URL");
  //     const data = await response.json();
  //     // Assuming the response has fields: memberIDs and qualityScores
  //     setChartData({
  //       labels: data.memberIDs, // Update with fetched member IDs
  //       datasets: [
  //         {
  //           label: "Quality Score",
  //           data: data.qualityScores, // Update with fetched quality scores
  //           backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
  //           borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
  //           borderWidth: 1,
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Uncomment this line once BigQuery data fetching logic is ready
    // fetchDataFromBigQuery();

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "black", // Set background color to black
      }}
    >
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
              legend: {
                display: false, // Disable legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Quality Score: ${tooltipItem.raw}`; // Tooltip shows quality score
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Member ID", // X-axis title
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Quality Score", // Y-axis title
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

export default MessageQualityChart;
