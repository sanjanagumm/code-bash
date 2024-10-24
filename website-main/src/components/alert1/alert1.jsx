import React, { useEffect, useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import "./alert1.css";

function Alert1() {
  const [visible, setVisible] = useState(true);
  const [priority, setPriority] = useState(null); // Priority from the backend

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.54.24:8080");

    ws.onmessage = (event) => {
      const serverData = JSON.parse(event.data);

      // Assuming priority is sent in the backend data
      if (serverData.type === "incidentUpdate") {
        setPriority(serverData.priority);
      }
    };

    return () => {
      ws.close(); // Clean up WebSocket connection
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev); // Blink effect
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`alert1 ${visible ? "visible" : "hidden"}`}>
      <div className="alert1-icon-div">
        <WarningIcon className="alert1-icon" fontSize="large" />
      </div>
      <div className="alert1-text">
        {priority <= 8
          ? "Alert!"
          : priority === 9
          ? "Alert!"
          : priority === 10
          ? "Alert!"
          : "No Priority Set"}
      </div>
    </div>
  );
}

export default Alert1;
