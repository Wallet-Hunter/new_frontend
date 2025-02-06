import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NumberCard = ({ title, number }) => {
  return (
    <Card
      sx={{
        minWidth: '100%',  // Ensures the card stretches fully within its container
        maxWidth: 300,     // Limits the max width
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
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' },color:"white", fontWeight: 'bold' }} // Responsive font size
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold',color:"white", fontSize: { xs: '2rem', sm: '3rem' } }} // Responsive font size
        >
          {number}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TotalEventsCard = () => {
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    const fetchTotalEvents = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/event/numbercard?group_id=${group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );

        const data = await response.json();

        if (data.error) {
          console.error('Error from API:', data.error);
          setTotalEvents(0); // Set default value if there's an error
        } else if (data.data.length === 0) {
          setTotalEvents(0); // No data case
        } else {
          setTotalEvents(data.data); // Set the fetched data
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setTotalEvents(0); // Handle network or other errors
      }
    };

    fetchTotalEvents();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <NumberCard title="Total Events Held" number={totalEvents} />
    </Box>
  );
};

export default TotalEventsCard;
