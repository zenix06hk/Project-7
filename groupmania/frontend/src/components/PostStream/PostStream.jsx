"use client";

import React from "react";
import Image from "next/image";
import Form from "next/form";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

// import profileImg from "../../assets/profile_image.jpg";

import "./Poststream.scss";

// const profile_Img = profileImg;

function MembersShare({ posts, postComment }) {
  // const [comment, setComment] = useState("");

  // const updateComment = (value) => {
  //   setComment(value);
  // };
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e, index) => {
    e.preventDefault();
    postComment(comment);
    setComments((prevComments) => ({
      ...prevComments,
      [index]: comment,
    }));
    setComment("");
  };

  return (
    <div>
      {posts.map((item, index) => {
        const { description, uploadedImage, comment: itemComment } = item;
        return (
          <div key={index} className="poststream__container">
            <Image
              src="/assets/profile_image.jpg"
              alt="icon"
              width={80}
              height={80}
              className="poststream__profileImg"
            />
            <div className="poststream__content">
              <div className="poststream__upperBlock">
                <p>{description}</p>
              </div>
              <span>
                {uploadedImage && (
                  <Image
                    src={uploadedImage}
                    alt="icon"
                    width={500}
                    height={500}
                    className="poststream__uploadedImg"
                  />
                )}
              </span>
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
                {/* <FontAwesomeIcon
                  icon={faComment}
                  className="poststream__icon"
                  width="30px"
                  height="30px"
                /> */}
                <FontAwesomeIcon
                  icon={faPen}
                  className="poststream__icon"
                  width="30px"
                  height="30px"
                />
              </div>
              <label htmlFor="fname"></label>
              <Form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="comment"
                  placeholder="Comment here..."
                  size="100"
                  className="createPost__textfield"
                  value={comment}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="createPost__button submit"
                  onClick={postComment}
                  height="30px"
                  value=""
                >
                  <p>Post</p>
                </button>
              </Form>
              {/* <p>{comment}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MembersShare;
