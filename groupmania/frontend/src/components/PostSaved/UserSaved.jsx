import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "./userSaved.scss";

// import profileImg from "../../assets/profile_image.jpg";

// const profile_Img = profileImg;

function UserSaved() {
  return (
    <div className="usersaved-container">
      <div className="usersaved-container-userImg">
        <img
          // src={profile_Img}
          alt="Groupmania"
          className="usersaved-container-profileImg"
        ></img>
      </div>
      <div className="usersaved-container-content">
        <div className="usersaved-container-top">
          <div className="usersaved-container-top-inner">
            <form>
              <label for="fname"></label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="How's going today?"
                className="usersaved-container-top-inner-input"
              />
            </form>
          </div>
        </div>
        <div className="usersaved-container-bottom"></div>
      </div>
    </div>
  );
}

export default UserSaved;
