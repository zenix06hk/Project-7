import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/icon.png";
import profileImg from "../../assets/profile_image.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <Link href="/home">
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
