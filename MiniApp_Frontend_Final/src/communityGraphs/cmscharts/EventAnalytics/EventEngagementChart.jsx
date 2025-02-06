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

const EventEngagementChart = () => {
  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Function to fetch data from BigQuery (commented out for now)
  const fetchBigQueryData = async () => {
    try {
      const response = await fetch(
        '${process.env.REACT_APP_SERVER_URL}/graphs/event/eventengagementchart?group_id=${group_id}',
        {
          method: "GET",
          //credentials: "include", // Include credentials
        }
      );

      const result = await response.json();
      if(result.error){

      }
      else{
        const eventNames = data.map((row) => row.event_name);
        const messages = data.map((row) => row.messages);
        const reactions = data.map((row) => row.reactions);
        const replies = data.map((row) => row.replies);

        setChartData({
          labels: eventNames,
          datasets: [
            {
              label: "Messages",
              data: messages,
              backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
              borderColor: isDarkMode ? "#225557" : "#54d5d9",
              borderWidth: 1,
            },
            {
              label: "Reactions",
              data: reactions,
              backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
              borderColor: isDarkMode ? "#54d5d9" : "#43aaae",
              borderWidth: 1,
            },
            {
              label: "Replies",
              data: replies,
              backgroundColor: isDarkMode ? "#43aaae" : "#225557",
              borderColor: isDarkMode ? "#43aaae" : "#225557",
              borderWidth: 1,
            },
          ],
        });
      }
      const data = result.rows; // Adjust based on BigQuery API response structure

      // Parse the fetched data


      // Update chartData state

    } catch (error) {
      console.error("Error fetching data from BigQuery:", error);
    }
  };


  useEffect(() => {
    // Detect dark mode preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    // Commented out BigQuery fetch call for testing
    fetchBigQueryData();

    // Hardcoded data for testing
    // const eventNames = ["Event A", "Event B", "Event C", "Event D"];
    // const messages = [200, 150, 300, 250];
    // const reactions = [350, 400, 450, 500];
    // const replies = [100, 120, 90, 150];

    // setChartData({
    //   labels: eventNames,
    //   datasets: [
    //     {
    //       label: "Messages",
    //       data: messages,
    //       backgroundColor: isDarkMode ? "#225557" : "#54d5d9",
    //       borderColor: isDarkMode ? "#225557" : "#54d5d9",
    //       borderWidth: 1,
    //     },
    //     {
    //       label: "Reactions",
    //       data: reactions,
    //       backgroundColor: isDarkMode ? "#54d5d9" : "#43aaae",
    //       borderColor: isDarkMode ? "#54d5d9" : "#43aaae",
    //       borderWidth: 1,
    //     },
    //     {
    //       label: "Replies",
    //       data: replies,
    //       backgroundColor: isDarkMode ? "#43aaae" : "#225557",
    //       borderColor: isDarkMode ? "#43aaae" : "#225557",
    //       borderWidth: 1,
    //     },
    //   ],
    // });

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  if (!chartData) {
    return <div>Loading chart data...</div>;
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
                display:false,
                //position: "top",
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
                stacked: true, // Enable stacking
                title: {
                  display: true,
                  text: "Events",
                  color:"white"
                },
                ticks:{
                  color:"white"
                },
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                stacked: true, // Enable stacking
                title: {
                  display: true,
                  text: "Average Engagement",
                  color:"white"
                },
                ticks:{
                  color:"white"
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode
                    ? "rgba(220, 220, 220, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
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

export default EventEngagementChart;
