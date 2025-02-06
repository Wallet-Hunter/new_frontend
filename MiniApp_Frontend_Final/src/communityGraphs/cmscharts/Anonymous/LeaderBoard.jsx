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

const TopAnonymousContributors = ({groupId}) => {
  const [kolData, setKOLData] = useState([]);

  // Placeholder: Hardcoded data for testing
  const hardcodedData = [
    { userId: 1, uniqueId: "anonymous_1", numberOfPosts: 85 },
    { userId: 2, uniqueId: "anonymous_2", numberOfPosts: 80 },
    { userId: 3, uniqueId: "anonymous_3", numberOfPosts: 75 },
    { userId: 4, uniqueId: "anonymous_4", numberOfPosts: 70 },
    { userId: 5, uniqueId: "anonymous_5", numberOfPosts: 65 },
  ];

  useEffect(() => {
    // Fetch data from API or fallback to hardcoded data
    const fetchKOLData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/topanonymouscontributors?group_id=${groupId}`
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log("API Response:", data); // Log the response to check if it's correct

        // Ensure the response is an array
        if (!Array.isArray(data)) throw new Error("Invalid API response format");

        // Transform API response to match frontend expectations
        const transformedData = data.map((item, index) => ({
          userId: index + 1, // Generate a unique user ID
          uniqueId: item.anonymous_member, // Rename anonymous_member to uniqueId
          numberOfPosts: item.message_count, // Rename message_count to numberOfPosts
        }));

        setKOLData(transformedData); // Set state to fetched data
      } catch (error) {
        console.error("Error fetching KOL data:", error);
        setKOLData(hardcodedData); // Fallback to hardcoded data
      }
    };

    fetchKOLData(); // Call the function to fetch data
  }, []);


  // Ensure data is sorted by number of posts
  const topContributors = [...kolData]
    .sort((a, b) => b.numberOfPosts - a.numberOfPosts)
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
        Top Anonymous Contributors
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
                Anonymous Members
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: "#333333",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Number of Posts
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topContributors.map((kol, index) => (
              <StyledTableRow
                key={kol.userId}
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
                <StyledTableCell>{kol.uniqueId}</StyledTableCell>
                <StyledTableCell align="right">
                  {kol.numberOfPosts}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopAnonymousContributors;
