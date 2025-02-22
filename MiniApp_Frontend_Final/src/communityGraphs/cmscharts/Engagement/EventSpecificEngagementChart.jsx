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

const EventEngagementLineChart = ( { groupId }) => {
  const [theme, setTheme] = useState("light");

  // State for dynamic data (from API or other sources)
  const [data, setData] = useState([]);

  useEffect(() => {
    // Set theme based on system preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    // Uncomment the following code block to fetch real data

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/eventspecificengagement?group_id=${groupId}`,
          {
            method: "GET",
            // headers: {
            //   "ngrok-skip-browser-warning": "true",
            // },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        // Transform backend response into the expected format
        const transformedData = result.labels.map((date, index) => ({
          date, // Rename "labels" -> "date" for X-axis
          engagement: result.eventEngagementLevel[index], // Rename "eventEngagementLevel" -> "engagement" for Y-axis
        }));

        setData(transformedData); // Set transformed data
        console.log("Transformed Data:", transformedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
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
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="date"
            label={{
              value: "Dates",
              position: "insideBottomRight",
              style: { fill: "var(--axis-color)", fontSize: "12px" },
              offset: -5,
            }}
            tick={{ fill: "var(--axis-color)", fontSize: "0.8em" }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{
              value: "Engagement Levels",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fill: "var(--axis-color)", fontSize: "12px" },
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

export default EventEngagementLineChart;
