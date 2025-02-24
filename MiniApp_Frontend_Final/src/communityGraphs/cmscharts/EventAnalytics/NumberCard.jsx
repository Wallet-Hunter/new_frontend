import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NumberCard = ({ title, number }) => {
  return (
    <Card
      sx={{
        minWidth: '100%',
        maxWidth: 300,
        padding: 2,
        backgroundColor: 'transparent',
        color: 'green.500',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: "white", fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold', color: "white", fontSize: { xs: '2rem', sm: '3rem' } }}
        >
          {number}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TotalEventsCard = ({ groupId }) => {
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    const fetchTotalEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/event/numbercard?group_id=${groupId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && typeof data.data === 'number') {
          setTotalEvents(data.data);
        } else {
          console.error('Unexpected API response format:', data);
          setTotalEvents(0);
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setTotalEvents(0);
      }
    };

    fetchTotalEvents();
  }, [groupId]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <NumberCard title="Total Events" number={totalEvents} />
    </Box>
  );
};

export default TotalEventsCard;
