import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentDoughnutChart = ({
  groupId,
  backgroundColorLight = ["#54d5d9", "#112b2b", "#328082"],
  backgroundColorDark = ["#54d5d9", "#112b2b", "#328082"],
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sentimentData, setSentimentData] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/sentimentinanonymousmessages?group_id=${groupId}`,
        {
          method: "GET",
          //credentials: "include", // Uncomment if needed
        }
      );

      // Parse the JSON response
      const result = await response.json();

      // Update sentimentData state with API response
      setSentimentData({
        positive: result.positive_sentiment || 0,
        neutral: result.neutral_sentiment || 0,
        negative: result.negative_sentiment || 0,
      });

      console.log("Data successfully fetched from the backend:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch sentiment data from the backend

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [groupId]);

  // Data for the Doughnut chart
  const chartData = {
    labels: ["Positive", "Neutral", "Negative"], // Sentiment categories
    datasets: [
      {
        data: [sentimentData.positive, sentimentData.neutral, sentimentData.negative],
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%" }} className="chart-container">
        <Doughnut
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
                display: false, // Hide legend
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                  },
                },
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

export default SentimentDoughnutChart;
