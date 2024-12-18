// import "../styles/authlayout.scss";

import AuthLayout from "../../layout/AuthLayout/AuthLayout.jsx";

export default function Layout({ children }) {
  return (
    <div>
      {/* <div className="loginLayout"> */}
      <AuthLayout> {children}</AuthLayout>
    </div>
  );
}
