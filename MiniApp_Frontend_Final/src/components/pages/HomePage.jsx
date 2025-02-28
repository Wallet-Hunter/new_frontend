import React, { useContext,useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import arcReactorVideo from "../../../src/assets/ArcReactor2.mp4"; // Adjust the path to your video file
import UserProfileHeader from "../UserProfileHeader";
import BubbleMap from "../BubbleChart"; // Placeholder for Bubble Map component
import WorldMap from "../WorldMap"; // Placeholder for World Map component
import UserNetwork from "../UserNetwork";
import SentimentMeter from "../SentimentMeter";
import SummaryPage from "../SummaryBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../App"; // For using login context
import "animate.css/animate.min.css"; // Import animate.css for animations
import "./HomePage.css"; // Import the CSS file for the gradient and orbs

const HomePage = ({ userName, userScore, userLevel }) => {
  const userData = useContext(UserContext);

  const [activeGroup, setActiveGroup] = useState(null); // State to track active group
  const [groupData, setGroupData] = useState(null); // State to store fetched group data
  const [activeGroupTitle, setActiveGroupTitle] = useState(null);


  const demoGroups = [
    
  ];

  // Fetch user-groups data from Backend
  const fetchGroups = async (userTelegramId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/getgroups?user_id=${userTelegramId}`,
        {
          method: "GET",
          // headers: {
          //   "ngrok-skip-browser-warning": "true"
          // }
        }
      );

      // Parse the JSON response
      const result = await response.json();
      const groups = result.groups;
      setGroupData(groups); // Update state with fetched data
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL)
      // Fetch user data from Telegram WebApp API (replace demo data with actual logic)
      if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        const telegramUser = webApp.initDataUnsafe?.user;

        if (telegramUser) {
          const userTelegramId = telegramUser.id;
          fetchGroups(userTelegramId);
        }
      } else {
        console.warn("Telegram WebApp is not available. Using demo data.");
      }
    }, []);

    useEffect(() => {
      if (groupData && groupData.length > 0) {
        setActiveGroup(groupData[0].group_id);
        setActiveGroupTitle(groupData[0].group_title);
      }
    }, [groupData]);

  // Handle group change
  const handleGroupChange = (groupId, groupTitle) => {
    console.log(`Group ID: ${groupId}`);
    setActiveGroup(groupId);
    setActiveGroupTitle(groupTitle);
  };

  // // Fetch data whenever activeGroup changes
  // useEffect(() => {
  //   if (activeGroup !== null) {
  //     fetchGroups();
  //   }
  // }, [activeGroup]);

  const styles = {
    homepageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      minHeight: "100vh",
      padding: "10px",
      boxSizing: "border-box",
      overflowY: "auto",
      position: "relative",
      overflowX: "hidden",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      padding: "20px",
      backgroundColor: "transparent",
      borderBottom: "2px solid #00FFFF",
      flexWrap: "wrap",
    },
    hexagonContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: "120px",
      height: "140px",
      margin: "10px",
    },
    hexagon: {
      width: "120px",
      height: "69px",
      backgroundColor: "rgba(0, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      position: "absolute",
      top: "60%",
      transform: "translateY(-50%)",
      clipPath:
        "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
    hexagonIcon: {
      position: "absolute",
      top: "10px",
      fontSize: "2rem",
      color: "#00FFFF",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      marginTop: "20px",
      flexGrow: 1,
    },
    buttonContainer: {
      margin: "20px 0",
      display: "flex",
      justifyContent: "flex-start", // Ensures starting buttons are visible
      gap: "10px",
      overflowX: "auto", // Enables horizontal scrolling
      whiteSpace: "nowrap", // Prevents buttons from wrapping
      paddingBottom: "10px", // Adds space for better scrolling visibility
    },
    
    button: {
      borderRadius: "20px",
      padding: "10px 20px",
      fontWeight: "bold",
      fontSize: "1rem",
      transition: "all 0.3s ease-in-out",
      color: "#54d5d9",
      "&:hover": {
        backgroundColor: "#00FFFF",
        color: "#000",
        transform: "scale(1.05)", // Scale up on hover
      },
    },
    activeButton: {
      backgroundColor: "#00FFFF",
      color: "#000",
    },
    section: {
      width: "90%",
      margin: "10px 0",
      padding: "10px",
      borderRadius: "10px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    },
    videoContainer: {
      width: "100px",
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      overflow: "hidden",
      marginBottom: "20px",
    },
    video: {
      width: "150%",
      height: "150%",
      objectFit: "cover",
    },
  };

  return (
    <Box
    sx={{
      height: "90vh",
      width: "90vw",
      overflowY: "auto",
      overflowX: "hidden",
      padding: "20px 5%",
      position: "fixed",
      scrollBehavior: "smooth",
    }}
      className="gradient-background" // Add the dynamic gradient background
    >

        {/* Background Orbs */}
        <div className="floating-orbs"></div>
        {/* Header Section */}
        <div style={styles.headerContainer}>
           <UserProfileHeader />
        </div>

        {/* Group Buttons */}
        <div style={styles.buttonContainer}>
        {groupData && groupData.length > 0 ? (
            groupData.map((group) => (
                <motion.button
                  key={group.group_id}
                  className={`group-button ${activeGroup === group.group_id ? 'active' : ''}`}
                  onClick={() => handleGroupChange(group.group_id, group.group_title)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {group.group_title}
                </motion.button>
              ))
            ) : (
              // Hardcoded fallback buttons
              demoGroups.map((demoGroup) => (
              <motion.button
                    key={demoGroup.id}
                    className={`group-button ${activeGroup === demoGroup.id ? 'active' : ''}`}
                    onClick={() => handleGroupChange(demoGroup.id, demoGroup.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                {demoGroup.name}
              </motion.button>
            ))
          )}
        </div>

        <div style={styles.mainContent}>
          {/* Bubble Map Section */}
          <motion.div
            style={styles.section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="section-title">Topics</h3>
            <BubbleMap group_id={activeGroup}/>
          </motion.div>

          {/* Sentiment Meter Section */}
          <motion.div
            style={styles.section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="section-title">Sentiment Meter</h3>
            <SentimentMeter group_id={activeGroup} />
          </motion.div>

          {/* Summary Box Section */}
          <motion.div
            style={styles.section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="section-title">Summary</h3>
            <SummaryPage group_name={activeGroupTitle}/>
          </motion.div>

          {/* World Map Section */}
          {/* <div style={styles.section}>
            <h3 className="section-title">Languages </h3>
            <div style={{ width: "100%", height: "500px" }}>
              <WorldMap group_id={activeGroup} style={{ width: "100%", height: "100%" }} />
            </div>
          </div> */}
        </div>
    </Box>
  );
};

export default HomePage;
