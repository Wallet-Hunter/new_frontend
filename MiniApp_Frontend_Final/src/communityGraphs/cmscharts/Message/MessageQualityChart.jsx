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

const MessageQualityChart = ({ groupId }) => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);
  
  // Fetch and format data from the API
  const fetchData = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/graphs/message/messageQuality?group_id=${groupId}`;
      const response = await fetch(url, { method: "GET" });
  
      if (response.ok) {
        const result = await response.json();
  
        // Map data to correct structure
        const formattedData = result.map((item) => ({
          date: item.date?.value || "Unknown", // Ensure we extract date value correctly
          avg_quality_score: item.avg_quality_score ?? 0, // Handle undefined/null values
        }));
  
        setData(formattedData);
        console.log("Formatted Data:", formattedData);
      } else {
        console.error("Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  
  useEffect(() => {
    fetchData();
    
    // Handle theme based on system preferences
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => setTheme(e.matches ? "dark" : "light");
    matchMedia.addEventListener("change", handleThemeChange);
    
    return () => matchMedia.removeEventListener("change", handleThemeChange);
  }, [groupId]);

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="90%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="date"
            label={{ value: 'Time', position: 'insideBottomRight', style: { fill: "white", fontSize: "12px" }, offset: -5 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{ value: 'Quality Score', angle: -90, position: 'insideLeft', style: { fill: "white", fontSize: "12px" }, dy: 60, offset: 10 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: 'none', color: 'var(--tooltip-color)', fontSize: '0.8em' }}
            wrapperStyle={{ zIndex: 10 }}
          />
          <Line
            type="monotone"
            dataKey="avg_quality_score"
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
    0% { stroke-dashoffset: 500; }
    50% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 500; }
  }
`;

export default MessageQualityChart;
