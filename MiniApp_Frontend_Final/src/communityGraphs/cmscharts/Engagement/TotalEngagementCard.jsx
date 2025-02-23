import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const TotalEngagementsCard = ({ groupId }) => {
  const [totalEngagement, setTotalEngagement] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromBigQuery = async () => {
      setLoading(true);

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
        if (data && typeof data.totalEngagement === 'number') {
          setTotalEngagement(data.totalEngagement);
        } else {
          setTotalEngagement(0);
        }
      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
        setTotalEngagement(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromBigQuery();
  }, [groupId]);

  return (
    <Card
      sx={{
        minWidth: 275,
        padding: 2,
        backgroundColor: 'transparent',
        color: 'blue.500',
        transition: 'opacity 0.5s ease-in-out',
        opacity: loading ? 0.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <CardContent>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            {totalEngagement.toLocaleString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalEngagementsCard;
