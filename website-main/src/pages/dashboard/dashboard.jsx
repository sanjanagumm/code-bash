// import React from "react";
// import Navbar from "./../../components/Navbar/Navbar";
// import "./../../components/Navbar/Navbar.css";
// import Card from "./../../components/Card/Card";
// import StickyBar from "./../../components/stickyBar/stickyBar";
// import RingVolumeIcon from "@mui/icons-material/RingVolume";
// import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import CarCrashIcon from "@mui/icons-material/CarCrash";
// import "./../../main.css";
// import DynamicGraph from "./../../components/graph/graph";
// import CircularGraph from "./../../components/CircGraph/circgraph";

// function dashboard() {
//   return (
//     <div className="app-container">
//       <Navbar />
//       <div className="main-content">
//         <StickyBar />
//         <div className="dashboard-container">
//           <div className="card-container">
//             <Card
//               icon={<RingVolumeIcon sx={{ fontSize: 50 }} />}
//               color="orange"
//               txt="Total calls"
//               num="100"
//             />
//             <Card
//               icon={<LocalFireDepartmentIcon sx={{ fontSize: 50 }} />}
//               color="yellow"
//               txt="Fire calls"
//               num="60"
//             />
//             <Card
//               icon={<LocalHospitalIcon sx={{ fontSize: 50 }} />}
//               color="green"
//               txt="Medical calls"
//               num="20"
//             />
//             <Card
//               icon={<CarCrashIcon sx={{ fontSize: 50 }} />}
//               color="blue"
//               txt="Accident calls"
//               num="20"
//             />
//           </div>

//           <div className="graph-section">
//             <div className="circular-graph-wrapper">
//               <CircularGraph />
//             </div>
//             <div className="dynamic-graph-wrapper">
//               <DynamicSpikyGraph />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default dashboard;


import React, { useState, useEffect } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import "./../../components/Navbar/Navbar.css";
import Card from "./../../components/Card/Card";
import StickyBar from "./../../components/stickyBar/stickyBar";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import "./../../main.css";
import DynamicSpikyGraph from "./../../components/graph/graph";
import CircularGraph from "./../../components/CircGraph/circgraph";

function Dashboard() {
  const [totalCalls, setTotalCalls] = useState(0);
  const [fireCalls, setFireCalls] = useState(0);
  const [EMSCalls, setEMSCalls] = useState(0);
  const [policeCalls, setPoliceCalls] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.54.24:8080");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "newCall") {
        // Update state variables based on the call type
        setTotalCalls((prevTotal) => prevTotal + 1);

        if (data.callType === "Fire") {
          setFireCalls((prevCount) => prevCount + 1);
        } else if (data.callType === "EMS") {
          setEMSCalls((prevCount) => prevCount + 1);
        } else if (data.callType === "Police") {
          setPoliceCalls((prevCount) => prevCount + 1);
        }
      }

      // You can also process the alert data here and display a notification if needed
      if (data.alert) {
        console.log("Alert received:", data);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <StickyBar />
        <div className="dashboard-container">
          <div className="card-container">
            <Card
              icon={<RingVolumeIcon sx={{ fontSize: 50 }} />}
              color="orange"
              txt="Total calls"
              num={totalCalls}
            />
            <Card
              icon={<LocalFireDepartmentIcon sx={{ fontSize: 50 }} />}
              color="yellow"
              txt="Fire calls"
              num={fireCalls}
            />
            <Card
              icon={<LocalHospitalIcon sx={{ fontSize: 50 }} />}
              color="green"
              txt="Medical calls"
              num={EMSCalls}
            />
            <Card
              icon={<CarCrashIcon sx={{ fontSize: 50 }} />}
              color="blue"
              txt="Accident calls"
              num={policeCalls}
            />
          </div>

          <div className="graph-section">
            <div className="circular-graph-wrapper">
              <CircularGraph />
            </div>
            <div className="dynamic-graph-wrapper">
              <DynamicSpikyGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
