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

const DisruptiveBehaviorChart = ({ groupId }) => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);

  // Function to fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/members/disruptivebehaviour?group_id=${groupId}`
      );
      const result = await response.json();
      
      if (result?.disruptive_behavior) {
        // Transform backend data to match frontend format
        const transformedData = result.disruptive_behavior.map((item) => ({
          member_id: item.sender_name, // Using sender_name as the X-axis label
          disruptive_behavior: item.disruptive_behavior, // Y-axis value
        }));
        setData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    // Set theme based on system preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    // Fetch data when the component mounts
    fetchData();

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [groupId]);

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="90%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="member_id"
            label={{
              value: "Members",
              position: "insideBottomRight",
              offset: -5,
              style: { fill: "white", fontSize: "12px" },
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
          />
          <YAxis
            label={{
              value: "Disruptive Behavior Level",
              dy: 60,
              angle: -90,
              position: "insideLeft",
              offset: 5,
              style: { fill: "white", fontSize: "12px" },
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
            dataKey="disruptive_behavior"
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
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export default DisruptiveBehaviorChart;
