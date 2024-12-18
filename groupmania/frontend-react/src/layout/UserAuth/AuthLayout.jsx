import { Outlet } from "react-router-dom";

import AuthSideImg from "../../components/AuthSideImg/AuthSideImg";

function AuthLayout() {
  return (
    <div className="loginLayout">
      <AuthSideImg />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
