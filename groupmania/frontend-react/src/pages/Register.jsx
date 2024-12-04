import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import Register from "../components/Register/Register";

function RegisterPage() {
  return (
    <div className="registerLayout">
      <Register />
    </div>
  );
}

export default RegisterPage;
