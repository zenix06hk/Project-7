import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import UserSaved from "../components/UserSaved/UserSaved";

function UserSavedPage() {
  return (
    <div className="userSavedLayout">
      <UserSaved />
    </div>
  );
}

export default UserSavedPage;
