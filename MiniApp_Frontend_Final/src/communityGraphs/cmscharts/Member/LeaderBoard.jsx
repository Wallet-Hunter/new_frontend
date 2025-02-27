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

const InconsistentContributors = ({ groupId }) => {
  const [kolData, setKOLData] = useState([]);

  useEffect(() => {
    const fetchKOLData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/graphs/member/inconsistentcontributors?group_id=${groupId}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setKOLData(data.inconsistent_contributors || []);
      } catch (error) {
        console.error("Error fetching KOL data:", error);
      }
    };
    fetchKOLData();
  }, [groupId]);

  const topKOLs = [...kolData]
    .sort((a, b) => b.total_contributions - a.total_contributions)
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
        Top 5 Key Opinion Leaders (KOL)
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
                User
              </TableCell>
              <TableCell
                align="right"
                sx={{ backgroundColor: "#333333", color: "white", fontWeight: "bold" }}
              >
                Total Contributions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topKOLs.map((kol, index) => (
              <StyledTableRow key={kol.sender_id} sx={{ ...getRowStyle(index) }}>
                <StyledTableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: "#76dde1" }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: "#54d5d9" }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: "#43aaae" }}>🥉</Badge>}
                </StyledTableCell>
                <StyledTableCell>{kol.sender_name}</StyledTableCell>
                <StyledTableCell align="right">{kol.total_contributions}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InconsistentContributors;