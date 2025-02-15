import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NumberCard = ({ title }) => {
  const [number, setNumber] = useState(0); // State for the displayed number

  useEffect(() => {
    // Fetch data from Backend (commented out for now)
    /*
    const fetchData = async () => {
      try {
        const response = await fetch('${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}', {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        });

        // Parse the JSON response
        const result = await response.json();
        //setData(hardcodeddData)
        setData(result);
        console.log("Data successfully fetched from the backend:");
        console.log(result); // Log the result for debugging
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
    */

    // Hardcoded data for testing purposes
    setNumber(); // Set a hardcoded number for testing
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%' }}> {/* Ensures the NumberCard fills its container */}
      <Card
        sx={{
          width: '100%',
          height: '100%',  // Adjust height to fit container
          padding: 2,
          color: 'green.500',
          display: 'flex',         // Add flex for alignment
          justifyContent: 'center', // Centers content vertically
          alignItems: 'center',
          backgroundColor:"#171717"
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}> {/* Centers the text */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '1.2rem', // Adjust the font size of the title
              fontWeight: 'bold',  // Makes the title bold
              marginBottom: 1,     // Adds space below the title
              color:"white"
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: '2.5rem',   // Adjust the font size of the number
              fontWeight: 'bold',   // Makes the number bold
              color:"white"
            }}
          >
            {number}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NumberCard;
