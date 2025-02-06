import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import InteractionRateChart from "./cmscharts/BotAnalytics/InteractionRateChart";
import BotResponseTimeChart from "./cmscharts/BotAnalytics/BotResponseTimeChart";
import TopCommandsChart from "./cmscharts/BotAnalytics/TopCommandsChart";
import ContentSharingChart from "./cmscharts/BotAnalytics/ContentSharingChart";
import TotalBotsNumberCard from "./cmscharts/BotAnalytics/TotalBotsNumberCard";
import BotEngagementChart from "./cmscharts/BotAnalytics/BotEngagementChart";
import Leaderboard from "./cmscharts/BotAnalytics/LeaderBoard";
import BotMessageFrequencyChart from "./cmscharts/BotAnalytics/BotMessageFrequencyChart";
import BotCommandsChart from "./cmscharts/BotAnalytics/BotCommandsChart";
import ActiveBotsChart from "./cmscharts/BotAnalytics/ActiveBotsChart";
import UserEngagementChart from "./cmscharts/BotAnalytics/UserEngagementChart";
import BotErrorRateChart from "./cmscharts/BotAnalytics/BotErrorRateChart";
import UserSatisfactionChart from "./cmscharts/BotAnalytics/UserSatisfactionChart";
import TopPerformingBotsChart from "./cmscharts/BotAnalytics/TopPerformingBotsChart";
import BotFailuresChart from "./cmscharts/BotAnalytics/BotFailuresChart";
import BotEngagementStacked from "./cmscharts/BotAnalytics/BotEngagementStacked";

const BotAnalyticsGraph = ({ lineChartCsvFile }) => {
  const [lineChartData, setLineChartData] = useState([]);

  // Fetch and parse CSV data
  const fetchData = async (file, setData) => {
    try {
      const data = await csv(file);
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${file}:`, error);
    }
  };

  useEffect(() => {
    fetchData(lineChartCsvFile, setLineChartData);
  }, [lineChartCsvFile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" }, // Stack on smaller screens, row on larger screens
        gap: 1,
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "40%" },
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#171717",
        }}
      >
        <Card sx={{ height: "100%", padding: 2, backgroundColor: "#171717" }}>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>

      {/* Left column for graphs (3x2 layout) */}
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // 1 column on small screens, 2 on larger
          gridTemplateRows: "repeat(3, auto)",
          gap: 1,
        }}
      >
        {/* Number Card */}

        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
            backgroundColor: "#171717",
          }}
        >
          <TotalBotsNumberCard title="Total Number of Bots" number={1500} />
        </Card>

        {/*Bot Message Frequency*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Message Frequency
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotMessageFrequencyChart />
            </Box>
          </CardContent>
        </Card>

        {/*Bot Engagement*/}

        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Bot Enagagement
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotEngagementStacked />
            </Box>
          </CardContent>
        </Card>

        {/*Bot Commands Used*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Bot Commands Used
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotCommandsChart />
            </Box>
          </CardContent>
        </Card>

        {/*Active Bots*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Active Bots
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <ActiveBotsChart />
            </Box>
          </CardContent>
        </Card>

        {/*Interaction Rate*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Interaction Rate
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <InteractionRateChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Top Commands*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Top Commands
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <TopCommandsChart
                labels={["Command A", "Command B", "Command C", "Command D"]}
                commandsData={[15, 30, 50, 10]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*User Engagement With Bots*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              User Engagement with Bots
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <UserEngagementChart />
            </Box>
          </CardContent>
        </Card>

        {/*Bot Response Time*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Avg. Response Time
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotResponseTimeChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Bot Error Rate*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Bot Error Rate
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotErrorRateChart />
            </Box>
          </CardContent>
        </Card>

        {/*User Satisfaction With Bots*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              User Satisfaction with Bots
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <UserSatisfactionChart />
            </Box>
          </CardContent>
        </Card>

        {/* Bot Engagement by Time*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Engagement by Time
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotEngagementChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Top Performing Bots*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Top Performing Bots
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <TopPerformingBotsChart />
            </Box>
          </CardContent>
        </Card>

        {/*Bot Automation*/}
        {/* <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Bot Automation
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotAutomationChart />
            </Box>
          </CardContent>
        </Card>*/}

        {/* Bot User Retention
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Bot User Retention
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotUserRetentionChart />
            </Box>
          </CardContent>
        </Card>

        {/*Bot Specific Content Sharing*/}
         <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Content Sharing
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <ContentSharingChart
                labels={["Image", "Video", "Article", "Blog", "Podcast"]}
                shareCountData={[1500, 3500, 1200, 800, 2000]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Bot Failure and Issues */}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
              Bot Failures and Issues
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "90%",
              }}
            >
              <BotFailuresChart />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BotAnalyticsGraph;
