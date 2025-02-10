import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const greenAccent = {
  500: "#54d5d9",
  600: "#76dde1",
  700: "#98e6e8",
};

const getRandomColor = () => {
  const colors = Object.values(greenAccent);
  return colors[Math.floor(Math.random() * colors.length)];
};

const BubbleChart = ({ group_id }) => {
  const svgRef = useRef();
  const [bubbleData, setBubbleData] = useState([]);
  const containerRef = useRef(null);

  // Hardcoded data for testing
  const hardcodedData = [
    { name: "John Doe", value: 30 },
    { name: "Jane Smith", value: 45 },
    { name: "Michael Johnson", value: 20 },
    { name: "Emily Davis", value: 60 },
    { name: "Daniel Wilson", value: 80 },
    { name: "Sophia Brown", value: 15 },
    { name: "James Taylor", value: 40 },
    { name: "Olivia Anderson", value: 70 },
    { name: "William Thomas", value: 25 },
    { name: "Ava Martinez", value: 50 },
    { name: "Isabella Garcia", value: 35 },
    { name: "Ethan Lee", value: 55 },
    { name: "Mia Moore", value: 65 },
    { name: "Alexander Harris", value: 75 },
    { name: "Charlotte Clark", value: 85 },
    { name: "Mason Lewis", value: 95 },
    { name: "Amelia Walker", value: 10 },
    { name: "Henry Young", value: 20 },
    { name: "Grace King", value: 30 },
    { name: "Lucas Hall", value: 40 },
  ];

  // Dynamic data fetching logic
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/homebubblechart?group_id=${group_id}`,
        {
          method: "GET",
          // headers: {
          //   "ngrok-skip-browser-warning": "true"
          // }
        }
      );

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        setBubbleData(
          hardcodedData.map((d) => ({
            ...d,
            color: getRandomColor(),
          }))
        );
      } else {
        // Parse the JSON response
        const result = await response.json();
        // Process result to match bubble chart format
        const formattedData = result.map((d) => ({
          name: d.name,
          value: d.value,
          color: getRandomColor(),
        }));

        setBubbleData(formattedData);
        console.log("Data successfully fetched from the backend:");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    // Fetch dynamic data
    fetchData();
  }, [group_id]);

  useEffect(() => {
    if (bubbleData.length === 0) return;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", "0 0 100 100")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("font", "6px sans-serif")
      .style("background-color", "transparent");

    // **Clear previous chart elements**
    svg.selectAll("*").remove();

    const pack = d3.pack().size([100, 100]).padding(0.5);

    const root = d3.hierarchy({ children: bubbleData }).sum((d) => d.value);
    const nodes = pack(root).leaves();

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "transparent")
      .style("color", "white")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("font-size", "10px")
      .style("pointer-events", "none")
      .style("transition", "visibility 0.2s, opacity 0.2s ease");

    let timeout;

    const bubble = svg
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        d3.select(this).raise();
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", d.r * 1.2)
          .attr("fill", d.data.color);
        d3.select(this)
          .selectAll("text")
          .transition()
          .duration(200)
          .style("fill", "white");
        clearTimeout(timeout);
        tooltip
          .style("visibility", "visible")
          .style("opacity", 1)
          .text(`${d.data.name}: ${d.data.value}%`)
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseleave", function (event, d) {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", d.r)
          .attr("fill", "none");
        d3.select(this)
          .selectAll("text")
          .transition()
          .duration(200)
          .style("fill", d.data.color);
        timeout = setTimeout(() => {
          tooltip.style("visibility", "hidden").style("opacity", 0);
        }, 100);
      });

    bubble
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", "none")
      .attr("stroke", (d) => d.data.color)
      .attr("stroke-width", 0.5);

    bubble
      .append("text")
      .attr("dy", "0.3em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.name)
      .style("fill", (d) => d.data.color)
      .style('font-weight', 'bold') 
      .attr("font-size", (d) => `${Math.min(d.r / 5, 10)}px`)
      .attr("pointer-events", "all");

    bubble
      .append("text")
      .attr("dy", "1.5em")
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.value}%`)
      .style("fill", (d) => d.data.color)
      .style("fill-opacity", 0.7)
      .style('font-weight', 'bold') 
      .attr("font-size", (d) => `${Math.min(d.r / 5, 8)}px`)
      .attr("pointer-events", "none");

    return () => {
      tooltip.remove();
    };
  }, [bubbleData]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "90%",
          position: "relative",
          margin: "0 auto",
        }}
      >
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default BubbleChart;
