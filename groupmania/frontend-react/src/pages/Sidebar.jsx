import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import Sidebar from "../components/Sidebar/Sidebar";

function SidebarPage() {
  return (
    <div className="sidebarLayout">
      <Sidebar />
    </div>
  );
}

export default SidebarPage;
