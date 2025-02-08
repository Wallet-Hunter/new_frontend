import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ActivePassiveMembersChart = ({ groupId }) => {
  const [theme, setTheme] = useState("light"); // State for theme preference
  const [selectedIndex, setSelectedIndex] = useState(null); // State for selected section in chart
  const [data, setData] = useState({
    labels: ["Active Members", "Passive Members"],
    values: [0, 0], // Default values set to 0 to handle null cases
  });

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/activevspassivemembers?group_id=${groupId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle cases where data is missing or null
      setData({
        labels: ["Active Members", "Passive Members"],
        values: [result.activePercentage || 0, result.passivePercentage || 0],
      });
      
      console.log("Data successfully fetched from the backend:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [groupId]);

  // Calculate total participation
  const totalValue = data.values.reduce((acc, value) => acc + value, 0);

  // Handle theme changes dynamically
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);
    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const themeColors = ["#225557", "#54D5D9"]; // Colors for active and passive members

  // Function to lighten colors for hover effect
  const lightenColor = (color, amount) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
    const b = Math.min(255, (num & 0x0000ff) + amount);
    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const hoverColors = themeColors.map((color) => lightenColor(color, 30));

  // Chart data configuration
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: selectedIndex === null
          ? themeColors
          : themeColors.map((color, i) =>
              i === selectedIndex ? color : "rgba(0, 0, 0, 0.1)"
            ),
        hoverBackgroundColor: hoverColors,
        borderColor: themeColors.map((color) => `${color}AA`),
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Creates hollow center for doughnut chart
    plugins: {
      legend: {
        display: false, // Hide legend for a cleaner UI
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#333" : "#FFF",
        titleColor: theme === "dark" ? "#FFF" : "#000",
        bodyColor: theme === "dark" ? "#FFF" : "#000",
        borderColor: theme === "dark" ? "#555" : "#CCC",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const value = data.values[context.dataIndex] || 0;
            return `${context.label}: ${value}%`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedIndex(selectedIndex === index ? null : index);
      } else {
        setSelectedIndex(null);
      }
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  return (
    <div style={chartContainerStyle}>
      <div style={{ position: "relative", width: "100%", height: "80%" }}>
        <Doughnut data={chartData} options={options} />
        <div style={detailsStyle}>
          {selectedIndex !== null ? (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>
                {data.labels[selectedIndex]}
              </div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${data.values[selectedIndex] || 0}%`}
              </div>
            </>
          ) : (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>Total</div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${totalValue || 0}%`}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles for the chart container and tooltip
const chartContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
};

const detailsStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  zIndex: 10,
  pointerEvents: "none",
};

const titleStyle = {
  fontSize: "12px",
  fontWeight: "500",
  textAlign: "center",
};

const valueStyle = {
  fontSize: "18px",
  fontWeight: "500",
};

export default ActivePassiveMembersChart;