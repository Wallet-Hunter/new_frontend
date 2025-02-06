import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from '@mui/material';

// Styled TableRow for futuristic effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: '0.3s',
  backgroundColor: "#171717",
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "white", // Default white text
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border for separation
}));

// Badges for top three ranks
const Badge = styled('span')(({ theme }) => ({
  borderRadius: '12px',
  padding: '4px 8px',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  marginRight: '8px',
}));
const Leaderboard = ({ groupId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch leaderboard data from backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphs/engagement/leaderboard?group_id=${groupId}`);
  
      const result = await response.json();
      console.log("Fetched data:", result);
  
      // Ensure we get an array
      setData(Array.isArray(result) ? result : result.leaderboard || []);
    } catch (error) {
      console.error("Error fetching leaderboard:", error.message);
      setData([]); // Default to an empty array on error
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [groupId]);

  // Custom styles for ranking
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: "#76dde1", color: "black" }; // First place
      case 1:
        return { backgroundColor: "#54d5d9", color: "black" }; // Second place
      case 2:
        return { backgroundColor: "#43aaae", color: "black" }; // Third place
      default:
        return {};
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        borderRadius: "8px",
        backgroundColor: "#171717",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 2, textAlign: "center", color: "white", fontWeight: "bold" }}
      >
        Top Engagers
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "8px",
          overflowY: "auto",
          maxHeight: "500px",
          backgroundColor: "#171717",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#333333", color: "white", fontWeight: "bold" }}>Rank</TableCell>
              <TableCell sx={{ backgroundColor: "#333333", color: "white", fontWeight: "bold" }}>User</TableCell>
              <TableCell align="right" sx={{ backgroundColor: "#333333", color: "white", fontWeight: "bold" }}>Messages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user, index) => (
              <StyledTableRow key={index} sx={getRowStyle(index)}>
                <StyledTableCell>{user.rank}</StyledTableCell>
                <StyledTableCell>{user.userName}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.messageCount}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
