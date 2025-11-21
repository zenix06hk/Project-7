'use client';

import React from 'react';

import Image from 'next/image';
import Form from 'next/form';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Formik, Field, ErrorMessage, useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { red } from '@mui/material/colors';

import './createpost.scss';
import { getUserAvatarUrl } from '@/components/utility/getUserAvatarUrl.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
  post: '',
};

const CreatePostTextField = () => {
  const { isSubmitting, status } = useFormikContext();

  return (
    <Form className="createPost_textfield">
      {/* Status Messages */}
      {status?.error && (
        <div className="createPost-status-error">
          <Alert severity="error">{status.message}</Alert>
        </div>
      )}
      {status?.success && (
        <div className="createPost-status-success">
          <Alert severity="success">{status.message}</Alert>
        </div>
      )}

      <div className="createPost-form-fields">{/* Text Field */}</div>
    </Form>
  );
};

const CreatePost = ({ userPost, postDescription, postImage, newPostItem }) => {
  const { data: session } = useSession();
  const { description, uploadedImage } = userPost;
  // console.log({ uploadedImage });

  const RedColor = red[500];

  const handleProfileSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    setStatus(null);

    try {
      const requestBody = {
        postContent: values.post,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/create-post`,
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
      setSubmitting(false);

      if (data?.success) {
        // Update display immediately with new values
        // setProfileUpdate({
        //   postContent: values.post,
        // });

        setStatus({ success: true, message: 'Post created successfully!' });
      } else {
        setStatus({
          error: true,
          message: data?.error ?? 'Post creation failed. Please try again.',
        });
      }
    } catch (error) {
      setSubmitting(false);
      setStatus({ error: true, message: 'Network error. Please try again.' });
    }
  };

  //upload file component
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
        postContent: values.post,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/create-post`,
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
        setStatus({ success: true, message: 'success' });
      } else {
        setStatus({ error: true, message: data?.error ?? 'Error has occur' });
      }
    } catch (error) {
      console.error('Create post error:', error);
      setSubmitting(false);
      setStatus({ error: true, message: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="createPost">
      <div className="createPost__container">
        <Image
          src={getUserAvatarUrl(session?.user?.image)}
          alt="icon"
          width={80}
          height={80}
          className="createPost__profileImg"
        />
        <div className="createPost__content">
          <div className="createPost__upperBlock">
            {/* <Form>
              <label htmlFor="fname"></label>
              <input
                name="postContent"
                type="text"
                id="description"
                placeholder="How's going today?"
                size="100"
                className="createPost__textfield"
                value={description}
                onChange={(e) => postDescription(e.target.value)}
              />
            </Form> */}
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting, errors, status }) => (
                <Form>
                  <label htmlFor="createPostContent">
                    <Field
                      name="postContent"
                      type="text"
                      className={`createPost__textfield ${
                        errors.postContent ? 'error' : ''
                      }`}
                      placeholder="How's going today?"
                      value={description}
                      onChange={(e) => postDescription(e.target.value)}
                    />
                    <ErrorMessage
                      className="error"
                      name="postContent"
                      component="div"
                    />
                  </label>

                  {status?.error && (
                    <div className="error">{status.message}</div>
                  )}
                  {status?.success && (
                    <div className="success">{status.message}</div>
                  )}
                  <div className="createPost__buttons">
                    <Button
                      type="submit"
                      className="createPost__button submit"
                      onClick={newPostItem}
                      height="30px"
                      value=""
                    >
                      <p>Post</p>
                    </Button>
                    <Button
                      component="label"
                      className="createPost__uploadImgBtn"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      disabled={isSubmitting}
                      value=""
                      onChange={(e) => postImage(e.target.files)}
                    >
                      Upload files{isSubmitting}
                      <VisuallyHiddenInput
                        type="file"
                        color={RedColor}
                        onChange={(event) => postImage(event.target.files)}
                        // label={'margin="none"'}
                        multiple
                      />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="createPost__bottomBlock">
            {uploadedImage && uploadedImage !== '' && (
              <Image
                src={uploadedImage}
                alt="icon"
                width="200"
                height="200"
                className="createPost__uploadImg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
