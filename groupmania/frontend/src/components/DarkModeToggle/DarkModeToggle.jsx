import { useTheme } from "@/context/theme-context.js";
import React from "react";
import "./darkmodetoggle.scss";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="theme-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="toggle-checkbox"
      />
      <label htmlFor="theme-toggle" className="toggle-label">
        <span className="toggle-ball"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
