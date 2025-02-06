import React, { useEffect, useState } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

const EventImpactChart = () => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]); // State to store fetched data

  // Hardcoded data for testing
  const hardcodedData = [
    { time: -5, membership: 80 },  // 5 months before the event
    { time: -4, membership: 85 },
    { time: -3, membership: 90 },
    { time: -2, membership: 92 },
    { time: -1, membership: 95 },
    { time: 0, membership: 120 }, // Event happens
    { time: 1, membership: 130 },
    { time: 2, membership: 140 },
    { time: 3, membership: 145 },
    { time: 4, membership: 150 },
    { time: 5, membership: 155 },
  ];

  useEffect(() => {
    // Set theme based on system preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    // Fetch data from BigQuery (commented out for now)
    const fetchData = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/event/eventimpactchart?group_id=${group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );

        const result = await response.json();
        const transformedData = result.map((row) => ({
          time: row.time,
          membership: row.membership,
        }));
        setData(transformedData.length ? transformedData : []);
      } catch (error) {
        console.error("Error fetching data from BigQuery:", error);
        setData([]); // Fallback to hardcoded data on error
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
        <RechartsLineChart
          data={data}
          //margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="time"
            label={{
              value: 'Time ',
              position: 'insideBottomRight',
              offset: -5,
              style: { fill: "white" , fontSize: "12px"}
            }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{
              value: 'Membership Count',
              angle: -90,
              position: 'insideLeft',
              style: { fill: "white" , fontSize: "12px"},
              dy:60,
              offset: 10,
            }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
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
            dataKey="membership"
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

export default EventImpactChart;
