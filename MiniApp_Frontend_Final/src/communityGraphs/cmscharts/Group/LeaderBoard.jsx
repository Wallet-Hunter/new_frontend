import React from 'react';
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
import { Bar } from 'react-chartjs-2'; // Import Chart.js for the bar chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Hardcoded data for the leaderboard (Top 5 Bots with interaction counts)
const leaderboardData = [
  { botId: 1, botName: 'Bot 1', interactionCount: 500 },
  { botId: 2, botName: 'Bot 2', interactionCount: 400 },
  { botId: 3, botName: 'Bot 3', interactionCount: 350 },
  { botId: 4, botName: 'Bot 4', interactionCount: 300 },
  { botId: 5, botName: 'Bot 5', interactionCount: 250 },
];

// Styled TableRow for futuristic effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Box shadow on hover
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly change background color on hover
  },
}));

// Badges for top three ranks
const Badge = styled('span')(({ theme }) => ({
  borderRadius: '12px',
  padding: '4px 8px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  marginRight: '8px',
}));

const Leaderboard = () => {
  // Ensure data is sorted by interaction count in descending order
  const topBots = leaderboardData
    .sort((a, b) => b.interactionCount - a.interactionCount)
    .slice(0, 5); // Limit to top 5 bots

  // Custom styles for rank highlighting
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: '#76dde1' }; // Gold for 1st
      case 1:
        return { backgroundColor: '#54d5d9' }; // Silver for 2nd
      case 2:
        return { backgroundColor: '#43aaae' }; // Bronze for 3rd
      default:
        return {};
    }
  };

  // Data for the leadership chart (Bots vs Interactions)
  const chartData = {
    labels: topBots.map((bot) => bot.botName), // Labels are the bot names
    datasets: [
      {
        label: 'Interactions',
        data: topBots.map((bot) => bot.interactionCount), // Data for interactions
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Light teal color for the bars
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Leadership Chart (Bots vs Interactions)',
      },
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: '100%', // Ensure it does not exceed the parent container
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title for the leaderboard section */}
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', color: 'colors.grey[400]', fontWeight: 'bold' }}>
        Top 5 Bots
      </Typography>

      {/* Table for the leaderboard */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: '8px',
          overflowY: 'auto', // Hidden overflow to prevent scrollbars
          maxHeight: '400px', // Adjust maxHeight to fit 5 rows
        }}
      >
        <Table stickyHeader> {/* Enable sticky header for the table */}
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Bot</TableCell>
              <TableCell align="right">Interactions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topBots.map((bot, index) => (
              <StyledTableRow
                key={bot.botId}
                sx={{
                  ...getRowStyle(index), // Apply custom row styles for top 3 bots
                }}
              >
                <TableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: '#76dde1' }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: '#54d5d9' }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: '#43aaae' }}>🥉</Badge>}
                </TableCell>
                <TableCell>{bot.botName}</TableCell>
                <TableCell align="right">{bot.interactionCount}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Leadership chart for Bots vs Interactions */}
      <Box sx={{ marginTop: 4 }}>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default Leaderboard;
