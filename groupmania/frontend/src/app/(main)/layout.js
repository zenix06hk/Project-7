import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./main.scss";

export default function Layout({ children }) {
  return (
    <div className="mainLayout_container">
      <div className="mainLayout_header">
        <Header />
      </div>
      <div className="mainLayout_body">
        <div className="mainLayout_sidebar">
          <Sidebar />
        </div>
        <div className="mainLayout_content">{children}</div>
      </div>
    </div>
  );
}
