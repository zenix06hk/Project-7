import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import UserUpdateInfo from "../components/UserUpdateInfo/UserUpdateInfo";

function userUpdateInfoPage() {
  return (
    <div className="userUpdatedInfoLayout">
      <UserUpdateInfo />
    </div>
  );
}

export default userUpdateInfoPage;
