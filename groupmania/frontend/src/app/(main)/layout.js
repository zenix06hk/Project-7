'"use client";';

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./main.scss";

export default function Layout({ children }) {
  return (
    <div className="mainLayout__container">
      <div className="mainLayout__header">
        <Header />
      </div>
      <div className="mainLayout__body">
        <div className="mainLayout__sidebar">
          <Sidebar />
        </div>
        <div className="mainLayout__content">{children}</div>
      </div>
    </div>
  );
}
