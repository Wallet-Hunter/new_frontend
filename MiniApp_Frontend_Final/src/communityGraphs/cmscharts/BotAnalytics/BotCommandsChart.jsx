import React, { useEffect, useState } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

const BotCommandsChart = () => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);

  // Fetching dynamic data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/bots/botinteractionrates?{group_id}', {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const fetchedData = await response.json();
      // Assuming the fetched data is in the format:
      // { time: 'Week 1', commandsUsed: 50 }
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call the function to fetch data
    fetchData();
  }, []);

  useEffect(() => {
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
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="time"
            label={{ value: 'Time (Weeks)', position: 'insideBottomRight', style: { fill: "white", fontSize: "12px" }, offset: -5 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{ value: 'Commands Used', angle: -90, position: 'insideLeft', style: { fill: "white", fontSize: "12px" }, dy: 50, offset: 5 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
            domain={[0, 'dataMax + 50']} // Dynamically adjust to max data value
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg)',
              border: 'none',
              color: 'var(--tooltip-color)',
              fontSize: '0.8em',
            }}
            wrapperStyle={{ zIndex: 10 }}
          />
          <Line
            type="monotone"
            dataKey="commandsUsed"
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

// Styled components for BotCommandsChart
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;  // Make sure it fills the parent
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
    stroke-dashoffset: 500; /* Start offset at 500 to create initial hidden effect */
    animation: drawLine 5s linear infinite; /* Increased duration for smoother effect */
    filter: drop-shadow(0 0 5px rgba(80, 185, 255, 0.7));
  }

  @keyframes drawLine {
    0% {
      stroke-dashoffset: 500; /* Start hidden */
    }
    25% {
      stroke-dashoffset: 250; /* Draw halfway to 25% */
    }
    50% {
      stroke-dashoffset: 0; /* Fully drawn halfway */
    }
    75% {
      stroke-dashoffset: 250; /* Draw halfway back to 75% */
    }
    100% {
      stroke-dashoffset: 500; /* Hide again to create continuous effect */
    }
  }
`;

export default BotCommandsChart;
