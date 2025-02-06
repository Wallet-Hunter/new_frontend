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

const FollowupEngagementChart = () => {
  const [theme, setTheme] = useState("light");

  // Example hardcoded data for post-event days and engagement count
  const hardcodedData = [
    { day: '1', engagement: 4.5 },
    { day: '2', engagement: 6.2 },
    { day: '3', engagement: 3.0 },
    { day: '4', engagement: 5.1 },
    { day: '5', engagement: 4.8 },
    { day: '6', engagement: 7.0 },
    { day: '7', engagement: 8.0 },
    { day: '8', engagement: 7.5 },
    { day: '9', engagement: 6.8 },
    { day: '10', engagement: 5.2 },
    { day: '11', engagement: 6.0 },
    { day: '12', engagement: 5.7 },
    { day: '13', engagement: 6.3 },
    { day: '14', engagement: 6.5 },
    { day: '15', engagement: 7.3 },
    { day: '16', engagement: 6.7 },
    { day: '17', engagement: 8.1 },
    { day: '18', engagement: 8.3 },
    { day: '19', engagement: 9.0 },
    { day: '20', engagement: 7.2 },
    { day: '21', engagement: 6.8 },
    { day: '22', engagement: 7.5 },
    { day: '23', engagement: 8.4 },
    { day: '24', engagement: 7.9 },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // Set theme based on system preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    // Fetch data logic (commented out for now)
    const fetchData = async () => {
      try {
        // Replace with actual BigQuery API call logic
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/event/followupengagementchart?group_id=${group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );
        const result = await response.json();
        const formattedData = result.map(item => ({
          day: item.day, // Adjust keys based on your BigQuery schema
          engagement: parseFloat(item.engagement)
        }));
        setData(formattedData.length ? formattedData : []);
      } catch (error) {
        console.error("Error fetching data from BigQuery:", error);
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
          data={data.length ? data : hardcodedData} // Use fetched data or fallback to hardcoded data
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="day"
            label={{ value: 'Post-event Days', position: 'insideBottomRight', style: { fill: "white", fontSize: "12px" }, offset: -5 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{ value: 'Engagement Count (queries, discussions, shares)', angle: -90, position: 'insideCenterLeft', style: { fill: "white", fontSize: "12px" }, offset: 10 }}
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
            dataKey="engagement"
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
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 500;
    }
  }
`;

export default FollowupEngagementChart;
