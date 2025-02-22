import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MessageTypeChart = ({ title, groupId }) => {
  const [theme, setTheme] = useState("light");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [data, setData] = useState({ labels: [], values: [] });

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/message/messageTypes?group_id=${groupId}`,
        { method: "GET" }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      // Convert the API response into labels and values
      if (Array.isArray(result) && result.length > 0) {
        const firstItem = result[0]; // Since API returns an array, use the first object
  
        const labels = Object.keys(firstItem).map(key =>
          key.replace("_count", "").toUpperCase() // Format labels nicely
        );
  
        const values = Object.values(firstItem);
  
        setData({ labels, values });
      } else {
        setData({ labels: [], values: [] }); // Handle empty response
      }
  
      console.log("Data successfully fetched and transformed:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  

  useEffect(() => {
    fetchData();

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);
    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [groupId]);

  const totalValue = data.values.reduce((acc, value) => acc + value, 0);

  const themeColors = [
    "#45e8ed", "#69edf1", "#8df2f5", "#b0f7f8", "#d4fbfc", "#54d5d9", "#3fb3b5", "#2c9393",
    "#2db7ba", "#229ca1", "#1c8084", "#176364", "#11494c", "#0d3738", "#091f21", "#0b4a4c"
  ];

  const getColor = (value, max) => {
    const ratio = max > 0 ? value / max : 0;
    const index = Math.min(Math.floor(ratio * (themeColors.length - 1)), themeColors.length - 1);
    return themeColors[index];
  };

  const lightenColor = (color, amount) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
    const b = Math.min(255, (num & 0x0000FF) + amount);
    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const maxValue = Math.max(...data.values, 1); // Prevent division by zero
  const baseColors = data.values.map(value => getColor(value, maxValue));
  const hoverColors = baseColors.map(color => lightenColor(color, 30));

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: selectedIndex === null
          ? baseColors
          : baseColors.map((color, i) => (i === selectedIndex ? color : "rgba(0, 0, 0, 0.1)")),
        hoverBackgroundColor: hoverColors,
        borderColor: baseColors.map(color => `${color}AA`),
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Hollow center
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
            const value = data.values[context.dataIndex];
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
      <div style={{ position: "relative", width: "100%", height: "90%" }}>
        <Doughnut data={chartData} options={options} />
        <div style={detailsStyle}>
          {selectedIndex !== null ? (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>
                {data.labels[selectedIndex]}
              </div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${data.values[selectedIndex].toLocaleString()} (${((data.values[selectedIndex] / totalValue) * 100).toFixed(2)}%)`}
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

export default MessageTypeChart;
