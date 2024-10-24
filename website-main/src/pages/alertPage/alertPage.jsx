import React from "react";
import Navbar from "./../../components/Navbar/Navbar";
import "./../../components/Navbar/Navbar.css";
import StickyBar from "./../../components/stickyBar/stickyBar";
import "./alertsPage.css";
import DynamicGraph from "./../../components/graph2/graph2";
import Alert1 from "../../components/alert1/alert1";
import Alert2 from "../../components/alert2/alert2";
import NotificationIcons from "./../../components/notificons/notificons";

function alertPage() {
  return (
    <div>
      <Navbar />
      <div className="alert-container">
        <StickyBar />
        <div className="main-container">
          <div className="graph">
            <DynamicGraph />
          </div>
          <div className="alerts">
            <div className="alert1-div">
              <Alert1 />
            </div>
            <div className="alert2-div">
              <Alert2 />
            </div>
          </div>
        </div>
        <NotificationIcons />
      </div>
    </div>
  );
}

export default alertPage;
