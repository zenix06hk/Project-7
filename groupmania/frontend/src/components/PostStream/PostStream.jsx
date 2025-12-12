'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Form from 'next/form';
import { useSession } from 'next-auth/react';
import { useTheme } from '../../context/theme-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';

import './Poststream.scss';
import Comments from '../Comments/Comments';

// function PostStream({ posts, postComment }) {
const [hasErrorFetching, setHasErrorFetching] = useState('');
const { data: session, status, update } = useSession();
const [isComplete, setIsComplete] = useState(false);
const { theme } = useTheme();

// Ensure component is mounted before using theme
useEffect(() => {
  // the method used to fetch my profile
  async function fetchUserProfile() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/posts/get-posts`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      // Check if the response is actually JSON
      const data = await res.json();
      if (!data.success) {
        setIsLoading(false);
        setHasErrorFetching(data.error || 'something has gone wrong.');
        return <></>;
      }

      // setProfileUpdate({
      //   ...profileUpdate,
      // });
      // setIsComplete(true);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setHasErrorFetching('error has occurred');
    }
  }
  if (!isComplete) {
    if (status == 'loading') {
      {
        //if status is loading, wait to loading
        return;
      }
    }

    if (status === 'authenticated') {
      fetchUserProfile();
    } else {
      console.log('user not authenticated');
    }
  }
}, [session]);

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

// Reverse posts array to show newest posts first
const reversedPosts = posts ? [...posts].reverse() : [];

return (
  <div className="poststream">
    {reversedPosts.map((item, index) => {
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
                  color: mounted && theme === 'dark' ? 'white' : 'black',
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
                  postReactions[id]?.thumbsUp ? 'active' : ''
                }`}
                width="30px"
                height="30px"
                onClick={() => handleThumbsUp(id)}
                style={{
                  cursor: 'pointer',
                  color: postReactions[id]?.thumbsUp ? '#007bff' : 'inherit',
                }}
              />
              <FontAwesomeIcon
                icon={faThumbsDown}
                className={`poststream__icon poststream__icon--thumbs-down ${
                  postReactions[id]?.thumbsDown ? 'active' : ''
                }`}
                width="30px"
                height="30px"
                onClick={() => handleThumbsDown(id)}
                style={{
                  cursor: 'pointer',
                  color: postReactions[id]?.thumbsDown ? '#dc3545' : 'inherit',
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
// }

export default PostStream;
