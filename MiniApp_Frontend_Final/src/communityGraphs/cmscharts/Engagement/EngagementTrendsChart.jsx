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
  const [theme, setTheme] = useState("light"); // Tracks theme (light/dark)
  const [data, setData] = useState([]); // Stores fetched data
  const [error, setError] = useState(null); // Stores error messages

  /**
   * Fetch engagement trend data from the backend
   */
  const fetchData = async () => {
    

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/engagementtrends?group_id=${groupId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.labels || !result.dailyEngagementCounts) {
        throw new Error("Invalid data format received from the server.");
      }

      // Ensure null or undefined values are replaced with 0
      const mappedData = result.labels.map((label, index) => ({
        time: label,
        engagement: result.dailyEngagementCounts[index] ?? 0,
      }));

      setData(mappedData);
      console.log("Data successfully fetched and mapped:", mappedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error loading data. Please try again.");
    }
  };

  /**
   * Runs on component mount to fetch data and listen for theme changes
   */
  useEffect(() => {
    fetchData(); // Fetch engagement trend data

    // Detect system theme preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [groupId]); // Re-fetch data if groupId changes

  return (
    <ChartContainer className={theme}>
      {error ? ( // Show error message if data fetch fails
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
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
              dataKey="engagement"
              stroke="var(--line-color)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--line-color)" }}
              className="animated-line"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      )}
      <Style theme={theme} />
    </ChartContainer>
  );
};

// Styled components for the chart container
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

// Styled error message component
const ErrorMessage = styled.p`
  color: red;
  font-size: 1em;
  text-align: center;
`;

// Animation styles for the line chart
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
