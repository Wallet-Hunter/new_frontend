import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EventTypeBreakdownChart = ({ title, groupId }) => {
  const [theme, setTheme] = useState("light");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [eventData, setEventData] = useState({ labels: [], values: [] });

  const fetchBigQueryData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/event/eventtypebreakdownchart?group_id=${groupId}`
      );
      const result = await response.json();

      if (!result || !result.rows || !Array.isArray(result.rows) || result.rows.length === 0) {
        console.warn("No event data received.");
        setEventData({ labels: ["No Data"], values: [0] }); // Fallback to prevent crashes
        return;
      }

      const labels = result.rows.map((row) => row.event_type || "Unknown");
      const values = result.rows.map((row) => row.participation_count || 0);

      setEventData({ labels, values });
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setEventData({ labels: ["Error"], values: [0] });
    }
  };

  const totalValue = eventData.values.reduce((acc, value) => acc + value, 0) || 0;

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    fetchBigQueryData();

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [groupId]);

  const themeColors = ["#45e8ed", "#2db7ba", "#43aaae", "#29c7c3"];

  const getColor = (index) => themeColors[index % themeColors.length];

  const lightenColor = (color, amount) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
    const b = Math.min(255, (num & 0x0000FF) + amount);
    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const baseColors = eventData.labels.map((_, i) => getColor(i));
  const hoverColors = baseColors.map((color) => lightenColor(color, 30));

  const chartData = {
    labels: eventData.labels,
    datasets: [
      {
        data: eventData.values,
        backgroundColor: selectedIndex === null
          ? baseColors
          : baseColors.map((color, i) => (i === selectedIndex ? color : "rgba(0, 0, 0, 0.1)")),
        hoverBackgroundColor: hoverColors,
        borderColor: baseColors.map((color) => `${color}AA`),
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "#333" : "#FFF",
        titleColor: theme === "dark" ? "#FFF" : "#000",
        bodyColor: theme === "dark" ? "#FFF" : "#000",
        borderColor: theme === "dark" ? "#555" : "#CCC",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const value = eventData.values[context.dataIndex] || 0;
            return `${context.label}: ${value.toLocaleString()} (${((value / totalValue) * 100).toFixed(2)}%)`;
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
      {title && <h2 style={titleStyle}>{title}</h2>}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Doughnut data={chartData} options={options} />
        <div style={detailsStyle}>
          {selectedIndex !== null ? (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>
                {eventData.labels[selectedIndex]}
              </div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${eventData.values[selectedIndex].toLocaleString()} (${((eventData.values[selectedIndex] / totalValue) * 100).toFixed(2)}%)`}
              </div>
            </>
          ) : (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>Total</div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${totalValue.toLocaleString()}`}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
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

export default EventTypeBreakdownChart;
