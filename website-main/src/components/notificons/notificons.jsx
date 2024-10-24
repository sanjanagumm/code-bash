// import React from "react";
// import "./notificons.css";
// import AmbulanceIcon from "@mui/icons-material/LocalHospital"; // You can replace these with actual images if preferred
// import FirefighterIcon from "@mui/icons-material/FireExtinguisher";
// import PoliceIcon from "@mui/icons-material/Badge";

// const NotificationIcons = () => {
//   return (
//     <div className="notification-icons">
//       <div className="icon-container">
//         <AmbulanceIcon className="icon" style={{ color: "black" }} />
//         <div className="label">Ambulance</div>
//       </div>
//       <div className="icon-container">
//         <FirefighterIcon className="icon" style={{ color: "black" }} />
//         <div className="label">Firefighter</div>
//       </div>
//       <div className="icon-container">
//         <PoliceIcon className="icon" style={{ color: "black" }} />
//         <div className="label">Police</div>
//       </div>
//     </div>
//   );
// };

// export default NotificationIcons;


import React from "react";
import "./notificons.css";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FireExtinguisherIcon from "@mui/icons-material/FireExtinguisher";
import BadgeIcon from "@mui/icons-material/Badge";

const NotificationIcons = () => {
  return (
    <div className="notification-icons">
      <div className="icon-container">
        <LocalHospitalIcon
          className="icon"
          style={{ color: "black", fontSize: 50 }}
        />
        <div className="label">Ambulance</div>
      </div>
      <div className="icon-container">
        <FireExtinguisherIcon
          className="icon"
          style={{ color: "black", fontSize: 50 }}
        />
        <div className="label">Firefighter</div>
      </div>
      <div className="icon-container">
        <BadgeIcon className="icon" style={{ color: "black", fontSize: 50 }} />
        <div className="label">Police</div>
      </div>
    </div>
  );
};

export default NotificationIcons;