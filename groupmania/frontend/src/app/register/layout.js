import "../../styles/main.scss";
import AuthLayout from "../../layout/AuthLayout/AuthLayout.jsx";

export default function Layout({ children }) {
  return <AuthLayout> {children}</AuthLayout>;
}
