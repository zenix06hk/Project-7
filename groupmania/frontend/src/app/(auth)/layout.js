"use client";

import Image from "next/image";

import AuthSideImg from "../../components/AuthSideImg/AuthSideImg.jsx";
import "./main.scss";

function Layout({ children }) {
  return (
    <div className="authLayout_container">
      <div className="authLayout_sideImage">
        <Image src="/assets/hands_together.webp" fill alt="hands_together" />
      </div>
      <div className="authLayout_content">{children}</div>
    </div>
  );
}

export default Layout;
