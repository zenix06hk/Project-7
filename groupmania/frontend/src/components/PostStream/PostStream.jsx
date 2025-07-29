"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Form from "next/form";
import { useSession } from "next-auth/react";
import { useTheme } from "../../context/theme-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import "./Poststream.scss";
import Comments from "../Comments/Comments";

function MembersShare({ posts, postComment }) {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // State to track like/dislike status for each post
  const [postReactions, setPostReactions] = useState({});

  // Handle thumbs up click
  const handleThumbsUp = (postId) => {
    setPostReactions((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        thumbsUp: !prev[postId]?.thumbsUp,
        thumbsDown: false, // Reset thumbs down when thumbs up is clicked
      },
    }));
  };

  // Handle thumbs down click
  const handleThumbsDown = (postId) => {
    setPostReactions((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        thumbsDown: !prev[postId]?.thumbsDown,
        thumbsUp: false, // Reset thumbs up when thumbs down is clicked
      },
    }));
  };
  // const [comment, setComment] = useState("");

  // const updateComment = (value) => {
  //   setComment(value);
  // // };
  // const [comment, setComment] = useState("");
  // const [comments, setComments] = useState({});

  // const handleInputChange = (e) => {
  //   setComment(e.target.value);
  // };

  // const handleSubmit = (e, index) => {
  //   e.preventDefault();
  //   postComment(comment);
  //   setComments((prevComments) => ({
  //     ...prevComments,
  //     [index]: comment,
  //   }));
  //   setComment("");
  // };

  return (
    <div className="poststream">
      {posts.map((item, index) => {
        const {
          description,
          uploadedImage,
          comment: itemComment,
          id,
          comments,
          timestamp,
        } = item;
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
              {timestamp && (
                <div
                  className="poststream__timestamp"
                  style={{
                    color: mounted && theme === "dark" ? "white" : "black",
                  }}
                >
                  <span>{timestamp}</span>
                </div>
              )}
              <span>
                <p>{itemComment}</p>
              </span>
              <div className="poststream__bottom">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className={`poststream__icon poststream__icon--thumbs-up ${
                    postReactions[id]?.thumbsUp ? "active" : ""
                  }`}
                  width="30px"
                  height="30px"
                  onClick={() => handleThumbsUp(id)}
                  style={{
                    cursor: "pointer",
                    color: postReactions[id]?.thumbsUp ? "#007bff" : "inherit",
                  }}
                />
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  className={`poststream__icon poststream__icon--thumbs-down ${
                    postReactions[id]?.thumbsDown ? "active" : ""
                  }`}
                  width="30px"
                  height="30px"
                  onClick={() => handleThumbsDown(id)}
                  style={{
                    cursor: "pointer",
                    color: postReactions[id]?.thumbsDown
                      ? "#dc3545"
                      : "inherit",
                  }}
                />
                {/* <FontAwesomeIcon
                  icon={faBookmark}
                  className="poststream__icon"
                  width="30px"
                  height="30px"
                /> */}
              </div>
              <label htmlFor="fname"></label>
              {/* Display submitted comments */}
              {Array.isArray(comments) && comments.length > 0 && (
                <div className="poststream__comments">
                  <h4>Comments:</h4>
                  {comments.map((commentItem, commentIndex) => (
                    <div key={commentIndex} className="poststream__comment">
                      <p>{commentItem.comment}</p>
                    </div>
                  ))}
                </div>
              )}
              <Comments postComment={postComment} id={id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MembersShare;
