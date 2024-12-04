import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import Login from "../components/Login/Login";

function LoginPage() {
  return (
    <div className="full-container login">
      <Login />
    </div>
  );
}

export default LoginPage;
