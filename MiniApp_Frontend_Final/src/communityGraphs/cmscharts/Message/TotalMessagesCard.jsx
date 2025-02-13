import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TotalMessagesCard = ({ title, groupId }) => {
  const [totalMessages, setTotalMessages] = useState(0); // Default to 0
  const [graphData, setGraphData] = useState([]); // Default to empty array

  useEffect(() => {
    const fetchDataFromBigQuery = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/message/totalmessages?group_id=${groupId}`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract and validate response
        const totalMessagesData = Array.isArray(data.total_messages_sent) && data.total_messages_sent.length > 0
          ? data.total_messages_sent.reduce((acc, val) => acc + val, 0) // Sum up messages if array contains data
          : 0; // Default to 0 if empty or null

        setTotalMessages(totalMessagesData); 

        // Ensure graph data is valid
        setGraphData(Array.isArray(data.graphData) ? data.graphData : []);

      } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
        setTotalMessages(0); // Fallback in case of an error
        setGraphData([]); // Clear graph data on failure
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
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <CardContent>
        
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold',color:"white", textAlign: 'center', marginBottom: '16px' }}
        >
          {totalMessages.toLocaleString()}
        </Typography>
        {graphData.length > 0 ? (
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="messages" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography sx={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>
            
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalMessagesCard;
