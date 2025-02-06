import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers,FaUserCircle, FaWallet, FaCog, FaCalendarAlt,FaPoll  } from "react-icons/fa";
import "./BottomNavBar.css";

const BottomNavBar = () => {
  const [activePage, setActivePage] = useState("Home");

  const navItems = [
    { name: "Home", icon: <FaHome />, path: "/home" },
    { name: "Analytics", icon: <FaPoll />, path: "/group" },
    //{ name: "Events", icon: <FaCalendarAlt />, path: "/events" },
    //{ name: "Wallet", icon: <FaWallet />, path: "/wallet" },
    { name: "Profile", icon: <FaUserCircle />, path: "/profile" },
  ];

  return (
    
    <div className="app-container">
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${activePage === item.name ? "active" : ""}`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavBar;
