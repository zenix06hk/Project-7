import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import Header from "../components/Header/Header";

function HeaderPage() {
  return <div className="HeaderLayout">{<Header />}</div>;
}

export default HeaderPage;
