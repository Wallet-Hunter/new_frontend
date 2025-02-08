import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import MessageReachChart from "./cmscharts/Message/MessageReachChart";
import MessageTimingChart from "./cmscharts/Message/MessageTimingChart";
import Leaderboard from "./cmscharts/Message/LeaderBoard";
import MessagePerformanceChart from "./cmscharts/Message/MessagePerformanceChart";
import MessageEngagementRateChart from "./cmscharts/Message/MessageEngagementChart";
import MessageThreadsChart from "./cmscharts/Message/MessageThreadsChart";
import MessageRepliesChart from "./cmscharts/Message/MessageRepliesChart";
import MessageSentimentChart from "./cmscharts/Message/MessageSentimentChart";
import MessageQualityChart from "./cmscharts/Message/MessageQualityChart";
import SpamDetectionChart from "./cmscharts/Message/SpamDetectionChart";
import MessageFrequencyChart from "./cmscharts/Message/MessageFrequencyChart";
import MostActiveUsersChart from "./cmscharts/Message/MostActiveUsersChart";
import MessageTypeChart from "./cmscharts/Message/MessageTypeChart";
import TotalMessagesCard from "./cmscharts/Message/TotalMessagesCard";

const MessageAnalyticsGraph = ({
  lineChartCsvFile,
  heatMapCsvFile,
  groupId,
}) => {
  const [lineChartData, setLineChartData] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);
  //const isSmallScreen = useMediaQuery("(max-width: 900px)"); // Check if the screen size is small

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
      {/* Right side for leaderboard */}
      <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
        <Card
          sx={{
            height: "50%",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            backgroundColor: "#171717",
            paddingRight: 2,
          }}
        >
          <CardContent sx={{ padding: 0, paddingTop: 2 }}>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
      {/* Left side for graphs */}
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // 1 column on small screens, 2 on larger
          gridTemplateRows: "repeat(3, auto)",
          gap: 1,
        }}
      >
        {/* Graphs in a 3x2 grid */}

        {/*  Total Messages */}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Messages sent
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
              <TotalMessagesCard groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Frequency*/}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Frequency
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
              <MessageFrequencyChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Most Active Users*/}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Most Active Users
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
              <MostActiveUsersChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Timing*/}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "90%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Hourly Messages
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
              <MessageTimingChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Types of Messages*/}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Type
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
              <MessageTypeChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Threads*/}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "90%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Threads
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
              <MessageThreadsChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Replies*/}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Replies
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
              <MessageRepliesChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Sentiment*/}
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
              color: "white",
              textAlign: "center",
              padding: "8px",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Sentiment
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
              <MessageSentimentChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Reach*/}
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
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Reach
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
              <MessageReachChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/* Message Quality*/}
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
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Quality
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
              <MessageQualityChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Spam Detection*/}
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
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Spam Detection
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
              <SpamDetectionChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Engagement Rate*/}
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
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Engagement Rate
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
              <MessageEngagementRateChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Performance*/}
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
              height: "100%",
              color: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Message Performance
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
              <MessagePerformanceChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Message Growth*/}
        {/* <Card
             sx={{
              backgroundColor:"#171717",
              padding:2,
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
                color:"white"
              }}
            >
              <Typography variant="h6" gutterBottom>
                Message Growth
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
                <MessageGrowthChart />
              </Box>
            </CardContent>
          </Card> */}
      </Box>
    </Box>
  );
};

export default MessageAnalyticsGraph;
