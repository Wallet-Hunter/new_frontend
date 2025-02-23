import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FaChevronDown, FaAngleRight } from "react-icons/fa";
// Import graph components
import MembersAnalytics from "../../communityGraphs/MembersAnalytics";
import EventsAnalyticsGraph from "../../communityGraphs/EventsAnalyticsGraph";
import BotAnalyticsGraph from "../../communityGraphs/BotAnalyticsGraph";
import EngagementAnalyticsGraph from "../../communityGraphs/EngagementAnalyticsGraph";
import MessageAnalyticsGraph from "../../communityGraphs/MessageAnalyticsGraph";
import AnonymousAnalyticsGraph from "../../communityGraphs/AnonymousAnalyticsGraph";
import "./AnalyticsPage.css";
const AnalyticsPage = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [openSections, setOpenSections] = useState(Array(6).fill(false));
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState(null); //holds fetched group details for the users telegramID
  const sectionRefs = useRef(
    Array(6)
      .fill()
      .map(() => React.createRef())
  );
  const [userTelegramId, setUserTelegramId] = useState(null);

  const items = [
    "Members",
    "Engagement",
    "Events",
    "Bots",
    "Messages",
    "Anonymous",
  ];

  // Hardcoded visibility (change these values to test)
  const [visibleSections, setVisibleSections] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  /*
  // Fetch visibility settings from backend (Commented out for now)
  const fetchSectionVisibility = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/getSectionVisibility?user_id=${userTelegramId}`);
      const result = await response.json();
      
      if (result.visibility && result.visibility.length === 6) {
        setVisibleSections(result.visibility); // Expecting [true, false, true, ...]
      }
    } catch (error) {
      console.error("Error fetching section visibility:", error.message);
    }
  };

  useEffect(() => {
    if (userTelegramId) {
      fetchSectionVisibility();
    }
  }, [userTelegramId]);
  */

  // Placeholder data for demo buttons (similar to HomePage)
  const demoGroups = [];

  // Fetch data from Backend
  const fetchGroups = async (userTelegramId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/getgroups?user_id=${userTelegramId}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const result = await response.json();
      console.log("Fetched groups:", result.groups); // Debugging log

      if (result.groups && result.groups.length > 0) {
        setGroups(result.groups); // Ensure groups are set correctly
      } else {
        setGroups([]); // Clear state if no groups
      }
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  useEffect(() => {
    if (groups && groups.length > 0) {
      setSelectedGroup(groups[0].group_id);
      console.log("Default selected group:", groups[0].group_id); // Debugging log
    }
  }, [groups]);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      const telegramUser = webApp.initDataUnsafe?.user;

      if (telegramUser) {
        const userTelegramId = telegramUser.id;
        setUserTelegramId(userTelegramId);
        fetchGroups(userTelegramId);
      }
    } else {
      console.warn("Telegram WebApp is not available. Using demo data.");
      setGroups(demoGroups); // Set demo data
    }
  }, []);

  const handleClick = (index) => {
    setClickedIndex(index);
    sectionRefs.current[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group.id); // Pass only the group_id (not the title)
    console.log(`Selected Group ID: ${group.id}`);
  };

  const renderGraph = (index) => {
    const graphProps = { groupId: selectedGroup }; // Pass selected group ID as a prop
    switch (index) {
      case 0:
        return <MembersAnalytics {...graphProps} />;
      case 1:
        return <EngagementAnalyticsGraph {...graphProps} />;

      case 2:
        return <EventsAnalyticsGraph {...graphProps} />;

      case 3:
        return <BotAnalyticsGraph {...graphProps} />;

      case 4:
        return <MessageAnalyticsGraph {...graphProps} />;
      case 5:
        return <AnonymousAnalyticsGraph {...graphProps} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
        width: "90vw",
        overflowY: "auto",
        backgroundColor: "black",
        padding: "20px 5%",
        position: "fixed",
      }}
      className="gradient-background"
    >
      <Typography variant="h4" fontWeight="bolder" gutterBottom color="#54d5d9">
        Community Analytics
      </Typography>

      {/* Group Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          overflowX: "auto", // Enables horizontal scrolling
          whiteSpace: "nowrap", // Prevents buttons from wrapping
          paddingBottom: "5px", // Adds padding for better spacing
          scrollbarWidth: "thin", // Adjusts scrollbar width (Firefox)
          "&::-webkit-scrollbar": {
            height: "6px", // Adjust scrollbar height (Chrome, Edge, Safari)
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#54d5d9", // Custom scrollbar color
            borderRadius: "3px",
          },
        }}
      >
        {(groups && groups.length > 0
          ? groups.map((group) => ({
              id: group.group_id,
              name: group.group_title,
            }))
          : demoGroups
        ).map((group) => (
          <Button
            key={group.id}
            onClick={() => handleGroupClick(group)}
            sx={{
              backgroundColor:
                selectedGroup === group.id ? "#54d5d9" : "#424242",
              color: "#E0E0E0",
              padding: "10px 16px",
              borderRadius: "8px",
              textTransform: "capitalize",
              minWidth: "fit-content", // Adjusts to content size
              maxWidth: "100%", // Prevents excessive stretching
              height: "auto",
              fontSize: "1rem",
              whiteSpace: "normal", // Allows wrapping for long text
              overflow: "visible", // Ensures text isn't hidden
              textOverflow: "clip", // Prevents cutting off text
              display: "inline-flex", // Ensures proper sizing with flex behavior
              alignItems: "center", // Keeps text centered
              "&:hover": {
                backgroundColor: "#54d5d9",
                color: "#FFFFFF",
              },
            }}
          >
            {group.name}
          </Button>
        ))}
      </Box>

      {/* Divider Line */}
      <Box
        sx={{
          height: "2px",
          width: "100%",
          backgroundColor: "#54d5d9",
          marginBottom: "20px",
        }}
      />

      {/* Sections */}
      <Box display="flex" flexDirection="column" marginTop="20px">
      {items.map((item, index) => 
          visibleSections[index] && ( 
          <Box
            key={index}
            marginBottom="15px"
            ref={sectionRefs.current[index]}
            sx={{
              transition: "height 0.5s ease",
              overflow: "hidden",
              height: openSections[index] ? "auto" : "100px",
            }}
          >
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => toggleSection(index)}
                sx={{
                  backgroundColor: "#424242",
                  color: "#E0E0E0",
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                  minHeight: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#616161",
                  },
                }}
              >
                {openSections[index] ? (
                  <FaChevronDown size={20} />
                ) : (
                  <FaAngleRight size={20} />
                )}
              </Button>

              <Typography
                variant="h4"
                onClick={() => handleClick(index)}
                sx={{
                  color: clickedIndex === index ? "#FFFFFF" : "#E0E0E0",
                  fontWeight: "bolder",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#FFFFFF",
                  },
                }}
              >
                {item}
              </Typography>
            </Box>

            {openSections[index] && (
              <Box
                sx={{
                  backgroundColor: "#000000",
                  padding: "10px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  color: "#FFFFFF",
                }}
              >
                {renderGraph(index)}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnalyticsPage;



