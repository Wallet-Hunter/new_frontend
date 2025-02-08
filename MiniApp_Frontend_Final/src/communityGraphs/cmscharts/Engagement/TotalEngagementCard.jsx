import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TotalEngagementsCard = ({ groupId }) => {
  const [totalEngagement, setTotalEngagement] = useState(0); // Default to 0 instead of null
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchDataFromBigQuery = async () => {
      setLoading(true); // Set loading state before fetching new data

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/totalengagement?group_id=${groupId}`,
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalEngagement(data.totalEngagement || 0); // If data is null, default to 0
      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
        setTotalEngagement(0); // Set 0 in case of an error
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchDataFromBigQuery();
  }, [groupId]); // Refetch data when groupId changes

  return (
    <Card
      sx={{
        minWidth: 275,
        padding: 2,
        backgroundColor: 'transparent',
        color: 'blue.500',
        transition: 'opacity 0.5s ease-in-out', // Smooth transition effect
        opacity: loading ? 0.5 : 1, // Fade effect while loading
      }}
    >
      <CardContent>
       
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
          {totalEngagement.toLocaleString()} {/* Format number with commas */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalEngagementsCard;
