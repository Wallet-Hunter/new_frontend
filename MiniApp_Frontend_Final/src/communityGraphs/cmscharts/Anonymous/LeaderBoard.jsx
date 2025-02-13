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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "0.3s",
  backgroundColor: "#171717",
  "&:hover": {
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
  color: "black",
  fontWeight: "bold",
  fontSize: "0.9rem",
  marginLeft: "8px",
}));

const TopAnonymousContributors = ({ groupId }) => {
  const [kolData, setKOLData] = useState([]);

  useEffect(() => {
    const fetchKOLData = async () => {
      console.log("Fetching data from API...");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/anonymous/topanonymouscontributors?group_id=${groupId}`
        );
  
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("API Response Data:", data);
  
        if (!Array.isArray(data)) throw new Error("Invalid API response format");
  
        setKOLData(data);
      } catch (error) {
        console.error("Error fetching KOL data:", error);
      }
    };
  
    if (groupId) fetchKOLData();
  }, [groupId]);
  

  const topContributors = [...kolData]
    .sort((a, b) => b.message_count - a.message_count)
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
        backgroundColor: "#171717",
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
          backgroundColor: "#171717",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "#333333", color: "white", fontWeight: "bold" }}
              >
                Rank
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#333333", color: "white", fontWeight: "bold" }}
              >
                Anonymous Members
              </TableCell>
              <TableCell
                align="right"
                sx={{ backgroundColor: "#333333", color: "white", fontWeight: "bold" }}
              >
                Number of Posts
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topContributors.map((kol, index) => (
              <StyledTableRow key={kol.anonymous_member} sx={{ ...getRowStyle(index) }}>
                <StyledTableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: "#76dde1" }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: "#54d5d9" }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: "#43aaae" }}>🥉</Badge>}
                </StyledTableCell>
                <StyledTableCell>{kol.anonymous_member}</StyledTableCell>
                <StyledTableCell align="right">{kol.message_count}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopAnonymousContributors;