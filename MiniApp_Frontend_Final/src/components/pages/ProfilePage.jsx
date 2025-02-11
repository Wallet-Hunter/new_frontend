import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./ProfilePage.css";

const ProfilePage = ({ userScore }) => {
  const [user, setUser] = useState({
    username: "demo_user",
    photo_url: "https://via.placeholder.com/150",
    id: "123456789",
    first_name: "Demo",
    last_name: "User",
    level: 1,
    points: userScore,
  });

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      const telegramUser = webApp.initDataUnsafe?.user;

      if (telegramUser) {
        setUser({
          username: telegramUser.username || "N/A",
          photo_url:
            telegramUser.photo_url || "https://via.placeholder.com/150",
          id: telegramUser.id,
          first_name: telegramUser.first_name || "N/A",
          last_name: telegramUser.last_name || "N/A",
          level: telegramUser.level || 1,
          points: userScore || 100,
        });
      }
    } else {
      console.warn("Telegram WebApp is not available. Using demo data.");
    }
  }, []);

  const openTelegramWallet = () => {
    window.open('https://t.me/MyTonWalletBot?start=connect_wallet', '_blank');
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
      <div style={styles.profileContainer} className="gradient-background">
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <img
              style={styles.profilePic}
              src={user.photo_url}
              alt="Profile Picture"
            />
            <div style={styles.profileDetails}>
              <h2 style={styles.profileUsername}>@{user.username}</h2>
              <p style={styles.profileName}>{user.first_name} {user.last_name}</p>
              <p style={styles.profileId}>ID: {user.id}</p>
            </div>
          </div>
          <div style={styles.profileStats}>
            <div style={styles.profileStat}>
              <span style={styles.profileStatLabel}>Level:</span>
              <span style={styles.profileStatValue}>{user.level}</span>
            </div>
            <div style={styles.profileStat}>
              <span style={styles.profileStatLabel}>Points:</span>
              <span style={styles.profileStatValue}>{user.points}</span>
            </div>
          </div>
        </div>
        <div style={styles.connectWalletContainer}>
  <h3 style={styles.walletHeading}>Connect your TON wallet for future rewards</h3>
  <p style={styles.walletSubheading}>Tap to open wallet in Telegram</p>
  <button
    style={styles.walletButton}
    onClick={openTelegramWallet}
    onMouseEnter={(e) => {
      e.target.style.transform = "scale(1.05)"; // Apply the hover scaling
      e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)"; // Apply the hover shadow
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = "scale(1)"; // Reset scaling
      e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)"; // Reset shadow
    }}
  >
    Connect Wallet
  </button>
</div>

      </div>
    </Box>
  );
};

const styles = {
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  profileCard: {
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(15px)",
    borderRadius: "15px",
    padding: "30px",
    width: "400px",
    color: "#fff",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "20px", // Adjust gap for spacing
    flexDirection: "row", // Ensure the profile pic and details are in a row
  },
  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "4px solid #54d5d9",
    marginLeft: "15px", // Added margin to move the profile pic to the right
  },
  profileDetails: {
    textAlign: "left",
  },
  profileUsername: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#fff",
    margin: "5px 0",
  },
  profileName: {
    fontSize: "18px",
    color: "#ccc",
    margin: "2px 0",
  },
  profileId: {
    fontSize: "16px",
    color: "#aaa",
    margin: "2px 0",
  },
  profileStats: {
    display: "flex",
    justifyContent: "center",
    gap: "10px", // Space between level and points
    marginTop: "15px",
  },
  profileStat: {
    fontFamily: "'Audiowide', serif",
    backgroundColor: "#54d5d9",
    borderRadius: "20px",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
  },
  profileStatLabel: {
    fontFamily: "'Audiowide', serif", 
    fontSize: "16px",
    color: "#fff",
    marginRight: "5px",
    fontWeight: "bold",
  },
  profileStatValue: {
    fontSize: "18px",
    color: "#fff",
  },
  connectWalletContainer: {
    textAlign: "center",
    marginTop: "15px",
  },
  walletHeading: {
    fontSize: "20px",
    color: "#fff",
  },
  walletSubheading: {
    fontSize: "16px",
    color: "#ccc",
  },


  walletButton: {
    background: "linear-gradient(90deg, #54d5d9, #3e8e8e)", // Gradient background
    color: "#fff",
    padding: "15px 30px", // Increased padding for a bigger button
    fontSize: "18px", // Slightly bigger font
    borderRadius: "12px", // Rounded corners
    cursor: "pointer",
    border: "none", // Remove border for smooth appearance
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
    fontWeight: "bold", // Make text bold
  },

  walletButtonHover: {
    transform: "scale(1.05)", // Slightly grow the button on hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
  },

};

export default ProfilePage;
