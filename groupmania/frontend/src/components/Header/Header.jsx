"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "../../context/theme-context";

import "./header.scss";
import LoginBtn from "../LoginBtn/LoginBtn";
import { getUserAvatarUrl } from "@/components/utility/getUserAvatarUrl.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const { data: session, status } = useSession();

  // Ensure component is mounted before using theme
  useEffect(() => {
    setMounted(true);
    // Import Bootstrap JavaScript for interactive components
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
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
        <Link href="/">
          <Image
            src={
              mounted && theme === "dark"
                ? "/assets/icon_dark.png"
                : "/assets/icon.png"
            }
            alt="icon"
            width={80}
            height={80}
            priority
          />
        </Link>
        <div className="header__tablist">
          {/* {navList.map((item, index) => ( */}
          {/* <div key={index} className="header__tablist_icon"> */}
          <div className="header__tablist_link">
            {/* <Link href={item.url}>
                <FontAwesomeIcon
                  icon={item.name}
                  size="lg"
                  style={{
                    color: mounted && theme === "dark" ? "white" : "black",
                  }}
                />
              </Link> */}
            <Link href="/">
              <div
                style={{
                  color: mounted && theme === "dark" ? "white" : "black",
                }}
              >
                Home
              </div>
            </Link>
            <Link href="/friends">
              <div
                style={{
                  color: mounted && theme === "dark" ? "white" : "black",
                }}
              >
                Friends
              </div>
            </Link>
            <Link href="/settings">
              <div
                style={{
                  color: mounted && theme === "dark" ? "white" : "black",
                }}
              >
                Settings
              </div>
            </Link>
          </div>
          {/* ))} */}
          <div className="dropdown">
            <Image
              src={getUserAvatarUrl(session?.user?.image)}
              alt="profile"
              width={80}
              height={80}
              className="header__profileImg dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            />

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/updateProfile"
                >
                  <span>Update Profile</span>
                </Link>
              </li>
              <li>
                <div
                  className="dropdown-item d-flex justify-content-between align-items-center"
                  style={{ paddingRight: "1rem" }}
                >
                  <span style={{ marginRight: "2rem" }}>Dark Mode</span>
                  <DarkModeToggle />
                </div>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center">
                  <span>
                    <LoginBtn />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
