import React from "react";
import Link from "next/link";

import "../app/styles/main.scss";
import "../app/styles/header.scss";

import Logo from "../../../public/assets/icon.png";
import profileImg from "../../../public/assets/profile_image.jpg";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import {
  faHome,
  faUserGroup,
  faPeopleGroup,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

const header_list = [faHome, faUserGroup, faPeopleGroup, faCalendarDay];

const logo_image = Logo;
const profile_Img = profileImg;

function Header() {
  const navList = [
    { name: faHome, url: "/home" },
    { name: faUserGroup, url: "/friendList" },
    { name: faPeopleGroup, url: "/communityList" },
    { name: faCalendarDay, url: "/event" },
  ];

  return (
    <header>
      {/* <h1>this is a header</h1> */}
      <div className="header-full-container">
        <Link to="/home">
          <img
            src={logo_image}
            alt="Groupmania"
            className="header-companyLogo"
            width="80px"
          ></img>
        </Link>
        <div className="header-m-container">
          {header_list.map((item, index) => (
            <div key={index} className="header-m-container-tab">
              <div>
                <FontAwesomeIcon
                  icon={item}
                  size="lg"
                  className="header-container-tab-icon-color"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="header-userImg">
          <img
            src={profile_Img}
            alt="Groupmania"
            className="header-profileImg"
          ></img>
        </div>
      </div>
    </header>
  );
}

export default Header;
