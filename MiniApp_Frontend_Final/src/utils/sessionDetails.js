import axios from "axios";

// Function to send collected data to the backend
export const sendSessionDetailsToBackend = async (sessionDetails) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/save-session-details`,
      sessionDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Session details saved successfully:", response.data);
  } catch (error) {
    console.error("Error sending session details:", error);
  }
};
