"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Form from "next/form";
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
    <div className="createPost__container">
      <Image
        src="/assets/profile_image.jpg"
        alt="icon"
        width={80}
        height={80}
        className="createPost__profileImg"
      />
      <div className="createPost__content">
        <div className="createPost__upperBlock">
          {/* <div className="createPost__test"> */}
          <Form>
            <label htmlFor="fname"></label>
            <input
              type="text"
              id="description"
              name={name}
              placeholder="  How's going today?"
              size="100"
              className="createPost__container-top-inner-input"
              value={description}
              onChange={(e) => postDescription(e.target.value)}
            />
          </Form>
          {/* </div> */}
        </div>
        <div className="createPost__bottomBlock">
          {/* <div className="createPost_button photo"> */}
          <button
            type="submit"
            className="createPost__button photo"
            onClick={postImage}
          >
            <FontAwesomeIcon
              icon={faPhotoFilm}
              className="createPost__container-tab-icon"
              width="30px"
              height="30px"
            />
            <p>Photo</p>
          </button>
          {/* </div> */}
          {/* <div className="createPost_button submit" onClick={newPostItem}> */}

          <button
            type="submit"
            className="createPost__button submit"
            onClick={newPostItem}
          >
            <p>Post</p>
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
