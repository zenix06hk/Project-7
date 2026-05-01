'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '../../context/theme-context';

import './commentstream.scss';

// Ensure component is mounted before using theme

const CommentStream = ({ comments }) => {
  const { theme } = useTheme();
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
          comment_time,
        } = item;

        const userFullName =
          first_name && last_name ? `${first_name} ${last_name}` : 'Username';
        const commentId = id ?? comment_id;
        const descriptionText = description ?? comment_content ?? '';
        const timestampText = comment_time
          ? new Date(comment_time).toLocaleString()
          : '';

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
              <div className="poststream__headerNameAndTime">
                <div className="commentStream__name">{userFullName}</div>
                <div className="commentStream__timestamp">{timestampText}</div>
              </div>
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
