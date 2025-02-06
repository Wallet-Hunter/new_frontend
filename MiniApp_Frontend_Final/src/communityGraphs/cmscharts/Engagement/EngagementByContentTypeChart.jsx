import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EngagementChart = ({ groupId }) => {
  const [theme, setTheme] = useState("light");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [engagementData, setEngagementData] = useState(null);

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/engagement/contentengagement?group_id=${groupId}`, {
        method: "GET",
        // headers: {
        //   "ngrok-skip-browser-warning": "true"
        // }
      });

      // Parse the JSON response
      const result = await response.json();
      setEngagementData(result);  // Set the fetched data
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // For now, we are using hardcoded data for testing
  useEffect(() => {
    fetchData(); // Fetch data from the backend when the component mounts

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

  // If engagementData is still null, return a loading message
  if (!engagementData) {
    return <div>Loading data...</div>;
  }

  // Total engagement count (used for percentage calculation)
  const totalValue = (engagementData?.values ?? []).reduce((acc, value) => acc + value, 0);


  // Engagement color mapping
  const themeColors = ["#54d5d9", "#112b2b", "#328082"]; // Text (green), Images (blue), Polls (orange)

  const lightenColor = (color, amount) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
    const b = Math.min(255, (num & 0x0000ff) + amount);
    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const hoverColors = themeColors.map((color) => lightenColor(color, 30));

  const chartData = {
    labels: engagementData.labels, // Assuming the response contains labels
    datasets: [
      {
        data: engagementData.values, // Assuming the response contains engagement values
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Hollow center for doughnut effect
    plugins: {
      legend: {
        display: false, // Hide legend for a cleaner look
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#333" : "#FFF",
        titleColor: theme === "dark" ? "#FFF" : "#000",
        bodyColor: theme === "dark" ? "#FFF" : "#000",
        borderColor: theme === "dark" ? "#555" : "#CCC",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const value = engagementData.values[context.dataIndex];
            return `${context.label}: ${value} engagements`;
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
      {/* {title && <h2 style={titleStyle}>{title}</h2>} Conditionally display title */}
      <div style={{ position: "relative", width: "100%", height: "90%" }}>
        <Doughnut data={chartData} options={options} />
        <div style={detailsStyle}>
          {selectedIndex !== null ? (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>
                {engagementData.labels[selectedIndex]}
              </div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${engagementData.values[selectedIndex]} engagements`}
              </div>
            </>
          ) : (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>Total</div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${totalValue} engagements`}
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

export default EngagementChart;
