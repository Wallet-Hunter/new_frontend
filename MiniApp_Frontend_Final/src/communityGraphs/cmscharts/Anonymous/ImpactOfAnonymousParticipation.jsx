import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ groupId }) => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState({ anonymous: 0, identified: 0 });
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/impactofanonymousparticipation?group_id=${groupId}`,
        {
          method: "GET",
          //credentials: "include",
        }
      );
      const result = await response.json();
  
      const anonymous = result.anonymous_interaction || 0; // Default to 0 if undefined
      const identified = result.identified_interaction || 0; // Default to 0 if undefined
  
      // Check if both values are zero, handle accordingly
      if (anonymous === 0 && identified === 0) {
        setData({ anonymous: 0, identified: 0, message: "No interactions yet." });
      } else {
        setData({
          anonymous,
          identified,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setData({ anonymous: 0, identified: 0, message: "Error fetching data." });
    }
  };
  
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");
  
    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
  
    matchMedia.addEventListener("change", handleThemeChange);
    fetchData();
  
    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [groupId]);
  

  const totalValue = data.anonymous + data.identified;

  const chartData = {
    labels: ["Anonymous Interaction", "Identified Interaction"],
    datasets: [
      {
        data: [data.anonymous, data.identified],
        backgroundColor: ["#45e8ed", "#69edf1"],
        hoverBackgroundColor: ["#54d5d9", "#3fb3b5"],
        borderColor: ["#45e8edAA", "#69edf1AA"],
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
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#333" : "#FFF",
        titleColor: theme === "dark" ? "#FFF" : "#000",
        bodyColor: theme === "dark" ? "#FFF" : "#000",
        borderColor: theme === "dark" ? "#555" : "#CCC",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${context.label}: ${value.toLocaleString()} (${(
              (value / totalValue) *
              100
            ).toFixed(2)}%)`;
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
  };

  return (
    <div style={chartContainerStyle}>

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Doughnut data={chartData} options={options} />
        <div style={detailsStyle}>
          {selectedIndex !== null ? (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>
                {chartData.labels[selectedIndex]}
              </div>
              <div style={{ ...valueStyle, fontSize: "18px", fontWeight: "500" }}>
                {`${chartData.datasets[0].data[selectedIndex].toLocaleString()} (${(
                  (chartData.datasets[0].data[selectedIndex] / totalValue) *
                  100
                ).toFixed(2)}%)`}
              </div>
            </>
          ) : (
            <>
              <div style={{ ...titleStyle, fontSize: "14px", fontWeight: "600" }}>
                Total Participation
              </div>
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
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
};

const valueStyle = {
  fontSize: "18px",
  fontWeight: "500",
};

export default DoughnutChart;
