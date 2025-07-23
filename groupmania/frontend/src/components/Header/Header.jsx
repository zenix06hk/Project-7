"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../context/theme-context";

import "./header.scss";
import LoginBtn from "../LoginBtn/LoginBtn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle.jsx";
// config.autoAddCss = false;
import {
  faHome,
  faUserGroup,
  faPeopleGroup,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const navList = [
    { name: faHome, url: "/" },
    { name: faUserGroup, url: "/friends" },
    { name: faPeopleGroup, url: "/community" },
    { name: faGear, url: "/settings" },
  ];

  return (
    <header>
      <div className="header__container">
        <Link href="/home">
          <Image
            src={
              mounted && theme === "dark"
                ? "/assets/icon_dark.png"
                : "/assets/icon.png"
            }
            alt="icon"
            width={80}
            height={80}
          />
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
        <LoginBtn />
        <DarkModeToggle />
        <Image
          src="/assets/profile_image.jpg"
          alt="icon"
          width={80}
          height={80}
          className="header__profileImg"
        />
      </div>
    </header>
  );
}

export default Header;
