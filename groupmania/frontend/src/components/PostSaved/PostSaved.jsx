import React from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

// import profileImg from "../../assets/profile_image.jpg";

import "./postsaved.scss";

// const profile_Img = profileImg;

function PostSaved() {
  return (
    <div className="postsaved_container">
      <Image
        src="/assets/profile_image.jpg"
        alt="icon"
        width={80}
        height={80}
        className="postsaved_profileImg"
      />
      <div className="postsaved_content">
        <div className="postsaved_top">
          <div className="postsaved_top_inner">
            <h1>this is posted preview</h1>
          </div>
        </div>
        <div className="postsaved_bottom">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="postsaved_icon"
            width="30px"
            height="30px"
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="postsaved_icon"
            width="30px"
            height="30px"
          />
          <FontAwesomeIcon
            icon={faHeart}
            className="postsaved_icon"
            width="30px"
            height="30px"
          />
        </div>
      </div>
    </div>
  );
}

export default PostSaved;
