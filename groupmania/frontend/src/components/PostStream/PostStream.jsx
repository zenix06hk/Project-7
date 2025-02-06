"use client";

import React from "react";
import Image from "next/image";
import Form from "next/form";

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

function MembersShare({ posts, comment, updateComment, postComment }) {
  return (
    <div>
      {posts.map((item, index) => {
        const { description, uploadedImage, comment } = item;
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
              {/* <h3>{username}</h3> */}
              <div className="poststream__upperBlock">
                <p>{description}</p>
              </div>
              <span>
                <Image
                  src={uploadedImage}
                  alt="icon"
                  width={500}
                  height={500}
                  className="poststream__uploadedImg"
                />
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
                <FontAwesomeIcon
                  icon={faComment}
                  className="poststream__icon"
                  width="30px"
                  height="30px"
                />
                <FontAwesomeIcon
                  icon={faPen}
                  className="poststream__icon"
                  width="30px"
                  height="30px"
                />
              </div>
              <label htmlFor="fname"></label>
              <Form>
                <input
                  type="text"
                  id="description"
                  placeholder="Comment here..."
                  size="100"
                  className="createPost__textfield"
                  value={comment}
                  // onChange={(e) => postComment(e.target.value)}
                />
              </Form>
            </div>
          </div>
        );
      })}

      {/*Demo*/}

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
            <p>This is 1st posted</p>
          </div>
          <span>
            <Image
              src="/assets/DSC02183.jpg"
              alt="icon"
              width={500}
              height={500}
              className="poststream__uploadedImg"
            />
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
            <FontAwesomeIcon
              icon={faPen}
              className="poststream__icon"
              width="30px"
              height="30px"
            />
          </div>
          <div className="poststream__comment">
            <label htmlFor="fname"></label>
            <Form>
              <input
                type="text"
                id="description"
                placeholder="Comment here..."
                size="100"
                className="createPost__textfield"
                value={comment}
                onChange={(e) => postComment(e.target.value)}
              />
            </Form>
            <button
              type="submit"
              className="createPost__button submit"
              onClick={updateComment}
              height="30px"
              value=""
            >
              <p>Post</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembersShare;
