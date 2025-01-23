"use client";

import React from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

// import profileImg from "../../assets/profile_image.jpg";

import "./Poststream.scss";

// const profile_Img = profileImg;

function MembersShare({ posts }) {
  // const { username, description, uploadedImage } = item;

  return (
    <div className="poststream__container">
      <Image
        src="/assets/profile_image.jpg"
        alt="icon"
        width={80}
        height={80}
        className="poststream__profileImg"
      />
      <div className="poststream__content">
        {/* <h3>{username}</h3> */}
        <div className="poststream__upperBlock">
          {/* <p>{description}</p> */}
        </div>
        {/* <span>{uploadedImage}</span> */}
        <div className="poststream__bottom">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="poststream__icon"
            width="30px"
            height="30px"
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="poststream__icon"
            width="30px"
            height="30px"
          />
        </div>
      </div>
    </div>
  );
}

export default MembersShare;
