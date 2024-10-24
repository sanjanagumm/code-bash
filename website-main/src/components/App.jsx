import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./../pages/dashboard/dashboard";
import Alerts from "./../pages/alertPage/alertPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </div>
  );
}

export default App;
