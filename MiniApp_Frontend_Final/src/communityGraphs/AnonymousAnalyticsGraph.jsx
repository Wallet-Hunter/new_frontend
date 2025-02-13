import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components

import TotalAnonymousMessagesNumberCard from "./cmscharts/Anonymous/TotalAnonymousMessagesNumberCard";
import ImpactOfAnonymousParticipation from "./cmscharts/Anonymous/ImpactOfAnonymousParticipation";
import Leaderboard from "./cmscharts/Anonymous/LeaderBoard";
import DiscussionsChart from "./cmscharts/Anonymous/DiscussionsChart";
import AnonymousUserInteractionChart from "./cmscharts/Anonymous/AnonymousUserInteractionChart";
import AnonymousFeedbackChart from "./cmscharts/Anonymous/AnonymousFeedbackChart";
import AnonymousPostTrend from "./cmscharts/Anonymous/AnonymousPostTrend";
import SentimentDoughnutChart from "./cmscharts/Anonymous/SentimentDoughnutChart";
import AnonymousEngagementChart from "./cmscharts/Anonymous/AnonymousEngagementChart";
import GroupCultureChart from "./cmscharts/Anonymous/GroupCultureChart";

const AnonymousAnalyticsGraph = ({ groupId }) => {
  const [lineChartData, setLineChartData] = useState([]);

  const fetchData = async (file, setData) => {
    try {
      const data = await csv(file);
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${file}:`, error);
    }
  };

  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" }, // Responsive layout
        gap: 1,
        height: "100%",
      }}
    >
      <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
        <Card
          sx={{
            height: "50%",
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

      {/* Left side: Graphs */}
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // 1 column on small screens, 2 on larger
          gridTemplateRows: "repeat(3, auto)",
          gap: 1,
        }}
      >
        {/*Total Anonymous Messages*/}
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
              Total Anonymous Messages
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
              <TotalAnonymousMessagesNumberCard  groupId = {groupId}/>
            </Box>
          </CardContent>
        </Card>

        {/*Anonymous User Interaction*/}
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
              Anonymous User Interaction
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
              <AnonymousUserInteractionChart groupId = {groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Anonymous Feedback*/}
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
              Anonymous Feedback
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
              <AnonymousFeedbackChart groupId = {groupId}/>
            </Box>
          </CardContent>
        </Card>

        {/*Anonymous Post Trends*/}
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
              Anonymous Post Trends
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
              <AnonymousPostTrend groupId = {groupId}/>
            </Box>
          </CardContent>
        </Card>

        {/*Anonymous Polls/Surveys*/}
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
              <Typography variant="h6" gutterBottom>
                Anonymous Polls/Surveys
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
                <PollParticipationChart />
              </Box>
            </CardContent>
          </Card> */}

        {/*Impact of Anonymous Participation*/}
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
              Anonymous Participation
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
              <ImpactOfAnonymousParticipation groupId = {groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Member Trust via Anonymity*/}
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
              <Typography variant="h6" gutterBottom>
                Member Trust via Anonymity
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
                <MemberTrustHistogram />
              </Box>
            </CardContent>
          </Card> */}

        {/*Sentiment in Anonymous Messages*/}
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
              Message Sentiments
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
              <SentimentDoughnutChart groupId = {groupId}/>
            </Box>
          </CardContent>
        </Card>

        {/*Anonymous Discussions vs Identified Discussions*/}
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
              Discussion chart
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
              <DiscussionsChart groupId = {groupId}/>
            </Box>
          </CardContent>
        </Card>

        {/*Anonymous Engagement Trends*/}
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
              Anonymous Engagement Trend
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
              <AnonymousEngagementChart groupId = {groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Group Culture with Anonymity*/}
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
            <Typography variant="h6" gutterBottom>
              Anonymous Participation
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
              <GroupCultureChart groupId = {groupId}/>
            </Box>
          </CardContent>
        </Card> */}
      </Box>
    </Box>
  );
};

export default AnonymousAnalyticsGraph;
