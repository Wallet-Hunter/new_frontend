import React, { useState, useEffect } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import styled from "styled-components";

// Styled component for the map container
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: transparent; /* Background adapts to theme */
`;

// Styled loading indicator
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
`;

const WorldMap = ({ group_id }) => {
  const [countryData, setCountryData] = useState({});
  const [isDataReady, setIsDataReady] = useState(false);
  const [colorScale, setColorScale] = useState({ min: 0, max: 100 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for group_id:", group_id); // Debugging log
        if (!group_id) {
          throw new Error("group_id is missing.");
        }

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/homeworldmap?group_id=${group_id}`
        );
        const result = await response.json();

        if (!result || Object.keys(result).length === 0) {
          throw new Error("Invalid or empty data received.");
        }

        // Filter out invalid values
        const validData = Object.fromEntries(
          Object.entries(result).filter(([_, value]) => value !== null && value !== undefined)
        );

        if (Object.keys(validData).length === 0) {
          throw new Error("No valid data found.");
        }

        setCountryData(validData);
        setColorScale({
          min: Math.min(...Object.values(validData)),
          max: Math.max(...Object.values(validData)),
        });
        setIsDataReady(true);
        console.log("Data successfully fetched:", validData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [group_id]);

  // Function to generate color based on data value
  const getCountryColor = (value) => {
    if (value === undefined || value === null) return "#1a1a1a"; // Default color for missing data

    const normalizedValue = (value - colorScale.min) / (colorScale.max - colorScale.min);
    const glowColors = ["#98e6e8", "#43aaae", "#328082"]; // Light, medium, and dark blues

    if (normalizedValue < 0.33) return glowColors[0]; // Light blue for low values
    if (normalizedValue < 0.67) return glowColors[1]; // Medium blue for mid values
    return glowColors[2]; // Dark blue for high values
  };

  // Render loading state
  if (!isDataReady) {
    return <LoadingContainer>Loading map data...</LoadingContainer>;
  }

  return (
    <MapContainer>
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={false}
        containerStyle={{ width: "100%", height: "100%" }}
        regionStyle={{
          initial: {
            fill: "#666666", // Default color for regions
            "fill-opacity": 1,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 1,
            filter: "drop-shadow(0 0 12px #58a7e8)", // Glow effect
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
            filter: "drop-shadow(0 0 18px rgba(0, 255, 255, 1))", // Stronger glow on hover
          },
        }}
        series={{
          regions: [
            {
              values: countryData, // Country data from API
              scale: ["#98e6e8", "#328082"], // Scale from light to dark blue
              normalizeFunction: "polynomial",
            },
          ],
        }}
        onRegionTipShow={(e, el, code) => {
          const value = countryData[code] || "No data";
          el.html(`${el.html()} - Value: ${value}`);
        }}
      />
    </MapContainer>
  );
};

export default WorldMap;
