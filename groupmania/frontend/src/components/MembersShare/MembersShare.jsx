import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import profileImg from "../../assets/profile_image.jpg";

import "./memberShare.scss";

const profile_Img = profileImg;

function MembersShare() {
  return (
    <div className="membershare-container">
      <div className="membershare-container-userImg">
        <img
          src={profile_Img}
          alt="Groupmania"
          className="membershare-container-profileImg"
        ></img>
      </div>
      <div className="membershare-container-content">
        <div className="membershare-container-top">
          <div className="membershare-container-top-inner">
            <form>
              <label for="fname"></label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="How's going today?"
                className="membershare-container-top-inner-input"
              />
            </form>
          </div>
        </div>
        <div className="membershare-container-bottom">
          <div className="membershare-container-bottom photo">
            <div>
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="membershare-container-tab-icon"
                width="30px"
                height="30px"
              />
            </div>
            <p>Like</p>
          </div>
          <div className="membershare-container-bottom submit">
            <div>
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="membershare-container-tab-icon"
                width="30px"
                height="30px"
              />
            </div>
            <p>Dislike</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembersShare;
