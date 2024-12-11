import "../styles/main.scss";
import AuthLayout from "../../components/AuthLayout.jsx";

export default function Layout({ children }) {
  return <AuthLayout> {children}</AuthLayout>;
}
