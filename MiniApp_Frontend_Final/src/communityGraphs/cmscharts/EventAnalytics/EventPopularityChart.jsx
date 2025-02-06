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

const EventPopularityChart = () => {
  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Placeholder for fetching data from BigQuery

    const fetchChartData = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/event/eventpopularitychart?group_id=${group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );
        const data = await response.json();
        if(data.error){
        }
        else{
          const processedData = {
          labels: data.eventNames, // Event names on the Y-axis
          datasets: [
            {
              label: "Interaction Count",
              data: data.interactionCounts,
              backgroundColor: isDarkMode ? "rgba(67, 229, 244, 1)" : "rgba(75, 192, 192, 1)",
            },
          ],
          };
          setChartData(processedData);
        }
      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
      }
    };


    fetchChartData();


    // Hardcoded data for testing
  //   const eventNames = ["Event A", "Event B", "Event C", "Event D"];
  //   const interactionCounts = [150, 200, 250, 300];

  //   setChartData({
  //     labels: eventNames,
  //     datasets: [
  //       {
  //         label: "Interaction Count",
  //         data: interactionCounts,
  //         backgroundColor: isDarkMode ? "rgba(67, 229, 244, 1)" : "rgba(75, 192, 192, 1)",
  //       },
  //     ],
  //   });
  // }, [isDarkMode]);
  }, [])

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
            indexAxis: 'y', // Horizontal bar chart
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
                title: {
                  display: true,
                  text: "Interaction Count",
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
                title: {
                  display: true,
                  text: "Event Names",
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
            },
            elements: {
              bar: {
                borderRadius: 10,
                hoverBackgroundColor: isDarkMode
                  ? "rgba(67, 229, 244, 0.7)"
                  : "rgba(75, 192, 192, 0.7)",
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

export default EventPopularityChart;
