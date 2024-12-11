import React from "react";

import "../app/styles/main.scss";
import "../app/styles/userShare.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import profileImg from "../../assets/profile_image.jpg";

const profile_Img = profileImg;

function UserShare() {
  return (
    <div className="usershare-container">
      <div className="usershare-container-userImg">
        <img
          src={profile_Img}
          alt="Groupmania"
          className="usershare-container-profileImg"
        ></img>
      </div>
      <div className="usershare-container-content">
        <div className="usershare-container-top">
          <div className="usershare-container-top-inner">
            <form>
              <label for="fname"></label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="How's going today?"
                className="usershare-container-top-inner-input"
              />
            </form>
          </div>
        </div>
        <div className="usershare-container-bottom">
          <div className="usershare-container-bottom photo">
            <div>
              <FontAwesomeIcon
                icon={faPhotoFilm}
                className="usershare-container-tab-icon"
                width="30px"
                height="30px"
              />
            </div>
            <p>Photo</p>
          </div>
          <div className="usershare-container-bottom submit">
            <div>
              <FontAwesomeIcon
                icon={faArrowUp}
                className="usershare-container-tab-icon"
                width="30px"
                height="30px"
              />
            </div>
            <p>Post</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserShare;
