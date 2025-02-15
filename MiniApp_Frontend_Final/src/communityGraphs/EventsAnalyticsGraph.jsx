import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { csv } from "d3-fetch";

import FollowupEngagementChart from "./cmscharts/EventAnalytics/FollowupEngagementChart"; // Events Created
import EventPopularityChart from "./cmscharts/EventAnalytics/EventPopularityChart"; // Promotion
import EventTimingChart from "./cmscharts/EventAnalytics/EventTimingChart";
import Leaderboard from "./cmscharts/EventAnalytics/LeaderBoard"; // Top Organizers
import EventFeedbackChart from "./cmscharts/EventAnalytics/EventFeedbackChart";
import NumberCard from "./cmscharts/EventAnalytics/NumberCard";
import EventParticipationChart from "./cmscharts/EventAnalytics/EventParticipationChart";
import EventTypeBreakdownChart from "./cmscharts/EventAnalytics/EventTypeBreakdownChart";
import EventImpactChart from "./cmscharts/EventAnalytics/EventImpactChart";
import EventConversionRatesChart from "./cmscharts/EventAnalytics/EventConversionRatesChart";
import EventEngagementChart from "./cmscharts/EventAnalytics/EventEngagementChart";
import EventContentPerformance from "./cmscharts/EventAnalytics/EventContentPerformance";

//import { color } from "d3";

const EventAnalyticsGraph = ({ groupId }) => {
  //const isSmallScreen = useMediaQuery("(max-width: 900px)"); // Detect small screens

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" }, // Responsive layout
        gap: 1,
        height: "100%",
      }}
    >
      {/* Right Side - Leaderboard */}
      {/*Top Contributors in Events*/}
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
            <Leaderboard groupId={groupId} />
          </CardContent>
        </Card>
      </Box>
      {/* Left Side - Charts */}

      {/* Grid for Other Charts */}
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
            height: "200px",
            transition: "box-shadow 0.3s",
            "&:hover": { boxShadow: "0px 4px 20px #54d5d9" },
            backgroundColor: "#171717",
            padding: 2,
          }}
        >
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Total Events</Typography>
            <Box
              sx={{
                height: "160px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NumberCard groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/*Event Participation*/}
        {/* <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Participation</Typography>
            <Box sx={chartBoxStyles}>
              <EventParticipationChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card> */}

        {/* Event Attendance Trends
          <Card sx={{ ...chartCardStyles }}>
            <CardContent sx={{ ...CardContentStyles }}>
              <Typography variant="h6">Event Attendance Trends</Typography>
              <Box sx={chartBoxStyles}>
                <EventAttendanceChart data={lineChartData} />
              </Box>
            </CardContent>
          </Card> */}

        {/*Event Engagement*/}
        {/* <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Engagement</Typography>
            <Box sx={chartBoxStyles}>
              <EventEngagementChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card> */}

        {/*Event Timing*/}
        {/* <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Timing</Typography>
            <Box sx={chartBoxStyles}>
              <EventTimingChart groupId = {groupId} />
            </Box>
          </CardContent>
        </Card> */}

        {/*Event Popularity*/}
         <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Events Popularity</Typography>
            <Box sx={chartBoxStyles}>
              <EventPopularityChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card> 

        {/*Event Type Breakdown*/}
        <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Type</Typography>
            <Box sx={chartBoxStyles}>
              <EventTypeBreakdownChart />
            </Box>
          </CardContent>
        </Card>

        {/*Event Conversion Rates*/}
        {/* <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Conversion</Typography>
            <Box sx={chartBoxStyles}>
              <EventConversionRatesChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card> */}

        {/* Event Feedback*/}
        {/* <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Feedback</Typography>
            <Box sx={chartBoxStyles}>
              <EventFeedbackChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card> */}

        {/*Event Impact on Growth*/}
        <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Impact on Growth</Typography>
            <Box sx={chartBoxStyles}>
              <EventImpactChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card>

        {/* Engagement per Event
          <Card sx={{ ...chartCardStyles }}>
            <CardContent sx={{ ...CardContentStyles }}>
              <Typography variant="h6">Engagement per Event</Typography>
              <Box sx={chartBoxStyles}>
                <EventEngagementBar
                  labels={["Event 1", "Event 2", "Event 3"]}
                  data={[100, 200, 150]}
                />
              </Box>
            </CardContent>
          </Card> */}

        {/*Event Content Performance*/}
        {/* <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Event Content Performance</Typography>
            <Box sx={{ ...chartBoxStyles }}>
              <EventContentPerformance groupId={groupId} />
            </Box>
          </CardContent>
        </Card> */}

        {/* Event Promotions
          <Card sx={{ ...chartCardStyles }}>
            <CardContent sx={{ ...CardContentStyles }}>
              <Typography variant="h6">Event Promotions</Typography>
              <Box sx={{ ...chartBoxStyles }}>
                <EventPromotionsChart
                  promotionData={[
                    { postsMade: 10, attendanceCount: 50 },
                    { postsMade: 20, attendanceCount: 120 },
                    { postsMade: 30, attendanceCount: 200 },
                  ]}
                />
              </Box>
            </CardContent>
          </Card> */}

        {/*Follow-up Engagement*/}

        {/* <Card sx={{ ...chartCardStyles }}>
          <CardContent sx={{ ...CardContentStyles }}>
            <Typography variant="h6">Follow-up Engagement</Typography>
            <Box sx={{ ...chartBoxStyles }}>
              <FollowupEngagementChart groupId={groupId} />
            </Box>
          </CardContent>
        </Card> */}
      </Box>
    </Box>
  );
};

// Styles for Cards and Chart Boxes
const chartCardStyles = {
  padding: 2,
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#171717",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
};

const chartBoxStyles = {
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "90%",
};

const CardContentStyles = {
  textAlign: "center",
  padding: "8px",
  width: "100%",
  height: "100%",
  color: "white",
};

export default EventAnalyticsGraph;
