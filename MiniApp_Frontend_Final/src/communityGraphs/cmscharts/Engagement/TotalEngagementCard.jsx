import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TotalEngagementsCard = ({ groupId }) => {
  const [totalEngagement, setTotalEngagement] = useState(null);

  useEffect(() => {
    const fetchDataFromBigQuery = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/engagement/totalengagement?group_id=${groupId}`,
          {
            method: 'GET',
            // headers: {
            //   "ngrok-skip-browser-warning": "true"
            // }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalEngagement(data.totalEngagement); // Set the totalEngagements from the API response
      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
      }
    };

    fetchDataFromBigQuery();
  }, []);

  if (totalEngagement === null) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <Card sx={{ minWidth: 275, padding: 2, backgroundColor: 'transparent', color: 'blue.500' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {/* {title || 'Total Engagements'} Title passed via props or fallback */}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
          {totalEngagement.toLocaleString()} {/* Display the totalEngagements value with formatting */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalEngagementsCard;
