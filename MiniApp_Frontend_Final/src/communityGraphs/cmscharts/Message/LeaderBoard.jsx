import React, { useState, useEffect } from "react";
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
} from "@mui/material";

// Styled TableRow for futuristic effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // Box shadow on hover
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly change background color on hover
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "white", // Default white text
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border for separation
}));

// Badges for top three ranks
const Badge = styled("span")(({ theme }) => ({
  borderRadius: "12px",
  padding: "4px 8px",
  color: "white",
  fontWeight: "bold",
  fontSize: "0.9rem",
  marginRight: "8px",
}));

const ActiveUsers = () => {
  const [activeUsersData, setActiveUsersData] = useState([]);

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://b653-27-6-209-17.ngrok-free.app/graphs/messages/leaderboard?{group_id}",
        {
          method: "GET",
          //credentials: "include", // Include credentials (cookies, etc.)
        }
      );

      // Parse the JSON response
      const result = await response.json();
      setActiveUsersData(result); // Set the fetched data
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Sort the data by messages sent in descending order
  const topActiveUsers = activeUsersData
    .sort((a, b) => b.messagesSent - a.messagesSent)
    .slice(0, 5); // Limit to top 5 active users

  // Custom styles for rank highlighting
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: "#76dde1" }; // Gold for 1st
      case 1:
        return { backgroundColor: "#54d5d9" }; // Silver for 2nd
      case 2:
        return { backgroundColor: "#43aaae" }; // Bronze for 3rd
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "50%", // Ensure it does not exceed the parent container
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Top Active Users
      </Typography>

      {/* Scrollable table container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "8px",
          overflowY: "auto", // Scrollable when content overflows
          maxHeight: "300px", // Adjust maxHeight to control visible rows
          backgroundColor: "#171717",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#333333", // Dark background
                  color: "white", // White text
                  fontWeight: "bold", // Bold font for better visibility
                }}
              >
                Rank
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#333333", // Dark background
                  color: "white", // White text
                  fontWeight: "bold", // Bold font for better visibility
                }}
              >
                User
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: "#333333", // Dark background
                  color: "white", // White text
                  fontWeight: "bold", // Bold font for better visibility
                }}
              >
                Messages Sent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topActiveUsers.map((user, index) => (
              <StyledTableRow
                key={user.userId}
                sx={{
                  ...getRowStyle(index), // Apply custom row styles for top 3 users
                }}
              >
                <StyledTableCell>
                  {index + 1}
                  {index === 0 && (
                    <Badge style={{ backgroundColor: "#76dde1" }}>🏆</Badge>
                  )}
                  {index === 1 && (
                    <Badge style={{ backgroundColor: "#54d5d9" }}>🥈</Badge>
                  )}
                  {index === 2 && (
                    <Badge style={{ backgroundColor: "#43aaae" }}>🥉</Badge>
                  )}
                </StyledTableCell>
                <StyledTableCell>{user.userName}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.messagesSent}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActiveUsers;
