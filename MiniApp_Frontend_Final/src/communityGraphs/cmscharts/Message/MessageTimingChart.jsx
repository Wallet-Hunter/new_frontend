import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Dynamic HeatMap component
const HeatMap = ({ theme,groupId }) => {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', top: 0, left: 0 });
  const [hourlyCounts, setHourlyCounts] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/message/messagetiming?group_id=${groupId}`,
        {
          method: 'GET',
          // credentials: 'include',
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      // Transform response into an array indexed by hour
      const hourlyCountsMap = Array(24).fill(0); // Initialize array with 24 zeroes
  
      result.forEach(({ hour_of_day, message_frequency }) => {
        hourlyCountsMap[hour_of_day] = message_frequency; // Assign count to correct hour
      });
  
      setHourlyCounts(hourlyCountsMap);
      console.log("Data successfully mapped to hourlyCounts:", hourlyCountsMap);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [currentMonth]);

  const renderHours = () => {
    return Array.from({ length: 24 }, (_, index) => {
      const hour = index;
      const count = hourlyCounts[hour] || 0;
      const color = getColor(count);

      return (
        <HourSquare
          key={hour}
          style={{ backgroundColor: color }}
          data-tooltip={`Hour ${hour}: ${count} Message${count !== 1 ? 's' : ''}`}
        />
      );
    });
  };

  const getColor = (count) => {
    if (count === 0) return theme === 'dark' ? '#444' : '#ddd';
    if (count <= 20) return '#54d5d9'; // Light blue for low frequency
    if (count <= 40) return '#2c9393'; // Medium blue for moderate frequency
    return '#176364'; // Dark blue for high frequency
  };

  return (
    <HeatmapContainer className={`heatmap-container ${theme}`}>
      <MonthWrapper>
        <MonthName theme={theme}>{`${currentMonth} ${currentYear}`}</MonthName>
        <HoursGrid>{renderHours()}</HoursGrid>
      </MonthWrapper>
    </HeatmapContainer>
  );
};

// Styled components for HeatMap
const HeatmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px 0;
`;

const MonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 10px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 600px) {
    padding: 5px;
  }
`;

const MonthName = styled.div`
  margin-bottom: 10px;
  font-size: 2vw;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 3vw;
  }
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 columns to fit 24 hours */
  grid-gap: 5px;
  width: 100%;
  height: auto;

  @media (max-width: 600px) {
    grid-gap: 2px;
    grid-template-columns: repeat(4, 1fr); /* Adjust for smaller screens */
  }
`;

const HourSquare = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 3px;
  position: relative;

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
  }
`;

export default HeatMap;
