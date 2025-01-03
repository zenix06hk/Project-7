import React from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

// import profileImg from "../../assets/profile_image.jpg";

import "./Poststream.scss";

// const profile_Img = profileImg;

function MembersShare() {
  return (
    <div className="poststream_container">
      <Image
        src="/assets/profile_image.jpg"
        alt="icon"
        width={80}
        height={80}
        className="poststream_profileImg"
      />
      <div className="poststream_content">
        <div className="poststream_top">
          <div className="poststream_top_inner">
            <h1>this is posted preview</h1>
          </div>
        </div>
        <div className="poststream_bottom">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="poststream_icon"
            width="30px"
            height="30px"
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="poststream_icon"
            width="30px"
            height="30px"
          />
          <FontAwesomeIcon
            icon={faHeart}
            className="poststream_icon"
            width="30px"
            height="30px"
          />
        </div>
      </div>
    </div>
  );
}

export default MembersShare;
