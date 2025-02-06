import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TotalMessagesCard = ({ title }) => {
  const [totalMessages, setTotalMessages] = useState(null);
  const [graphData, setGraphData] = useState([]); // State for graph data

  useEffect(() => {
    const fetchDataFromBigQuery = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/messages/totalmessages?group_id=${group_id}',
          {
            method: 'GET',
            //credentials: 'include', // Include credentials (if required)
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalMessages(data.totalEngagements); // Update total messages
        setGraphData(data.graphData || []); // Update graph data if available
      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
      }
    };

    fetchDataFromBigQuery();
  }, []);

  if (totalMessages === null) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        padding: 2,
        backgroundColor: '#fff',
        color: 'blue.500',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', color: '#1976d2' }}>
          {title || 'Total Messages Sent'} {/* Title passed via props or fallback */}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}
        >
          {totalMessages.toLocaleString()} {/* Display the total messages value with formatting */}
        </Typography>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="messages" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TotalMessagesCard;
