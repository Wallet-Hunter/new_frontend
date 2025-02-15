import React, { useEffect, useState } from "react";
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
  backgroundColor: "#171717", // Default black background
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle hover effect
  },
}));

// Styled TableCell for white text
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "white", // Default white text
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border for separation
}));

// Badges for top three ranks
const Badge = styled("span")(({ theme }) => ({
  borderRadius: "12px",
  padding: "4px 8px",
  color: "black",
  fontWeight: "bold",
  fontSize: "0.9rem",
  marginLeft: "8px",
}));

const TopBotLeaderboard = () => {
  const [botData, setBotData] = useState([]);

  // Placeholder: Hardcoded data for testing
  const hardcodedData = [
    
  ];

  useEffect(() => {
    // Fetch data from Backend
    const fetchData = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/messages?{group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials (cookies, etc.)
          }
        );

        // Parse the JSON response
        const result = await response.json();
        //setData(hardcodeddData)
        setBotData(result);
        console.log("Data successfully fetched from the backend:");
        console.log(result); // Log the result for debugging
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Uncomment to fetch data from backend
    // fetchData();

  }, []);

  // Ensure data is sorted by interaction score
  const topBots = [...botData]
    .sort((a, b) => b.interactionScore - a.interactionScore)
    .slice(0, 5);

  // Custom styles for rank highlighting
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: "#76dde1", color: "black" }; // Gold badge
      case 1:
        return { backgroundColor: "#54d5d9", color: "black" }; // Silver badge
      case 2:
        return { backgroundColor: "#43aaae", color: "black" }; // Bronze badge
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        borderRadius: "8px",
        backgroundColor: "#171717", // Black background
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
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
        Top 5 Bots by Interaction
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "8px",
          overflowY: "auto",
          maxHeight: "500px",
          backgroundColor: "#171717", // Black background for the container
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
                  backgroundColor: "#333333",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Bot
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: "#333333",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Interaction Score
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topBots.map((bot, index) => (
              <StyledTableRow
                key={bot.botId}
                sx={{
                  ...getRowStyle(index),
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
                <StyledTableCell>{bot.botName}</StyledTableCell>
                <StyledTableCell align="right">
                  {bot.interactionScore}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopBotLeaderboard;
