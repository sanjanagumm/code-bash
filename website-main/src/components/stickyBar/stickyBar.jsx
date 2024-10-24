import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import "./stickyBar.css";

function StickyBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (page) => {
    if (page === "Dashboard") {
      navigate("/"); // Navigate to Dashboard
    } else if (page === "Alerts") {
      navigate("/alerts"); // Navigate to Alerts
    }
  };

  return (
    <div id="sticky">
      <button
        className={`btnDash ${location.pathname === "/" ? "active" : ""}`} // Active class based on route
        onClick={() => handleNavigation("Dashboard")}
      >
        Dashboard
      </button>
      <button
        className={`btnDash ${location.pathname === "/alerts" ? "active" : ""}`} // Active class based on route
        onClick={() => handleNavigation("Alerts")}
      >
        Alerts
      </button>
    </div>
  );
}

export default StickyBar;
