"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { useState } from "react";

import "./createpost.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

// export default function Form() {
//   const [submit, setSubmit] = useState();
//   const [error, setError] = useState(null);

function CreatePost({
  createUserPost,
  postDescription,
  postImage,
  newPostItem,
}) {
  const { name, img, description, uploadedImage } = createUserPost;

  return (
    <div className="createPost_container">
      <Image
        src="/assets/profile_image.jpg"
        alt="icon"
        width={80}
        height={80}
        className="createPost_container-profileImg"
      />
      <div className="createPost_container-content">
        <div className="createPost_container-top">
          <div className="createPost_container-top-inner">
            <form>
              <label htmlFor="fname"></label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="  How's going today?"
                className="createPost_container-top-inner-input"
                value={description}
                onChange={(click) => postDescription(click.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="createPost_container-bottom">
          <div className="createPost_button photo" onClick={postImage}>
            <FontAwesomeIcon
              icon={faPhotoFilm}
              className="createPost_container-tab-icon"
              width="30px"
              height="30px"
            />
            <p>Photo</p>
          </div>
          <div className="createPost_button submit" onClick={newPostItem}>
            <p>Post</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
