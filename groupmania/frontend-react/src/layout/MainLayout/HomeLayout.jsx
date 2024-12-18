import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function HomeLayout() {
  return (
    <div className="homeLayout">
      <div className="homeLayout-top">
        <Header />
      </div>
      <div className="homeLayout-body">
        <div className="sidebarLayout">
          <Sidebar />
        </div>
        <div className="contentLayout">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
