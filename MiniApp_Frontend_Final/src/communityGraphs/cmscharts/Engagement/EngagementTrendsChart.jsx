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

const LineChart = ({ groupId }) => {
  const [theme, setTheme] = useState("light");

  // State for dynamic data (from backend)
  const [data, setData] = useState([]);

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/engagementtrends?group_id=${groupId}`,
        {
          method: "GET",
        }
      );
  
      const result = await response.json();
  
      // Map the response to match the expected format
      const mappedData = result.labels.map((label, index) => ({
        time: label,
        engagement: result.dailyEngagementCounts[index],
      }));
  
      setData(mappedData);
      console.log("Data successfully fetched and mapped:");
      console.log(mappedData); // Log the mapped result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchData(); // Uncommented to fetch actual data from the backend

    // Set theme based on system preference
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

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="90%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="time"
            label={{
              value: "Time",
              position: "insideBottomRight",
              style: { fill: "white", fontSize: "12px" },
              offset: -5,
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{
              value: "Engagement",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fill: "white", fontSize: "12px" },
              dy: 60,
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
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
            dataKey="engagement" // DataKey updated to reflect Engagement Trends
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

  &.light {
    --line-color: #43e5f4;
    --axis-color: #333333;
    --grid-color: rgba(0, 0, 0, 0.1);
    --tooltip-bg: #f0f0f0;
    --tooltip-color: #333333;
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
    25% {
      stroke-dashoffset: 250;
    }
    50% {
      stroke-dashoffset: 0;
    }
    75% {
      stroke-dashoffset: 250;
    }
    100% {
      stroke-dashoffset: 500;
    }
  }
`;

export default LineChart;
