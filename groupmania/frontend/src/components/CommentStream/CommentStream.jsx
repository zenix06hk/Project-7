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
  faComment,
} from '@fortawesome/free-solid-svg-icons';

import './commentstream.scss';
import CreateComment from '../CreateComment/CreateComment';

// Ensure component is mounted before using theme

const CommentStream = ({ comments }) => {
  const [hasErrorFetching, setHasErrorFetching] = useState('');
  const { data: session, status, update } = useSession();
  const [isComplete, setIsComplete] = useState(false);
  const { theme } = useTheme();
  const [postsStream, setPostsStream] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  return (
    <div className="commentStream">
      {comments.map((item, index) => {
        const {
          id,
          first_name,
          last_name,
          description,
          comment_id,
          comment_content,
          timestamp,
        } = item;

        const userFullName =
          first_name && last_name ? `${first_name} ${last_name}` : 'Username';
        const commentId = id ?? comment_id;
        const descriptionText = description ?? comment_content ?? '';

        return (
          <div
            key={index}
            style={{
              color: mounted && theme === 'dark' ? 'white' : 'black',
            }}
            className="commentStream__container"
          >
            <Image
              src="/assets/profile_image.jpg"
              alt="icon"
              width={80}
              height={80}
              className="commentStream__profileImg"
            />
            <div className="commentStream__content">
              <div className="commentStream__name"></div>
              <div className="commentStream__upperBlock"></div>
              <label htmlFor="fname"></label>
              {/* Display submitted comments */}
              {Array.isArray(comments) && comments.length > 0 && (
                <div className="commentStream__comments_list">
                  <h4>Comments:</h4>
                  {comments.map((commentItem, commentIndex) => (
                    <div key={commentIndex} className="poststream__comment">
                      <div>{commentItem.comment_name}</div>
                      <p>{commentItem.comment_content}</p>
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
export default CommentStream;
