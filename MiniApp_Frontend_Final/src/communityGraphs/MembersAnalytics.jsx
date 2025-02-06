import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph c
import TotalMemberNumberCard from "./cmscharts/Member/TotalMemberNumberCard";
import TotalMemberActivityChart from "./cmscharts/Member/TotalMemberActivity";
import RepeatedActivityChart from "./cmscharts/Member/RepeatedActivityChart";
import OverPostingChart from "./cmscharts/Member/OverPostingChart";
import EngagementDropsChart from "./cmscharts/Member/EngagementDrops";
import ContentRepetitionChart from "./cmscharts/Member/ContentRepetitionChart";
import SpamBehaviorChart from "./cmscharts/Member/SpamBehaviorChart";
import OffensiveContentChart from "./cmscharts/Member/OffensiveContentChart";
import LowQualityMessagesChart from "./cmscharts/Member/LowQualityMessagesChart";
import RepetitiveReactionsChart from "./cmscharts/Member/RepetitiveReactionsChart";
import TimeOfPostingChart from "./cmscharts/Member/TimeOfPostingChart";
import Leaderboard from "./cmscharts/Member/LeaderBoard";
import SelfPromoterChart from "./cmscharts/Member/SelfPromoterChart";
import InactivePeriodChart from "./cmscharts/Member/InactivePeriodChart";
import RepetitiveFeedbackChart from "./cmscharts/Member/RepetitiveFeedbackChart";
import RoleMisuseChart from "./cmscharts/Member/RoleMisuseChart";
import GrowthLineChart from "./cmscharts/Member/GrowthLineChart";
import ActiveInactivePieChart from "./cmscharts/Member/ActiveInactivePieChart";
import DropOffLineChart from "./cmscharts/Member/DropOffLineChart";
import LowInteractionRateChart from "./cmscharts/Member/LowInteractionRateChart";
import OveruseEmojisGifsChart from "./cmscharts/Member/OveruseEmojisGifsChart";
import RepeatedReportingChart from "./cmscharts/Member/RepeatedReportingChart";
import AdminPostEngagementChart from "./cmscharts/Member/AdminPostEngagementChart";
import RepetitiveContentChart from "./cmscharts/Member/RepetitiveContentChart";
import BehavioralAnomaliesChart from "./cmscharts/Member/BehavioralAnomaliesChart";
import PollTicketChart from "./cmscharts/Member/PollTicketChart";
import WarningHistoryChart from "./cmscharts/Member/WarningHistoryChart";
import MemberContributionConsistencyChart from "./cmscharts/Member/MemberContributionConsistencyChart";
import NotificationOverloadChart from "./cmscharts/Member/NotificationOverloadChart";
import MemberChurnRateChart from "./cmscharts/Member/MemberChurnRateChart";
import RepetitivePollParticipationChart from "./cmscharts/Member/RepetitivePollParticipationChart";
import DisruptiveBehaviorChart from "./cmscharts/Member/DisruptiveBehaviorChart";
import RepetitiveReactionsChart2 from "./cmscharts/Member/RepetitiveReactionsChart2";
import EventParticipationPatternsChart from "./cmscharts/Member/EventParticipationPatternsChart";
import DelayedMemberResponseTimeChart from "./cmscharts/Member/DelayedMemberResponseTimeChart";

const MemberAnalyticsGraph = ({
  
  lineChartCsvFile, // CSV file for LineChart
  heatMapCsvFile, // CSV file for HeatMap
}) => {
  const [lineChartData, setLineChartData] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);

  // Function to fetch and parse CSV data
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
    fetchData(heatMapCsvFile, setHeatMapData);
  }, [lineChartCsvFile, heatMapCsvFile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" }, // Responsive layout
        gap: 1,
        height: "100%",
      }}
    >
      {/* Right column for leaderboard */}
      <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
        <Card
          sx={{
            height: "12%",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor: "#171717",
          }}
        >
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
        {/* Total Member Number Card  */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
            backgroundColor: "#171717",
          }}
        >
          <TotalMemberNumberCard title="Total Members" number={1500} />
        </Card>

        {/* Active  Member Number Card  */}


        {/*Bot Vs Humans */}
        {/* <Card
          sx={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Bot vs Human
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
              <DoughnutChart />
            </Box>
          </CardContent>
        </Card>


        {/* Line Chart 1 for Daily Growth */}
        {/* <Card
          sx={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Member Growth
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
              <MemberGrowthChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card> */}

        {/*Active Members HeatMap*/}
        {/* <Card
          sx={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Active Members HeatMap
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
              <HeatMap data={lineChartData} />
            </Box>
          </CardContent>
        </Card> */}

        {/*Growth in 1d - 7d - 30d */}
        <Card
          sx={{
            padding:2,
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
              color:"white"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Member Growth
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
              <GrowthLineChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/* Total Member Activity*/}
        <Card
          sx={{
            padding:2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor:"#171717"
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color:"white"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Member Activity
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <TotalMemberActivityChart
                labels={["Login", "Post", "Like", "Share"]}
                data={[150, 200, 300, 100]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Active vs Inactive Members */}
        <Card
          sx={{
            padding:2,
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
              color:"white"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Active Vs Inactive
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
              <ActiveInactivePieChart />
            </Box>
          </CardContent>
        </Card>

        {/*Repeated Activity Patterns */}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor:"#171717"
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color:"white"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Repeated Activity
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <RepeatedActivityChart
                senderNames={["Alice", "Bob", "Charlie", "Diana"]}
                messageCounts={[5, 8, 2, 10]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Over-Posting Members */}
        <Card
          sx={{
            padding:2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor:"#171717"
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color:"white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Over Posting
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <OverPostingChart
                senderNames={["Alice", "Bob", "Charlie", "Diana"]}
                postCounts={[25, 40, 15, 30]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Engagement Drops */}
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
              color:"white"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Engagement Drop
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
              <EngagementDropsChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Content Repetition */}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor:"#171717"
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color:"white"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Content Repetition
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <ContentRepetitionChart
                senderNames={["Alice", "Bob", "Charlie", "Diana"]}
                repeatedCounts={[10, 25, 5, 15]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Spam-like Behavior */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },

          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Spam Behavior
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <SpamBehaviorChart
                senderNames={["Alice", "Bob", "Charlie", "Diana"]} // Example sender names
                spamCounts={[15, 40, 10, 25]} // Example spam message counts
              />
            </Box>
          </CardContent>
        </Card>

        {/*Offensive Content Repeaters */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: "#fff",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Offensive Content
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
              <OffensiveContentChart />
            </Box>
          </CardContent>
        </Card>

        {/*Message Quality*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Low-Quality Messages
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <LowQualityMessagesChart
                senderNames={["Alice", "Bob", "Charlie", "Diana"]} // Example sender names
                lowQualityCounts={[5, 3, 2, 7]} // Example low-quality message counts
              />
            </Box>
          </CardContent>
        </Card>

        {/*Low Interaction Rate */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Low Interaction Rate
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
              <LowInteractionRateChart />
            </Box>
          </CardContent>
        </Card>

        {/*Time-of-Posting Patterns */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Time of Posting
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
              <TimeOfPostingChart />
            </Box>
          </CardContent>
        </Card>

        {/*Overuse of Emojis/Gifs */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Gif/Emoji Overuse
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
              <OveruseEmojisGifsChart />
            </Box>
          </CardContent>
        </Card>

        {/*Frequent Self-Promoters */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Self Promoters
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <SelfPromoterChart
                senderNames={[
                  "Alice",
                  "Bob",
                  "Charlie",
                  "David",
                  "Eva",
                  "Frank",
                  "Grace",
                  "Helen",
                  "Irene",
                  "Jack",
                ]}
                selfPromotionalCounts={[
                  25, // Alice
                  15, // Bob
                  40, // Charlie
                  10, // David
                  60, // Eva
                  30, // Frank
                  50, // Grace
                  35, // Helen
                  20, // Irene
                  45, // Jack
                ]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Poll Participation */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Repetitive Poll Participati
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <RepetitivePollParticipationChart />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Reactions */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Repetitive Reactions
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <RepetitiveReactionsChart2
                senderNames={["Alice", "Bob", "Charlie", "David", "Eve"]}
                reactionsCounts={[120, 85, 92, 135, 75]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Inactive Periods */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Inactive Periods
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
              <InactivePeriodChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Drop-Off Members */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Drop-Off Members
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
              <DropOffLineChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Repeated Reporting */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Repeated Reporting
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
              <RepeatedReportingChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Patterns of Disruptive Behavior*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Disruptive Behavior
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
              <DisruptiveBehaviorChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Engagement with Admin-Posts */}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Engagement with Admin-Posts
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
              <AdminPostEngagementChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Content Posting*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Repetitive Content
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
              <RepetitiveContentChart />
            </Box>
          </CardContent>
        </Card>

        {/*Behavioral Anomalies*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Behavioral Anomalies
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
              <BehavioralAnomaliesChart />
            </Box>
          </CardContent>
        </Card>

        {/*Overactive Poll/Ticket Creation*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Overactive Poll/Ticket Creation
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
              <PollTicketChart />
            </Box>
          </CardContent>
        </Card>

        {/*Members with Warning History*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Members with Warning History
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <WarningHistoryChart />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Reactions to Content*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Repetitive Reactions to Content
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <RepetitiveReactionsChart
                senderNames={["Alice", "Bob", "Charlie", "David", "Eve"]}
                reactionsCounts={[120, 85, 92, 135, 75]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Group Role Misuse*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Role Misus
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <RoleMisuseChart
                senderNames={[
                  "Alice",
                  "Bob",
                  "Charlie",
                  "Diana",
                  "Edward",
                  "Fiona",
                  "George",
                ]}
                activityCounts={[5, 12, 8, 15, 10, 7, 13]}
              />
            </Box>
          </CardContent>
        </Card>

        {/*Member Contribution Consistency*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
               Contribution Consistency
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
              <MemberContributionConsistencyChart />
            </Box>
          </CardContent>
        </Card>

        {/*Event Participation Patterns*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Event Participation
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
              <EventParticipationPatternsChart />
            </Box>
          </CardContent>
        </Card>

        {/*Notification Overload*/}
        <Card
          sx={{
            padding:2,
            backgroundColor:"#171717",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent
            sx={{
              color:"white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Notification Overload
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
              <NotificationOverloadChart />
            </Box>
          </CardContent>
        </Card>

        {/*Delayed Member Response Time*/}
        <Card
          sx={{
            padding:2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor: "#171717"
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Delayed Member Response
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",

              }}
            >
              <DelayedMemberResponseTimeChart />
            </Box>
          </CardContent>
        </Card>

        {/*Member Churn Rate*/}
        <Card
          sx={{
            padding: 2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            backgroundColor: "#171717", // Black background
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
              color: "white", // White text for visibility
            }}
          >
            <Typography variant="h6" gutterBottom>
              Member Churn Rate
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
              <MemberChurnRateChart />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Feedback in Surveys*/}
        <Card
          sx={{
            padding:2,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor: "#171717",
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
            <Typography variant="h6" gutterBottom>
              RepetitiveFeedback
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                width: "90%",
              }}
            >
              <RepetitiveFeedbackChart
                senderNames={[
                  "Alice",
                  "Bob",
                  "Charlie",
                  "Diana",
                  "Edward",
                  "Fiona",
                  "George",
                ]}
                repeatedFeedbackCounts={[8, 15, 6, 20, 10, 12, 5]}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MemberAnalyticsGraph;
