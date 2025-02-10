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

const AdminInfluenceChart = ({groupId}) => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/influenceofadmins?group_id=${groupId}`,
          {
            method: "GET",
            // headers: {
            //   "ngrok-skip-browser-warning": "true",
            // },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        // Transform API response to match frontend expectations
        const transformedData = result.labels.map((date, index) => ({
          time: date,  // X-axis
          adminInfluence: result.adminInfluencePercentage[index], // Y-axis
        }));
        

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Uncomment the line below to use real data fetching logic
    fetchData();
  }, []);

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="80%">
        <RechartsLineChart
          data={data}
          //margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
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
              value: "Engagement Level",
              angle: -90,
              position: "insideLeft",
              style: { fill: "white", fontSize: "12px" },
              dy: 60,
              offset: 10,
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
            domain={[0, 1]} // Keeping the engagement level within 0 to 1 range
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
            dataKey="adminInfluence"
            stroke="var(--admin-line-color)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--admin-line-color)" }}
            className="animated-line"
          />
          <Line
            type="monotone"
            dataKey="otherPosts"
            stroke="var(--other-line-color)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--other-line-color)" }}
            className="animated-line"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
      <Style theme={theme} />
    </ChartContainer>
  );
};

// Styled components for AdminInfluenceChart
const ChartContainer = styled.div`
  width: 100%;
  height: 100%; // Make sure it fills the parent
  display: flex;
  justify-content: center;
  align-items: center;

  &.light {
    --admin-line-color: #43e5f4; /* Admin line color */
    --other-line-color: #112b2b; /* Other posts line color */
    --axis-color: #333333;
    --grid-color: rgba(0, 0, 0, 0.1);
    --tooltip-bg: #f0f0f0;
    --tooltip-color: #333333;
  }

  &.dark {
    --admin-line-color: #43e5f4; /* Admin line color */
    --other-line-color: #112b2b; /* Other posts line color */
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
    filter: drop-shadow(
      0 0 5px rgba(80, 185, 255, 0.7)
    ); /* Light glow effect */
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

export default AdminInfluenceChart;
