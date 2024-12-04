import { Outlet } from "react-router-dom";

import AuthSideImg from "../../components/AuthSideImg/AuthSideImg";

import "../../base/main.scss";
import "../main.scss";

function AuthLayout() {
  return (
    <div className="loginLayout">
      <AuthSideImg />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
