import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import Events from "../components/Events/Events";

function EventsPage() {
  return (
    <div className="SettingLayout">
      <Events />
    </div>
  );
}

export default EventsPage;
