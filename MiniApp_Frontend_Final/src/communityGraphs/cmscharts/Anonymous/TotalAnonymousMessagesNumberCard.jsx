import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TotalAnonymousMessagesNumberCard = ({ title , groupId}) => {
  const [totalAnonymousMessages, setTotalAnonymousMessages] = useState(null);

  useEffect(() => {
    const fetchDataFromBigQuery = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/totalanonymousmessages?group_id=${groupId}`,
          {
            method: 'GET',
            //credentials: 'include', // Include credentials (if required)
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalAnonymousMessages(data.totalAnonymousMessages); // Set the totalAnonymousMessages from the API response
      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
      }
    };

    fetchDataFromBigQuery();
  }, [groupId]);

  if (totalAnonymousMessages === null) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <Card sx={{ minWidth: 275, padding: 2, backgroundColor: 'transparent', color: 'green.500' }}>
      <CardContent>
        
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
          {totalAnonymousMessages} {/* Display the totalAnonymousMessages value */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalAnonymousMessagesNumberCard;
