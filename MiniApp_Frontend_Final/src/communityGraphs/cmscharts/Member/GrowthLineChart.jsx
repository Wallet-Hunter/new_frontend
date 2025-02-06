import React, { useEffect, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const GrowthLineChart = () => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);

  // Function to fetch data dynamically (e.g., from BigQuery)
  // const fetchDataFromBigQuery = async () => {
  //   try {
  //     const response = await fetch("${process.env.REACT_APP_SERVER_URL}/graphs/member/growthlinechart?group_id=${group_id}"); // Replace with your actual API endpoint
  //     const jsonData = await response.json();
  //     setData(jsonData); // Assuming the API returns data in the required format
  //   } catch (error) {
  //     console.error("Error fetching data from BigQuery:", error);
  //   }
  // };

  useEffect(() => {
    // Set theme based on system preferences
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    // Load hardcoded data for testing
    const hardcodedData = [
      { period: "1d", growth: 120 },
      { period: "7d", growth: 850 },
      { period: "30d", growth: 3400 },
    ];
    setData(hardcodedData);

    // Uncomment the following line to fetch data dynamically
    // fetchDataFromBigQuery();

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="90%">
        <RechartsLineChart
          data={data}
          // margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="period"
            label={{
              value: "Time Period",
              position: "insideBottomRight",
              offset: -5,
              style: { fill: "white",fontSize: "12px" },
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
          />
          <YAxis
            label={{
              value: "Growth",
              angle: -90,
              position: "insideLeft",
              offset: 5,
              style: { fill: "white" , fontSize: "12px"}, // Set the label color to white

            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
          />

          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.92)" }}
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              border: "none",
              color: "white",
              fontSize: "0.8em",
            }}
            wrapperStyle={{ zIndex: 10 }}
          />
          <Line
            type="monotone"
            dataKey="growth"
            stroke="var(--line-color)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--line-color)" }}
            className="animated-line"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
      <Style theme={theme} />
    </ChartContainer>
  );
};

// Styled components for LineChart
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #171717;

  &.light {
    --line-color: #43e5f4;
    --axis-color: #333333;
    --grid-color: rgba(255, 255, 255, 0.9);
    --tooltip-bg: #f0f0f0;
    --tooltip-color: #fff;
  }

  &.dark {
    --line-color: #43e5f4;
    --axis-color: #dcdcdc;
    --grid-color: rgba(220, 220, 220, 0.1);
    --tooltip-bg: #1a1a1a;
    --tooltip-color: #ffffff;
  }
`;

const Style = styled.div`
  .animated-line {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: drawLine 5s linear infinite;
    filter: drop-shadow(0 0 5px rgba(80, 185, 255, 0.7));
  }

  @keyframes drawLine {
    0% {
      stroke-dashoffset: 500;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export default GrowthLineChart;
