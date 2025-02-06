import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styled from "styled-components";

const EngagementDropsChart = () => {
  const [theme, setTheme] = useState("light");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Set theme based on system preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    // Fetch data from Backend
    const fetchData = async () => {
      try {
        // Uncomment this block when ready to use backend logic
        /*
        const response = await fetch(
          "${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}",
          {
            method: "GET",
            //credentials: "include", // Include credentials (cookies, etc.)
          }
        );

        // Parse the JSON response
        const result = await response.json();
        setChartData(result);
        console.log("Data successfully fetched from the backend:", result);
        */

        // Hardcoded Data for Testing
        const testData = [
          { time: "Day 1", engagement: 150 },
          { time: "Day 2", engagement: 120 },
          { time: "Day 3", engagement: 100 },
          { time: "Day 4", engagement: 80 },
          { time: "Day 5", engagement: 60 },
        ];
        setChartData(testData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="time"
            label={{
              value: "Time (Days)",
              position: "insideBottomRight",
              style: { fill: "white", fontSize: "12px" },
              offset: -5,
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
          />
          <YAxis
            label={{
              value: "Engagement Level",
              angle: -90,
              position: "insideLeft",
              dy: 60,
              style: { fill: "white", fontSize: "12px" },
              offset: 15,
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
            domain={[0, "dataMax + 20"]}
          />
          <Tooltip
            cursor={{ stroke: "var(--tooltip-cursor-color)", strokeWidth: 2 }}
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              border: "none",
              color: "var(--tooltip-color)",
              fontSize: "0.8em",
            }}
            wrapperStyle={{ zIndex: 10 }}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="var(--line-color)"
            strokeWidth={2}
            dot={{ r: 5, fill: "var(--line-color)" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
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
  background-color: "black";

  &.light {
    --line-color: #54d5d9;
    --axis-color: #333333;
    --grid-color: rgba(0, 0, 0, 0.1);
    --tooltip-bg: #f0f0f0;
    --tooltip-color: #f0f0f0;
    --tooltip-cursor-color: rgba(0, 0, 0, 0.2);
  }

  &.dark {
    --line-color: #54d5d9;
    --axis-color: #dcdcdc;
    --grid-color: rgba(220, 220, 220, 0.1);
    --tooltip-bg: #1a1a1a;
    --tooltip-color: #ffffff;
    --tooltip-cursor-color: rgba(255, 255, 255, 0.2);
  }
`;

const Style = styled.div`
  .animated-line {
    filter: drop-shadow(0 0 5px rgba(80, 185, 255, 0.7));
  }
`;

export default EngagementDropsChart;
