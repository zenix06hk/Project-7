import "../styles/main.scss";
// import "../styles/authlayout.scss";

import AuthLayout from "../../components/AuthLayout.jsx";

export default function Layout({ children }) {
  return (
    <div>
      {/* <div className="loginLayout"> */}
      <AuthLayout> {children}</AuthLayout>
    </div>
  );
}
