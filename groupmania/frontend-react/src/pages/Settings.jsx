import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import Settings from "../components/Settings/Settings";

function SettingsPage() {
  return (
    <div className="SettingLayout">
      <Settings />
    </div>
  );
}

export default SettingsPage;
