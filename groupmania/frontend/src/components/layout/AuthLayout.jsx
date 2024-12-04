import AuthSideImg from "../../components/AuthSideImg/AuthSideImg";

function AuthLayout({ children }) {
  return (
    <div className="loginLayout">
      <AuthSideImg />
      {children}
    </div>
  );
}

export default AuthLayout;
