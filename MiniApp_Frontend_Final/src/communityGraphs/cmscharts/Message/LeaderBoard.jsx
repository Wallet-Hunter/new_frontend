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

const ActiveUsers = ({groupId}) => {
  const [activeUsersData, setActiveUsersData] = useState([]);

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/graphs/message/mostactiveusers?group_id=${groupId}`,
        { method: "GET" }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      // Extract user names and message counts from the API response
      const activeUsers = result.map((item) => ({
        userName: item.sender_name,
        messagesSent: item.total_messages_sent,
      }));
  
      // Sort and store top active users
      const sortedUsers = activeUsers.sort((a, b) => b.messagesSent - a.messagesSent).slice(0, 5);
      setActiveUsersData(sortedUsers);
  
      console.log("Processed Data:", sortedUsers);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  // Sort and limit to top 5 active users
  const topActiveUsers = [...activeUsersData]
    .sort((a, b) => b.messagesSent - a.messagesSent)
    .slice(0, 5);

  // Custom styles for rank highlighting
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: "#76dde1" };
      case 1:
        return { backgroundColor: "#54d5d9" };
      case 2:
        return { backgroundColor: "#43aaae" };
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "50%",
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

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "8px",
          overflowY: "auto",
          maxHeight: "300px",
          backgroundColor: "#171717",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Rank", "User", "Messages Sent"].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    backgroundColor: "#333333",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  align={header === "Messages Sent" ? "right" : "left"}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {topActiveUsers.map((user, index) => (
              <StyledTableRow key={index} sx={getRowStyle(index)}>
                <StyledTableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: "#76dde1" }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: "#54d5d9" }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: "#43aaae" }}>🥉</Badge>}
                </StyledTableCell>
                <StyledTableCell>{user.userName}</StyledTableCell>
                <StyledTableCell align="right">{user.messagesSent}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActiveUsers;
