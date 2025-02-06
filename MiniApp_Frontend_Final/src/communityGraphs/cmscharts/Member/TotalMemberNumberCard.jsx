import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TotalMemberNumberCard = () => {
  const [data, setData] = useState(null);

  // Fetch data from Backend
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       '${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}',
  //       {
  //         method: "GET",
  //         //credentials: "include", // Include credentials (cookies, etc.)
  //       }
  //     );
  //     // Parse the JSON response
  //     const result = await response.json();
  //     setData(result);
  //     console.log("Data successfully fetched from the backend:");
  //     console.log(result); // Log the result for debugging
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };

  useEffect(() => {
    // Currently using hardcoded data for testing
    const hardcodedData = {
      title: "Total Members",
      number: 150, // Example of a number fetched from BigQuery or API
    };

    setData(hardcodedData);

    // Uncomment the below line to fetch data dynamically from the backend
    // fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        padding: 2,
        backgroundColor: "#171717",
        color: "green.500",
      }}
    >
      <CardContent>
        <Typography variant="h6" color="white" component="div">
          {data.title} {/* Title fetched dynamically */}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          {data.number} {/* Number fetched dynamically */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalMemberNumberCard;
