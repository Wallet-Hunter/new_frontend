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

// Example hardcoded data for testing purposes
const hardcodedData = [
  { orgId: 1, orgName: "Org A", interactionCount: 150 },
  { orgId: 2, orgName: "Org B", interactionCount: 140 },
  { orgId: 3, orgName: "Org C", interactionCount: 120 },
  { orgId: 4, orgName: "Org D", interactionCount: 110 },
  { orgId: 5, orgName: "Org E", interactionCount: 100 },
  { orgId: 6, orgName: "Org F", interactionCount: 90 },
  { orgId: 7, orgName: "Org G", interactionCount: 80 },
  { orgId: 8, orgName: "Org H", interactionCount: 70 },
  { orgId: 9, orgName: "Org I", interactionCount: 60 },
  { orgId: 10, orgName: "Org J", interactionCount: 50 },
];

// Styled TableRow for futuristic effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "0.3s",
  backgroundColor: "#171717",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
  color: "white",
  fontWeight: "bold",
  fontSize: "0.9rem",
  marginRight: "8px",
}));

const LeadershipChart = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Placeholder for fetching data from BigQuery
    // Uncomment and replace with actual fetching logic

    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(
          '${process.env.REACT_APP_SERVER_URL}/graphs/event/leaderboard?group_id=${group_id}',
          {
            method: "GET",
            //credentials: "include", // Include credentials
          }
        );
        const data = await response.json();
        if (data.error) {
          // Handle error if needed
        } else {
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();

    // Use hardcoded data for testing
    // setLeaderboardData(hardcodedData);
  }, []);

  // Ensure data is sorted by interaction count in descending order
  const topOrganizations = leaderboardData
    .sort((a, b) => b.interactionCount - a.interactionCount)
    .slice(0, 5); // Limit to top 5 organizations

  // Custom styles for rank highlighting
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: "#76dde1", color: "black" }; // Gold for 1st
      case 1:
        return { backgroundColor: "#54d5d9", color: "black" }; // Silver for 2nd
      case 2:
        return { backgroundColor: "#43aaae", color: "black" }; // Bronze for 3rd
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
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#171717",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "grey.400",
          fontWeight: "bold",
        }}
      >
        Top Organizations in Events
      </Typography>

      {/* Scrollable table container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "8px",
          overflowY: "auto",
          maxHeight: "300px",
          color: "white",
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
                Organization
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: "#333333", // Dark background
                  color: "white", // White text
                  fontWeight: "bold", // Bold font for better visibility
                }}
              >
                Interaction Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topOrganizations.map((org, index) => (
              <StyledTableRow
                key={org.orgId}
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
                <StyledTableCell>{org.orgName}</StyledTableCell>
                <StyledTableCell align="right">
                  {org.interactionCount}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeadershipChart;
