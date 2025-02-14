import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveInactivePieChart = ({ title, groupId }) => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/activevsinactive?group_id=${groupId}`
        );
        
        const result = await response.json();
        
        if (result.active_vs_inactive) {
          const active = result.active_vs_inactive.active_count || 0;
          const inactive = result.active_vs_inactive.inactive_count || 0;
          
          setData({
            labels: ["Active Members", "Inactive Members"],
            values: [active, inactive],
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [groupId]);

  const totalValue = data.values.reduce((acc, value) => acc + value, 0);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#45e8ed", "#2db7ba"],
        hoverBackgroundColor: ["#37c5c9", "#2499a3"],
        borderColor: ["#45e8edAA", "#2db7baAA"],
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
            const value = data.values[context.dataIndex] || 0;
            return `${context.label}: ${value.toLocaleString()} (${totalValue ? ((value / totalValue) * 100).toFixed(2) : 0}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      {title && <h2 style={{ fontSize: "14px", fontWeight: "500", textAlign: "center" }}>{title}</h2>}
      <div style={{ position: "relative", width: "100%", height: "90%" }}>
        {loading ? (
          <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}>Loading...</p>
        ) : (
          <Doughnut data={chartData} options={options} />
        )}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10 }}>
          <div style={{ fontSize: "14px", fontWeight: "600" }}>Total Members</div>
          <div style={{ fontSize: "18px", fontWeight: "500" }}>{totalValue.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default ActiveInactivePieChart;
