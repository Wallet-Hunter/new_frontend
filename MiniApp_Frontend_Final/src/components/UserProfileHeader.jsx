import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import level from "../assets/level.gif";
import pts from "../assets/points.gif";

const UserProfileHeader = () => {
  const [userData, setUserData] = useState({
    username: "UserName ",
    avatar: "https://via.placeholder.com/50",
  });
  const [points, setPoints] = useState(1000);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const { username, photo_url } =
        window.Telegram.WebApp.initDataUnsafe.user || {};
      setUserData({
        username: username || "User Name ",
        avatar: photo_url || "https://via.placeholder.com/50",
      });
    }
  }, []);

  // const handleIncreasePoints = () => {
  //   setPoints((prevPoints) => prevPoints + 100); // Increase points by 100
  //   setShowConfetti(true); // Trigger confetti
  //   setTimeout(() => setShowConfetti(false), 3000); // Stop confetti after 3 seconds
  // };

  return (
    <div className="user-profile-header">
      {showConfetti && <Confetti numberOfPieces={1000} />}
      {/* Avatar Section */}
      <div className="avatar-container">
        <img
          src={userData.avatar}
          alt={`${userData.username}'s Avatar`}
          className="user-avatar"
        />
      </div>

      {/* User Info Section */}
      <div className="user-info">
        <h1 className="username">
          <span>{userData.username.split(" ")[0]}</span>
          <span>{userData.username.split(" ")[1] || ""}</span>
        </h1>
        <div className="user-stats">
          <div className="level-container">
            <div className="logo-animation">
              <img src={level} alt="Level Logo" className="level-logo" />
            </div>
            <span className="level-badge">LVL.1</span>
          </div>
          <div className="level-container">
            <div className="logo-animation">
              <img src={pts} alt="Points Logo" className="level-logo" />
            </div>
            <span className="level-badge">Points: {points}</span>
          </div>
        </div>
        {/* <button className="increase-points-btn" onClick={handleIncreasePoints}>
          Increase Points
        </button> */}
      </div>
      {/* Embedded CSS */}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Audiowide&family=Press+Start+2P&display=swap');
      </style>
      <style>
        {`
          .user-profile-header {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Move slightly left */
  padding: 1rem;
  background-color: transparent;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  margin-left: -20px; /* Move slightly left */
  gap: 1rem;
  overflow: hidden;
  box-sizing: border-box;
}


          .avatar-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .user-avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 2px solid #54d5d9;
          }

          .user-info {
            flex-grow: 1;
          }

          .username {
            font-family: "Audiowide", serif;
            font-weight: 600;
            font-size: 1.5rem;
            margin: 0;
            color: #54d5d9;
            animation: fadeInUp 1s ease-in-out;
          }

          .user-stats {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-top: 0.5rem;
          }

          .level-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .level-badge {
          font-family: "Audiowide", serif;
            background-color: #54d5d9;
            color: black;
            font-size: 0.8rem;
            font-weight: bold;
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
            animation: fadeInUp 1.2s ease-in-out;
          }

          .logo-animation {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .level-logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          .increase-points-btn {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #54d5d9;
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            animation: fadeInUp 1.5s ease-in-out;
          }

          .increase-points-btn:hover {
            background-color: #3bb2b5;
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserProfileHeader;
