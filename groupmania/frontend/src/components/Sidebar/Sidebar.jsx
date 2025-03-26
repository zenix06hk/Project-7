import React from "react";
import Link from "next/link";

import "./sidebar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {
  faBookmark,
  faCalendarDay,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const sidebar_list = [
  { title: "Saved", path: "/postsaved", icon: faBookmark, size: "lg" },
  { title: "Events", path: "/events", icon: faCalendarDay, size: "lg" },
  { title: "Setting", path: "/settings", icon: faGear },
];

function Sidebar() {
  return (
    <div className="sidebar__container">
      {sidebar_list.map((item, index) => (
        <Link href={item.path} key={index}>
          <div key={index} className="sidebar_menu">
            <div className="sidebar_list">
              <FontAwesomeIcon
                icon={item.icon}
                size={item.size}
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
