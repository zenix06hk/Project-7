"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import "./header.scss";

import Logo from "../../../public/assets/icon.png";
import profileImg from "../../../public/assets/profile_image.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
// config.autoAddCss = false;
import {
  faHome,
  faUserGroup,
  faPeopleGroup,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navList = [
    { name: faHome, url: "/home" },
    { name: faUserGroup, url: "/friends" },
    { name: faPeopleGroup, url: "/community" },
  ];

  return (
    <header>
      <div className="header_container">
        <Link href="/home">
          <Image
            src="/assets/icon.png"
            alt="icon"
            width={80}
            height={80}
            className="header_company_Logo"
          />
        </Link>
        <div className="header_tablist">
          {navList.map((item, index) => (
            <div key={index} className="header_tablist_icon">
              <Link href={item.url}>
                <FontAwesomeIcon icon={item.name} size="xl" />
              </Link>
            </div>
          ))}
        </div>
        <div className="header_test">
          <Image
            src="/assets/profile_image.jpg"
            alt="icon"
            width={80}
            height={80}
            className="header_profileImg"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
