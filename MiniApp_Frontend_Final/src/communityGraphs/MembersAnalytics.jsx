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

const MemberAnalyticsGraph = ({ groupId }) => {
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
            <Leaderboard groupId={groupId} />
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
          <TotalMemberNumberCard groupId={groupId} />
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
              <GrowthLineChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/* Total Member Activity*/}
        <Card
          sx={{
            padding: 2,
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
              <TotalMemberActivityChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Active vs Inactive Members */}
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
              <ActiveInactivePieChart groupId={groupId} />
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
              <RepeatedActivityChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Over-Posting Members */}
        <Card
          sx={{
            padding: 2,
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
              <OverPostingChart groupId={groupId} />
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
              color: "white",
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
              <EngagementDropsChart groupId={groupId} />
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
              <ContentRepetitionChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Spam-like Behavior */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <SpamBehaviorChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Offensive Content Repeaters */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <OffensiveContentChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Quality*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <LowQualityMessagesChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Low Interaction Rate */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <LowInteractionRateChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Time-of-Posting Patterns */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <OveruseEmojisGifsChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Frequent Self-Promoters */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <SelfPromoterChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Poll Participation */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <RepetitivePollParticipationChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Reactions */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <RepetitiveReactionsChart2 groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Inactive Periods */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <InactivePeriodChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Drop-Off Members */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <DropOffLineChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Repeated Reporting */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <RepeatedReportingChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Patterns of Disruptive Behavior*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <DisruptiveBehaviorChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Engagement with Admin-Posts */}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <AdminPostEngagementChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Content Posting*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <RepetitiveContentChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Behavioral Anomalies*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <BehavioralAnomaliesChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Overactive Poll/Ticket Creation*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <PollTicketChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Members with Warning History*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <WarningHistoryChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Reactions to Content*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <RepetitiveReactionsChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Group Role Misuse*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <RoleMisuseChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Member Contribution Consistency*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <MemberContributionConsistencyChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Event Participation Patterns*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <EventParticipationPatternsChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Notification Overload*/}
        <Card
          sx={{
            padding: 2,
            backgroundColor: "#171717",
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
              color: "white",
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
              <NotificationOverloadChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Delayed Member Response Time*/}
        <Card
          sx={{
            padding: 2,
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
              <DelayedMemberResponseTimeChart groupId={groupId} />
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
              <MemberChurnRateChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Repetitive Feedback in Surveys*/}
        <Card
          sx={{
            padding: 2,
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
              <RepetitiveFeedbackChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MemberAnalyticsGraph;
