import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

import MemberInteractionsChart from "./cmscharts/Engagement/MemberInteractionChart";
import Leaderboard from "./cmscharts/Engagement/LeaderBoard";
import ActivePassiveChart from "./cmscharts/Engagement/ActivePassiveChart";
import AdminInfluenceChart from "./cmscharts/Engagement/AdminInfluenceChart";
import EngagementByContentTypeChart from "./cmscharts/Engagement/EngagementByContentTypeChart";
import EngagementByTimeChart from "./cmscharts/Engagement/EngagementByTimeChart";
import EngagementTrendsChart from "./cmscharts/Engagement/EngagementTrendsChart";
import EventSpecificEngagementChart from "./cmscharts/Engagement/EventSpecificEngagementChart";
import PostEngagementChart from "./cmscharts/Engagement/PostEngagementChart";
import SentimentAnalysisChart from "./cmscharts/Engagement/SentimentAnalysisChart";
import ReactionsAnalysisChart from "./cmscharts/Engagement/ReactionsAnalysisChart";
import TopEngagedMembersChart from "./cmscharts/Engagement/TopEngagedMembersChart";
import TotalEngagementsCard from "./cmscharts/Engagement/TotalEngagementCard";

const EngagementAnalyticsGraph = ({ groupId }) => {
  return (
    <Box
      sx={{
        padding: 0.5,
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        width: "100%",
        height: "100%",
        gap: 1,
      }}
    >
      {/* Right Side: Leaderboard */}
      <Box
        sx={{
          width: { xs: "100%", lg: "40%" },
          paddingLeft: { lg: 1 },
          backgroundColor: "#171717",
        }}
      >
        <Card
          sx={{
            height: "100%",
            padding: 2,
            backgroundColor: "#171717",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
          }}
        >
          <CardContent>
            <Leaderboard groupId={groupId} />
          </CardContent>
        </Card>
      </Box>

      {/* Left Side: Graphs */}
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Graphs */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 1,
          }}
        >
          {/*Total Engagement Chart*/}
          <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                padding: "8px",
                width: "100%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Engagement
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
                <TotalEngagementsCard groupId={groupId} />
              </Box>
            </CardContent>
          </Card>

          {/*Active vs Passive Members*/}
          <Card
            sx={{
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
              backgroundColor: "#171717",
              padding: 2,
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "100%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Active vs Passive Members
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
                <ActivePassiveChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card>

          {/*Member Interactions*/}
          {/* <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
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
                Member Interactions
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
                <MemberInteractionsChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card> */}

          {/*Engagement Trends*/}
          <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "100%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Engagement Trends
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
                <EngagementTrendsChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card>

          {/*Engagement by Time*/}
          <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "90%",
                height: "100%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Engagement By Time
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
                <EngagementByTimeChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card>

          {/*Post Engagement*/}
          {/* <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Post Engagement
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
                <PostEngagementChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card> */}

          {/*Engagement by Content Type*/}
          {/* <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Content Engagement
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
                <EngagementByContentTypeChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card> */}

          {/*Sentiment Analysis*/}
          <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "90%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Sentiment Analysis
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
                <SentimentAnalysisChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card>

          {/*Engagement with Polls/Quizzes*/}
          {/* <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Engagement with Polls/Quiz
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
              <EngagementChart
                labels={["Poll A", "Quiz 1", "Poll B", "Quiz 2"]}
                engagementData={[150, 200, 50, 100]}
              />
              </Box>
            </CardContent>
          </Card> */}

          {/*Reactions Analysis*/}
          <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "100%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Reactions Analysis
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
                <ReactionsAnalysisChart
                  groupId={groupId}
                  reactions={["Likes", "Hearts", "Emojis"]}
                  reactionCounts={[150, 120, 90]}
                />
              </Box>
            </CardContent>
          </Card>

          {/*Conversation Depth*/}
          {/* <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Conversation Depth
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
              <ConversationDepthScatter
                threadReplies={[1, 3, 2, 10, 5, 6, 15, 20, 8, 15, 3, 12]}
              />
              </Box>
            </CardContent>
          </Card> */}

          {/*Influence of Admins*/}
          <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "90%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Influence of Admins
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
                <AdminInfluenceChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card>

          {/*Event-Specific Engagement*/}
          <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Event-Specific Engagement
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
                <EventSpecificEngagementChart groupId={groupId} />
              </Box>
            </CardContent>
          </Card>

          {/*Inactive Members*/}
          {/* <Card
            sx={{
              backgroundColor: "#171717",
              padding: 2,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: "0px 4px 20px 0px #54d5d9" },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                width: "100%",
                height: "90%",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Inactive Members
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
              <InactiveMembersChart />
              </Box>
            </CardContent>
          </Card> */}
        </Box>
      </Box>
    </Box>
  );
};

export default EngagementAnalyticsGraph;
