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

  // Hardcoded data for fallback
  const hardcodedData = [];

  

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/homebubblechart?group_id=${group_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      // Check if the data is empty or contains only null/0 values
      if (
        !Array.isArray(result) ||
        result.length === 0 ||
        result.every((d) => !d.value || d.value === 0)
      ) {
        console.warn("No valid data received. Displaying 'No data to display'.");
        setBubbleData([]); // Set empty array to trigger the no-data message
        return;
      }

      // Process valid data
      const formattedData = result
        .filter((d) => d.name) // Ensure the name exists
        .map((d) => ({
          name: d.name,
          value: d.value || 0, // Display 0 if value is null or missing
          color: getRandomColor(),
        }));

      setBubbleData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setBubbleData([]); // Set empty array to show "No data to display"
    }
  };

  useEffect(() => {
    fetchData();
  }, [group_id]);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", "0 0 100 100")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("font", "6px sans-serif")
      .style("background-color", "transparent");

    svg.selectAll("*").remove(); // Clear previous elements

    if (bubbleData.length === 0) {
      // Display "No data to display" message
      svg
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("fill", "gray")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .text("No data to display");
      return;
    }

    const pack = d3.pack().size([100, 100]).padding(2.5); // Increased padding

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
      .attr("r", (d) => Math.max(d.r, 5))
      .attr("fill", "none")
      .attr("stroke", (d) => d.data.color)
      .attr("stroke-width", 0.5);

      bubble
      .append("text")
      .attr("dy", "0.3em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.name.toUpperCase())
      .style("fill", (d) => d.data.color)
      .style("font-weight", "bold")
      .attr("font-size", (d) => `${Math.min(d.r / 6, 8)}px`) // Reduced font size
      .attr("pointer-events", "all");
    
    bubble
      .append("text")
      .attr("dy", "2em") // Adjust spacing slightly
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.value || 0}%`.toUpperCase())
      .style("fill", (d) => d.data.color)
      .style("fill-opacity", 0.7)
      .attr("font-size", (d) => `${Math.min(d.r / 6, 6)}px`) // Reduced font size
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
