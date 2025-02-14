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

// Styled components for futuristic effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "0.3s",
  backgroundColor: "#171717",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "white",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
}));

const Badge = styled("span")(({ theme }) => ({
  borderRadius: "12px",
  padding: "4px 8px",
  color: "white",
  fontWeight: "bold",
  fontSize: "0.9rem",
  marginRight: "8px",
}));

const LeadershipChart = ({ groupId }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/event/leaderboard?group_id=${groupId}`
        );
        const data = await response.json();
        if (!data.error) {
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, [groupId]);

  // Process data to match the expected format
  const formattedData = leaderboardData.map((user) => ({
    orgId: user.userId,
    orgName: user.userName,
    interactionCount: user.engagementScore,
  }));

  const topOrganizations = formattedData
    .sort((a, b) => b.interactionCount - a.interactionCount)
    .slice(0, 5);

  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: "#76dde1", color: "black" };
      case 1:
        return { backgroundColor: "#54d5d9", color: "black" };
      case 2:
        return { backgroundColor: "#43aaae", color: "black" };
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
        Top Users by Engagement
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: "8px", overflowY: "auto", maxHeight: "300px" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Rank</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "white", fontWeight: "bold" }}>User</TableCell>
              <TableCell align="right" sx={{ backgroundColor: "#333", color: "white", fontWeight: "bold" }}>Engagement Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topOrganizations.map((user, index) => (
              <StyledTableRow key={user.orgId} sx={{ ...getRowStyle(index) }}>
                <StyledTableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: "#76dde1" }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: "#54d5d9" }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: "#43aaae" }}>🥉</Badge>}
                </StyledTableCell>
                <StyledTableCell>{user.orgName}</StyledTableCell>
                <StyledTableCell align="right">{user.interactionCount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeadershipChart;
