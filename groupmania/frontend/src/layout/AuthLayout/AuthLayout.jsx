import AuthSideImg from "../../components/AuthSideImg/AuthSideImg.jsx";
import "./authlayout.scss";

function AuthLayout({ children }) {
  return (
    <div className="loginLayout">
      <AuthSideImg />
      {children}
    </div>
  );
}

export default AuthLayout;
