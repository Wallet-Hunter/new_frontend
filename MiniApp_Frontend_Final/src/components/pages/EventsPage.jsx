import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "./EventsPage.css";

const EventsPage = () => {
  const [view, setView] = useState("upcoming"); // Toggle between Upcoming and Past
  const [menuOpen, setMenuOpen] = useState(null); // Track which event's menu is open
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Conference 2025",
      date: "2025-03-20",
      time: "10:00",
      description: "A conference about the latest advancements in tech.",
      photo: "https://via.placeholder.com/300",
      isPast: false,
    },
    {
      id: 2,
      name: "AI & ML Workshop",
      date: "2025-02-25",
      time: "14:00",
      description: "Hands-on workshop on AI and machine learning.",
      photo: "https://via.placeholder.com/300",
      isPast: false,
    },
    {
      id: 3,
      name: "Music Festival",
      date: "2024-12-15",
      time: "18:00",
      description: "Live music performances from various artists.",
      photo: "https://via.placeholder.com/300",
      isPast: false,
    },
    {
      id: 4,
      name: "Hackathon 2025",
      date: "2025-04-05",
      time: "09:00",
      description: "A 24-hour coding challenge for developers.",
      photo: "https://via.placeholder.com/300",
      isPast: false,
    },
    {
      id: 5,
      name: "Startup Networking",
      date: "2024-11-30",
      time: "17:00",
      description: "Meet and connect with startup founders and investors.",
      photo: "https://via.placeholder.com/300",
      isPast: false,
    },
  ]);

  useEffect(() => {
    // Automatically move expired events to "Past"
    const interval = setInterval(() => {
      const now = new Date();
      setEvents((prevEvents) =>
        prevEvents.map((event) => ({
          ...event,
          isPast: new Date(`${event.date}T${event.time}`) < now,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    setMenuOpen(null); // Close menu after deleting
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };
  const styles = {
    page: {
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      backgroundColor: "#000",
      color: "#fff",
      minHeight: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      width: "100%",
      maxWidth: "1200px",
      marginBottom: "20px",
    },

    toggleButtons: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "10px",
    },

    button: {
      padding: "10px 20px",
      margin: "0 5px",
      border: "none",
      borderRadius: "25px",
      backgroundColor: "#1f1f1f",
      color: "#fff",
      cursor: "pointer",
      flexGrow: 1,
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
      transition: "background-color 0.3s ease",
    },

    activeButton: {
      backgroundColor: "#54d5d9",
      color: "#fff",
    },

    list: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      justifyContent: "center",
      width: "100%",
      maxWidth: "1200px",
    },

    card: {
      border: "1px solid #444",
      borderRadius: "15px",
      padding: "15px",
      backgroundColor: "#1c1c1c",
      width: "100%",
      maxWidth: "300px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)",
      position: "relative",
      marginBottom: "20px",
    },

    image: {
      maxWidth: "100%",
      borderRadius: "10px",
      height: "200px",
      objectFit: "cover",
    },

    defaultImage: {
      maxWidth: "100%",
      height: "150px",
      borderRadius: "10px",
      objectFit: "cover",
      backgroundColor: "#333",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#888",
    },

    menuIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
      fontSize: "20px",
      color: "#fff",
      background: "none",
      border: "none",
    },

    menuDropdown: {
      position: "absolute",
      top: "35px",
      right: "10px",
      backgroundColor: "#1c1c1c",
      border: "1px solid #444",
      borderRadius: "10px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)",
      zIndex: 100,
      width: "120px",
    },

    dropdownItem: {
      padding: "10px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      backgroundColor: "#1c1c1c",
      borderBottom: "1px solid #444",
    },
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
      <div className="gradient-background" style={{ fontFamily: "'Poppins', sans-serif", padding: "20px", color: "#fff", textAlign: "center" }}>
        <header>
          <h1>Events</h1>
          <div>
            <button
              style={{
                padding: "10px 20px",
                margin: "5px",
                borderRadius: "25px",
                backgroundColor: view === "upcoming" ? "#54d5d9" : "#1f1f1f",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => setView("upcoming")}
            >
              Upcoming
            </button>
            <button
              style={{
                padding: "10px 20px",
                margin: "5px",
                borderRadius: "25px",
                backgroundColor: view === "past" ? "#54d5d9" : "#1f1f1f",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => setView("past")}
            >
              Past
            </button>
          </div>
        </header>

        <main>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
            {events
              .filter((event) => (view === "upcoming" ? !event.isPast : event.isPast))
              .map((event) => (
                <div key={event.id} style={{ border: "1px solid #444", borderRadius: "15px", padding: "15px", backgroundColor: "#1c1c1c", maxWidth: "300px", position: "relative", textAlign: "left" }}>
                  {event.photo ? (
                    <img src={event.photo} alt={event.name} style={{ maxWidth: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ maxWidth: "100%", height: "150px", borderRadius: "10px", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
                      No Image
                    </div>
                  )}
                  <h3>{event.name}</h3>
                  <p>{event.date}</p>
                  <p>{event.time}</p>
                  <p>{event.description}</p>
                  <button style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", fontSize: "20px", background: "none", border: "none", color: "#fff" }} onClick={() => toggleMenu(event.id)}>
                    ☰
                  </button>
                  {menuOpen === event.id && (
                    <div style={{ position: "absolute", top: "35px", right: "10px", backgroundColor: "#1c1c1c", border: "1px solid #444", borderRadius: "10px", padding: "10px", zIndex: 100 }}>
                      <div style={{ cursor: "pointer", padding: "5px", color: "#fff" }} onClick={() => handleDeleteEvent(event.id)}>
                        Delete
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </main>
      </div>
    </Box>
  );
};

export default EventsPage;
