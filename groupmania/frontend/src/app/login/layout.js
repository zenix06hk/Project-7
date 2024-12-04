import AuthLayout from "@/components/layout/AuthLayout";
import "../styles/main.scss";

export default function Layout({ children }) {
  return (
    <div className="loginLayout">
      <AuthLayout> {children}</AuthLayout>
    </div>
  );
}
