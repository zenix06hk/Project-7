import React from "react";
// import Link from "next/link"

import "./sidebar.scss";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import {
  faRss,
  faUserGroup,
  faBookmark,
  faCalendarDay,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const sidebar_list = [
  { title: "Home", path: "/home", icon: faRss, size: "lg" },
  { title: "Friends", path: "/friendslist", icon: faUserGroup },
  { title: "Saved", path: "/usersaved", icon: faBookmark, size: "lg" },
  { title: "Events", path: "/Events", icon: faCalendarDay, size: "lg" },
  { title: "Setting", path: "/settings", icon: faGear },
];

function Sidebar() {
  return (
    <div className="sidebar-full-container">
      {sidebar_list.map((item, index) => (
        <Link to={item.path}>
          <div key={index} className="sidebar-m-container">
            <div className="sidebar-m-container-tab">
              <FontAwesomeIcon
                icon={item.icon}
                size={item.size}
                className="sidebar-m-container-tab-icon"
                width="30px"
                height="30px"
              />
            </div>
            <p>{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
