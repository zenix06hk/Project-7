import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "../app/styles/main.scss";
import "../app/styles/userSaved.scss";

import profileImg from "../../assets/profile_image.jpg";

const profile_Img = profileImg;

function UserSaved() {
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
        <div className="usershare-container-bottom"></div>
      </div>
    </div>
  );
}

export default UserSaved;