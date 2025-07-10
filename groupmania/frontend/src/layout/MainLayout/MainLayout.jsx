"use client";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import { ThemeProvider } from "@/context/theme-context.js";
import "../../styles/globals.css";

function HomeLayout({ children }) {
  return (
    <div className="mainLayout">
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center">
          <Header />
          <Sidebar />
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default HomeLayout;
