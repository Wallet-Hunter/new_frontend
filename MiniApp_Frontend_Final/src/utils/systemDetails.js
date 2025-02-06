import axios from "axios";

// Function to send collected data to the backend
export const sendSystemDetailsToBackend = async (userDetails) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/save-system-details`,
      userDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("User details saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving user details:", error);
  }
};

// Function to collect system details ONCE (including IP address)
export const collectSystemDetails = async () => {
  try {
    // Fetch the IP address only once
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const userIp = ipResponse.data.ip;

    const sessionDetails = {
      browserName: navigator.appName,
      browserVersion: navigator.appVersion,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      availableScreen: `${window.screen.availWidth}x${window.screen.availHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      ipAddress: userIp, // Store the fetched IP
    };

    return sessionDetails;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return null; // In case IP fetching fails
  }
};