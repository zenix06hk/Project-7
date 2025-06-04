"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import "./header.scss";
import LoginBtn from "../LoginBtn/LoginBtn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
// config.autoAddCss = false;
import {
  faHome,
  faUserGroup,
  faPeopleGroup,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navList = [
    { name: faHome, url: "/home" },
    { name: faUserGroup, url: "/friends" },
    { name: faPeopleGroup, url: "/community" },
    { name: faGear, url: "/settings" },
  ];

  return (
    <header>
      <div className="header__container">
        <Link href="/home">
          <Image src="/assets/icon.png" alt="icon" width={80} height={80} />
        </Link>
        <div className="header__tablist">
          {navList.map((item, index) => (
            <div key={index} className="header__tablist_icon">
              <Link href={item.url}>
                <FontAwesomeIcon icon={item.name} size="xl" />
              </Link>
            </div>
          ))}
        </div>
        <Image
          src="/assets/profile_image.jpg"
          alt="icon"
          width={80}
          height={80}
          className="header__profileImg"
        />
      </div>

      <LoginBtn />
    </header>
  );
}

export default Header;
