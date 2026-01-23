'use client';

import React from 'react';

import './comments.scss';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Form, Formik, Field, ErrorMessage, useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { red } from '@mui/material/colors';

const initialValues = {
  commentContent: '',
};

function Comments({ id, postComment }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');

  const RedColor = red[500];

  const handleProfileSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    setStatus(null);

    try {
      const requestBody = {
        commentContent: values.comment,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/posts/create-comment`,
        {
          method: 'POST',
          body: JSON.stringify({
            updateContent: requestBody,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setSubmitting(false);

      if (data?.success) {
        // Update display immediately with new values

        setStatus({ success: true, message: 'Comment created successfully!' });
      } else {
        setStatus({
          error: true,
          message: data?.error ?? 'Comment creation failed. Please try again.',
        });
      }
    } catch (error) {
      setSubmitting(false);
      setStatus({ error: true, message: 'Network error. Please try again.' });
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  // const handleInputChange = (e) => {
  //   setComment(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (comment.trim()) {
  //     postComment(comment, id);
  //     setComment('');
  //   }
  // };

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    // console.log(values);
    setStatus(null);
    // router.push("/home");
    //async call
    //this is a fetch call for the backend environment for api
    try {
      const requestBody = {
        // comment_content: description,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/posts/create-comment`,
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      setSubmitting(false);
      if (data?.success) {
        resetForm();
        newPostItem();
        setStatus({ success: true, message: 'success' });
      } else {
        setStatus({ error: true, message: data?.error ?? 'Error has occur' });
      }
    } catch (error) {
      console.error('Create comment error:', error);
      setSubmitting(false);
      setStatus({ error: true, message: 'Network error. Please try again.' });
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, errors, status }) => (
        <Form className="createComment">
          <label
            htmlFor="createCommentContent"
            className="createComment__label"
          >
            <Field
              name="commentContent"
              type="text"
              className={`createComment__textfield ${
                errors.commentContent ? 'error' : ''
              }`}
              placeholder="Comment here..."
              // value={description}
            />
            <ErrorMessage
              className="error"
              name="commentContent"
              component="div"
            />
          </label>
          {/* <input
            type="text"
            id="comment"
            placeholder="Comment here..."
            size="100"
            className="createPost__textfield"
            value={comment}
            onChange={handleInputChange}
          /> */}
          <Button
            type="submit"
            className="createComment__button submit"
            height="30px"
            value=""
            disabled={isSubmitting}
          >
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default Comments;
