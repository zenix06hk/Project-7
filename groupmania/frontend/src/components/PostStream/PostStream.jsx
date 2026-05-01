'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTheme } from '../../context/theme-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

import './Poststream.scss';
import CreateComment from '../CreateComment/CreateComment';
import { getUserAvatarUrl } from '@/components/utility/getUserAvatarUrl.js';

// Ensure component is mounted before using theme

const PostStream = ({ posts, postComment, submitComment }) => {
  const { data: session, status, update } = useSession();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // text color based on theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // State to track like/dislike status for each post
  const [postReactions, setPostReactions] = useState({});

  useEffect(() => {
    if (!Array.isArray(posts) || posts.length === 0) return;

    setPostReactions((prev) => {
      const additions = posts.reduce((acc, post) => {
        const postId = post?.post_id;
        if (!postId) return acc;
        if (prev[postId]) return acc; // don't overwrite local changes

        acc[postId] = {
          likes: Number(post?.user_likes) === 1 ? 1 : 0,
          dislikes: Number(post?.user_dislikes) === 1 ? 1 : 0,
        };
        return acc;
      }, {});

      return { ...prev, ...additions };
    });
  }, [posts]);

  // State to track comment input visibility per post
  const [openComments, setOpenComments] = useState({});

  const setReactionState = (postId, likes, dislikes) => {
    setPostReactions((prev) => ({
      ...prev,
      [postId]: {
        likes: Number(likes) === 1 ? 1 : 0,
        dislikes: Number(dislikes) === 1 ? 1 : 0,
      },
    }));
  };

  const handlePopularity = async (postId, likes, dislikes) => {
    // console.log(likes);
    // console.log(dislikes);
    try {
      if (!session?.accessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/posts/create-popularity`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            post_id: postId,
            likes: likes,
            dislikes: dislikes,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update popularity');
      }
      const nextLikes = data?.data?.likes;
      const nextDislikes = data?.data?.dislikes;

      setReactionState(postId, nextLikes, nextDislikes);
    } catch (error) {
      // console.log('Error updating popularity:', error);
    }
  };

  // Handle thumbs up click (neutral <-> like, and dislike -> like)
  const handleThumbsUp = (postId) => handlePopularity(postId, 1, 0);

  // Handle thumbs down click (neutral <-> dislike, and like -> dislike)
  const handleThumbsDown = (postId) => handlePopularity(postId, 0, 1);

  const handleToggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="poststream">
      {posts.map((item, index) => {
        const {
          first_name,
          last_name,
          description,
          post_content,
          uploadedImage,
          post_img,
          comment: itemComment,
          post_id,
          comments,
          post_time,
          comment_time,
        } = item;

        const userFullName =
          first_name && last_name ? `${first_name} ${last_name}` : 'Username';
        const postId = post_id;
        const descriptionText = description ?? post_content ?? '';
        console.log(descriptionText);
        const imageSrc = uploadedImage ?? post_img;
        const postTimestampText = post_time
          ? new Date(post_time).toLocaleString()
          : '';
        const commentTimestampText = comment_time
          ? new Date(comment_time).toLocaleString()
          : '';
        return (
          <div key={index} className="poststream__container">
            <Image
              src={getUserAvatarUrl(item?.avatar)}
              alt="icon"
              width={80}
              height={80}
              className="poststream__profileImg"
            />
            <div className="poststream__content">
              <div className="poststream__headerNameAndTime">
                <div className="poststream__name">
                  <h2>{userFullName}</h2>
                </div>
                <div className="poststream__timestamp">
                  <p>{postTimestampText}</p>
                </div>
              </div>
              <div className="poststream__description">
                <p>{descriptionText}</p>
              </div>
              <span>
                {imageSrc && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API}/images/${imageSrc}`}
                    alt="icon"
                    width={500}
                    height={500}
                    className="poststream__uploadedImg"
                  />
                )}
              </span>
              <span>
                <p>{itemComment}</p>
              </span>
              <div className="poststream__bottom">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className={`poststream__icon poststream__icon--thumbs-up ${
                    postReactions[postId]?.likes === 1 ? 'active' : ''
                  }`}
                  width="30px"
                  height="30px"
                  onClick={() => handleThumbsUp(postId)}
                  style={{
                    cursor: 'pointer',
                    color:
                      postReactions[postId]?.likes === 1
                        ? '#007bff'
                        : 'inherit',
                  }}
                />
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  className={`poststream__icon poststream__icon--thumbs-down ${
                    postReactions[postId]?.dislikes === 1 ? 'active' : ''
                  }`}
                  width="30px"
                  height="30px"
                  onClick={() => handleThumbsDown(postId)}
                  style={{
                    cursor: 'pointer',
                    color:
                      postReactions[postId]?.dislikes === 1
                        ? '#dc3545'
                        : 'inherit',
                  }}
                />
                <FontAwesomeIcon
                  icon={faComment}
                  className={`poststream__icon poststream__icon--comment ${
                    openComments[postId] ? 'active' : ''
                  }`}
                  width="30px"
                  height="30px"
                  onClick={() => handleToggleComments(postId)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <label htmlFor="fname"></label>
              {openComments[postId] && (
                <CreateComment postComment={postComment} postId={postId} />
              )}
              {Array.isArray(comments) && comments.length > 0 && (
                <div className="poststream__comments_container">
                  <h4>Comments:</h4>
                  {comments.map((commentItem, commentIndex) => (
                    <div
                      key={commentIndex}
                      className="poststream__comments_list"
                    >
                      <Image
                        src={getUserAvatarUrl(commentItem?.comment_avatar)}
                        alt="profile"
                        width={80}
                        height={80}
                        className="poststream__comments_profileImg"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: 'pointer' }}
                      />
                      <div
                        className="poststream__comments_content"
                        style={{
                          color:
                            mounted && theme === 'dark' ? 'white' : 'black',
                        }}
                      >
                        <div className="poststream__comments_name">
                          <h4>{commentItem.comment_name}</h4>
                        </div>
                        {/* <div className="poststream__comments_timestamp">
                          <p>{commentTimestampText}</p>
                        </div> */}
                        <div className="poststream__comments_description">
                          <p>{commentItem.comment_content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default PostStream;
