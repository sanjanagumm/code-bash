// import React, { useEffect, useState } from "react";
// import "./alert2.css";

// function Alert2() {
//   const [flags, setFlags] = useState(0);
//   const [location, setLocation] = useState(""); // Store complete location string
//   const [numberOfCalls, setNumberOfCalls] = useState(0);
//   const [highestPriority, setHighestPriority] = useState(null);
//   const [incidentTypes, setIncidentTypes] = useState([]);

//   useEffect(() => {
//     const ws = new WebSocket("ws://192.168.54.24:8080");

//     ws.onmessage = (event) => {
//       const serverData = JSON.parse(event.data);
//       console.log("Received data from server:", serverData); // Debugging line

//       // Assuming serverData has the expected structure
//       if (serverData.type === "newFlag") {
//         const { location: loc, calls, priority, incidentType } = serverData;

//         // Increment flags count
//         setFlags((prevFlags) => prevFlags + 1);

//         // Update location
//         setLocation(loc); // Use the complete location string

//         // Update number of calls
//         setNumberOfCalls(calls);

//         // Update highest priority
//         setHighestPriority(priority);

//         // Update types of incidents
//         setIncidentTypes((prevTypes) => [...prevTypes, incidentType]); // Store incident types
//       }
//     };

//     return () => {
//       ws.close(); // Clean up WebSocket connection
//     };
//   }, []);

//   return (
//     <div className="alert2">
//       <div className="alert2-text">No. of Flags: {flags}</div>
//       {/* Display only the location string */}
//       <div className="alert2-text">{location}</div>
//     </div>
//   );
// }

// export default Alert2;


import React, { useEffect, useState } from "react";
import "./alert2.css";

function Alert2() {
  const [message, setMessage] = useState(""); // Store the entire WebSocket message

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.54.24:8080");

    ws.onmessage = (event) => {
      const serverData = event.data; // Capture the entire string sent by WebSocket
      console.log("Received data from server:", serverData); // Debugging line

      // Set the entire received message to the state
      setMessage(serverData);
    };

    return () => {
      ws.close(); // Clean up WebSocket connection
    };
  }, []);

  return (
    <div className="alert2">
      {/* Display the entire WebSocket message */}
      <div className="alert2-text">{message}</div>
    </div>
  );
}

export default Alert2;
