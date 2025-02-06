import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

const UserEngagementChart = () => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([
    { time: 'Day 1', botA: 30, botB: 50 },
    { time: 'Day 2', botA: 40, botB: 60 },
    { time: 'Day 3', botA: 35, botB: 55 },
    { time: 'Day 4', botA: 50, botB: 70 },
    { time: 'Day 5', botA: 45, botB: 65 },
    { time: 'Day 6', botA: 60, botB: 80 },
    { time: 'Day 7', botA: 55, botB: 75 }
  ]);

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

  // Fetch data from Backend
  useEffect(() => {
    // Uncomment this when you want to fetch data from the backend
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}', {
    //       method: "GET",
    //       //credentials: "include", // Include credentials (cookies, etc.)
    //     });
    //
    //     // Parse the JSON response
    //     const result = await response.json();
    //     //setData(hardcodeddData)
    //     setData(result);
    //     console.log("Data successfully fetched from the backend:");
    //     console.log(result); // Log the result for debugging
    //   } catch (error) {
    //     console.error("Error fetching data:", error.message);
    //   }
    // };

    // fetchData();
  }, []);

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          //margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="time"
            label={{ value: 'Time (Days)', position: 'insideBottomRight', style: { fill: "white",fontSize: "12px" }, offset: -5 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
          />
          <YAxis
            label={{ value: 'Engagement Count', angle: -90, position: 'insideLeft', style: { fill: "white",fontSize: "12px" }, offset: 5,dy:50 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
            domain={[0, 'dataMax + 20']}
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
          <Bar dataKey="botA" fill="var(--bar-color-a)" barSize={20} />
          <Bar dataKey="botB" fill="var(--bar-color-b)" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      <Style theme={theme} />
    </ChartContainer>
  );
};

// Styled components for UserEngagementChart
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.light {
    --bar-color-a: #43e5f4;
    --bar-color-b: #11494c;
    --axis-color: #333333;
    --grid-color: rgba(0, 0, 0, 0.1);
    --tooltip-bg: #f0f0f0;
    --tooltip-color: #333333;
  }

  &.dark {
    --bar-color-a: #43e5f4;
    --bar-color-b: #11494c;
    --axis-color: #dcdcdc;
    --grid-color: rgba(220, 220, 220, 0.1);
    --tooltip-bg: #1a1a1a;
    --tooltip-color: #ffffff;
  }
`;

const Style = styled.div`
  /* Additional styling for animations */
`;

export default UserEngagementChart;
