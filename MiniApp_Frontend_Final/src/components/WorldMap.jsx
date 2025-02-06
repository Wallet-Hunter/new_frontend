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

const WorldMap = ({ group_id, backgroundColor }) => {
  const [countryData, setCountryData] = useState({});
  const [isDataReady, setIsDataReady] = useState(false);
  const [colorScale, setColorScale] = useState({ min: 0, max: 100 });

  // Hardcoded data for country values
  const hardcodedData = {
    US: 90,
    CN: 50,
    IN: 70,
    FR: 30,
    DE: 60,
    BR: 40,
    RU: 80,
    ZA: 20,
  };

  // Fetch data from the backend (commented out for now)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/homeworldmap?group_id=${group_id}`,
        {
          method: "GET",
          // headers: {
          //   "ngrok-skip-browser-warning": "true"
          // }
        }
      );

      // Parse the JSON response
      const result = await response.json();
      setCountryData(result); // Use the fetched data
      console.log("Data successfully fetched from the backend:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };


  useEffect(() => {
    // Simulate data processing
    const processHardcodedData = () => {
      let minValue = Infinity;
      let maxValue = -Infinity;

      Object.values(hardcodedData).forEach((value) => {
        if (value < minValue) minValue = value;
        if (value > maxValue) maxValue = value;
      });

      setCountryData(hardcodedData); // Replace with fetched data if uncommenting fetch logic
      setColorScale({ min: minValue, max: maxValue });
      setIsDataReady(true);
    };

    processHardcodedData();

    // Uncomment below to use fetch logic
    //fetchData();

  }, [group_id]);

  // Generate color based on data value
  const getCountryColor = (value) => {
    if (value === undefined || value === null) {
      return "#1a1a1a"; // Default color for missing data
    }

    const scale = colorScale;
    const normalizedValue = (value - scale.min) / (scale.max - scale.min);

    const glowColors = ["#98e6e8", "#43aaae", "#328082"]; // Light, medium, and dark blues

    if (normalizedValue < 0.33) {
      return glowColors[0]; // Light blue for low values
    } else if (normalizedValue < 0.67) {
      return glowColors[1]; // Medium blue for medium values
    } else {
      return glowColors[2]; // Dark blue for high values
    }
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
        containerStyle={{
          width: "100%",
          height: "100%", // Fill the container
        }}
        regionStyle={{
          initial: {
            fill: "#666666", // Default color for regions
            "fill-opacity": 1,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 1,
            filter: "drop-shadow(0 0 12px #58a7e8)", // Glow effect for all regions
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
            filter: "drop-shadow(0 0 18px rgba(0, 255, 255, 1))", // Optional: stronger glow on hover
          },
        }}
        series={{
          regions: [
            {
              values: countryData, // Country data from hardcoded object
              scale: [getCountryColor(colorScale.min), getCountryColor(colorScale.max)],
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
