'use client';

import React from 'react';

import './createcomments.scss';

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

const CreateComment = ({
  postId,
  submitComment,
  userComment,
  commentDescription,
  commentImage,
  newCommentItem,
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');

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
        comment_content: values.commentContent,
        post_id: postId,
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
        // newPostItem();
        setStatus({ success: true, message: 'success' });
        submitComment();
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
          <Button
            type="submit"
            className="createComment__button submit"
            height="30px"
            value=""
          >
            Send{isSubmitting}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default CreateComment;
