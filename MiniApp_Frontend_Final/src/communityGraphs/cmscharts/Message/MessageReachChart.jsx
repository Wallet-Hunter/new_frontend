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

const LineChart = ({ groupId }) => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/messages/messageReach?group_id=${groupId}`, {
        method: "GET",
      });
      
      const result = await response.json();
      
      // Transform data to match recharts format
      const formattedData = result.map(item => ({
        message: `Msg ${item.message_id}`,
        total_views: item.total_views,
        total_replies: item.total_replies,
        total_forwards: item.total_forwards,
      }));
      
      setData(formattedData);
      console.log("Data successfully fetched and formatted:", formattedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [groupId]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [groupId]);

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="90%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis dataKey="message" tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }} />
          <YAxis tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--tooltip-bg)', color: 'var(--tooltip-color)' }} />
          
          <Line type="monotone" dataKey="total_views" stroke="#43e5f4" strokeWidth={2} dot={{ r: 4, fill: "#43e5f4" }} />
          <Line type="monotone" dataKey="total_replies" stroke="#FFA500" strokeWidth={2} dot={{ r: 4, fill: "#FFA500" }} />
          <Line type="monotone" dataKey="total_forwards" stroke="#FF4500" strokeWidth={2} dot={{ r: 4, fill: "#FF4500" }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.light {
    --grid-color: rgba(0, 0, 0, 0.1);
    --axis-color: #333333;
    --tooltip-bg: #f0f0f0;
    --tooltip-color: #333333;
  }

  &.dark {
    --grid-color: rgba(220, 220, 220, 0.1);
    --axis-color: #dcdcdc;
    --tooltip-bg: #1a1a1a;
    --tooltip-color: #ffffff;
  }
`;

export default LineChart;
