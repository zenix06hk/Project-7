import Image from "next/image";

import AuthSideImg from "../components/AuthSideImg";
import "../app/styles/authlayout.scss";

function AuthLayout({ children }) {
  return (
    <div className="loginLayout">
      <AuthSideImg />
      {children}
    </div>
  );
}

export default AuthLayout;
