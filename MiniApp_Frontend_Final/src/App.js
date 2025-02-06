import React, { useEffect, useState, createContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import Home from "./components/pages/HomePage";
import AnalyticsPage from "./components/pages/AnalyticsPage";

import WalletPage from "./components/pages/WalletPage";
import EventsPage from "./components/pages/EventsPage";
import ProfilePage from "./components/pages/ProfilePage";

import axios from "axios";
import {
  collectSystemDetails,
  sendSystemDetailsToBackend,
} from "./utils/systemDetails";
import { sendSessionDetailsToBackend } from "./utils/sessionDetails";
import { v4 as uuidv4 } from "uuid";

export const UserContext = createContext(null);
const App = () => {
  const userLevel = 1;
  const userScore = 1000;

  const [userData, setUserData] = useState(null);
  const [userTelegramId, setUserTelegramId] = useState(null);
  const [startTime] = useState(new Date().getTime());
  const [sessionId] = useState(uuidv4());
  const [clicks, setClicks] = useState([]); // Array of all clicks made
  const intervalRef = useRef(null);
  const [userName, setUserName] = useState(null);

  //sends uesr details to backend for verification upon mini app load-up also sets userData, userTelegramId
  useEffect(() => {
    // Track clicks
    // const handleClick = (event) => {
    //   const newClick = { x: event.clientX, y: event.clientY };
    //   setClicks((prevClicks) => [...prevClicks, newClick]);
    // };
    // document.addEventListener("click", handleClick);
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      const initDataUnsafe = tg.initDataUnsafe; // Access user data securely injected by Telegram
      const initData = tg.initData; // encoded auth data
      // Send auth_data to backend for verification
      console.log(initData);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/verify-telegram-auth`,
          { auth_data: initData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("jwtToken", token); // Save JWT for future API calls
          console.log("User authenticated successfully");
        })
        .catch((error) => {
          console.error(
            "Authentication failed:",
            error.response?.data || error.message
          );
        });

      // Check if initDataUnsafe and initDataUnsafe.user exist
      if (initDataUnsafe && initDataUnsafe.user) {
        setUserData(initDataUnsafe.user);
        setUserName(initDataUnsafe.user.first_name);
      } else {
        console.error(
          "User data not available. Ensure you're testing via Telegram."
        );
      }
    } else {
      console.error("Telegram WebApp API not available.");
    }
  }, []);

  //send system details to backend
  useEffect(() => {
    const handleSessionDetails = async () => {
      if (userData && userData.id) {
        try {
          // Collect system details
          const systemDetails = await collectSystemDetails();
          if (systemDetails) {
            await sendSystemDetailsToBackend(systemDetails);
          }
        } catch (error) {
          console.log("Error Sending System details to backend:", error);
        }
      }
    };

    // Only call the function when userData is updated and not null
    if (userData && userData.id) {
      handleSessionDetails();
      const telegramID = userData.id;
      setUserTelegramId(telegramID); // Set the Telegram ID if available
    }
  }, [userData]); // Dependency on userData, will run when userData changes

  //sends session detail to the backend after every 5 secs
  useEffect(() => {
    // Set up interval for sending data every 5 seconds
    const sendSessDetailsToBackend = async () => {
      if (userTelegramId !== null) {
        // Only proceed if userTelegramId is not null
        const end = new Date().getTime();
        const timeSpent = Math.floor(end - startTime);

        const sessionDetails = {
          sessionId,
          userTelegramId,
          clickData: clicks,
          timeSpent,
        };

        try {
          await sendSessionDetailsToBackend(sessionDetails); // Send session details
        } catch (error) {
          console.error("Error sending session details:", error);
        }
      } else {
        console.log("userTelegramId is null, skipping session details send.");
      }
    };
    intervalRef.current = setInterval(sendSessDetailsToBackend, 5000); // Set the interval and store it in the ref

    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, [userTelegramId, clicks]);

  return (
    <UserContext.Provider value={userData}>
      <Router>
        <div style={{ paddingBottom: "60px" }}>
          {" "}
          {/* Adjust padding to avoid overlap with BottomNavBar */}
          <Routes>
            {/* Redirect from the root URL to /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <Home
                  userName={userName}
                  userLevel={userLevel}
                  userScore={userScore}
                />
              }
            />
            <Route path="/group" element={<AnalyticsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route
              path="/profile"
              element={<ProfilePage userScore={userScore} />}
            />
          </Routes>
          <BottomNavBar />
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
