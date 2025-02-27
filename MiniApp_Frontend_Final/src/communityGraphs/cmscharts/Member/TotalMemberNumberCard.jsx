import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TotalMemberNumberCard = ({ groupId }) => {
  const [data, setData] = useState({ title: "Total Members", number: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  groupId = 2422715291;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/totalmember?group_id=${groupId}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setData({ title: result.title || "Total Members", number: result.number ?? 0 });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (groupId) {
      fetchData();
    }
  }, [groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card sx={{ minWidth: 275, padding: 2, backgroundColor: "#171717", color: "white" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {data.title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
          {data.number}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalMemberNumberCard;
