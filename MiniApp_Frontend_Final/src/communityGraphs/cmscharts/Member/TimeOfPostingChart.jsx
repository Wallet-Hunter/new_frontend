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

const TimeOfPostingChart = () => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);

  // Function to fetch data from Backend (commented for now)
  /* const fetchData = async () => {
    try {
      const response = await fetch("${process.env.REACT_APP_SERVER_URL}/graphs/member/messages?{group_id}", {
        method: "GET",
        //credentials: "include", // Include credentials (cookies, etc.)
      });

      // Parse the JSON response
      const result = await response.json();
      //setData(hardcodeddData)
      setData(result);
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }; */

  // Function to fetch mock data (as a placeholder for now)
  const fetchDataFromBigQuery = async () => {
    try {
      const testData = [
        { time: 0, activity_count: 5 },  // 12:00 AM
        { time: 1, activity_count: 8 },  // 1:00 AM
        { time: 2, activity_count: 3 },  // 2:00 AM
        { time: 3, activity_count: 6 },  // 3:00 AM
        { time: 4, activity_count: 4 },  // 4:00 AM
        { time: 5, activity_count: 9 },  // 5:00 AM
        { time: 6, activity_count: 12 }, // 6:00 AM
        { time: 7, activity_count: 10 }, // 7:00 AM
        { time: 8, activity_count: 14 }, // 8:00 AM
        { time: 9, activity_count: 15 }, // 9:00 AM
        { time: 10, activity_count: 13 }, // 10:00 AM
        { time: 11, activity_count: 16 }, // 11:00 AM
        { time: 12, activity_count: 20 }, // 12:00 PM
        { time: 13, activity_count: 18 }, // 1:00 PM
        { time: 14, activity_count: 17 }, // 2:00 PM
        { time: 15, activity_count: 19 }, // 3:00 PM
        { time: 16, activity_count: 22 }, // 4:00 PM
        { time: 17, activity_count: 25 }, // 5:00 PM
        { time: 18, activity_count: 28 }, // 6:00 PM
        { time: 19, activity_count: 24 }, // 7:00 PM
        { time: 20, activity_count: 21 }, // 8:00 PM
        { time: 21, activity_count: 18 }, // 9:00 PM
        { time: 22, activity_count: 16 }, // 10:00 PM
        { time: 23, activity_count: 10 }, // 11:00 PM
      ];
      setData(testData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    fetchDataFromBigQuery();

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
              value: "Time of Day (Hours)",
              position: "insideBottomRight",
              offset: -5,
              style: { fill: "white", fontSize: "12px" },
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
            domain={['auto', 'auto']}
            tickFormatter={(time) => `${time}:00`} // Format X-axis time as hour
          />
          <YAxis
            label={{
              value: "Activity Count",
              dy: 60,
              angle: -90,
              position: "insideLeft",
              offset: 5,
              style: { fill: "white", fontSize: "12px" },
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
            domain={['auto', 'auto']}
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
            dataKey="activity_count"
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

export default TimeOfPostingChart;
