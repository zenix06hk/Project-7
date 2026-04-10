'use client';

import React, { use } from 'react';

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Form, Formik, Field, ErrorMessage } from 'formik';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { red } from '@mui/material/colors';

import './createpost.scss';
import { getUserAvatarUrl } from '@/components/utility/getUserAvatarUrl.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
  postContent: '',
};

const CreatePost = ({ userPost, newPostItem }) => {
  const { data: session } = useSession();
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const RedColor = red[500];

  // const handleProfileSubmit = async (
  //   values,
  //   { setSubmitting, setStatus, resetForm }
  // ) => {
  //   setSubmitting(true);
  //   setStatus(null);

  //   try {
  //     const requestBody = {
  //       postContent: values.post,
  //     };

  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_API}/api/posts/create-post`,
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           updateContent: requestBody,
  //         }),
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //           Authorization: `Bearer ${session?.accessToken}`,
  //         },
  //       }
  //     );

  //     const data = await res.json();
  //     // console.log(data);
  //     setSubmitting(false);

  //     if (data?.success) {
  //       // Update display immediately with new values
  //       resetForm();
  //       setStatus({ success: true, message: 'Post created successfully!' });
  //     } else {
  //       setStatus({
  //         error: true,
  //         message: data?.error ?? 'Post creation failed. Please try again.',
  //       });
  //     }
  //   } catch (error) {
  //     setSubmitting(false);
  //     setStatus({ error: true, message: 'Network error. Please try again.' });
  //   }
  // };

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
      // if (!(values.file instanceof File)) {
      //   console.log('No file selected or invalid file type.');
      //   return;
      // }

      const formData = new FormData();
      console.log(formData, 'form data');
      formData.append('file', values.file);
      formData.append('description', values.description);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/posts/create-post`,
        {
          method: 'POST',
          body: formData,
          headers: {
            // 'Content-type': 'application/json; charset=UTF-8',
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
      console.error('Create post error:', error);
      setSubmitting(false);
      setStatus({ error: true, message: 'Network error. Please try again.' });
    }
  };

  const handleImageChange = (files, setFieldValue) => {
    if (files && files[0]) {
      const file = files[0];

      setFieldValue('file', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (value, setFieldValue) => {
    setDescription(value);
    setFieldValue('description', value);
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
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting, errors, status, setFieldValue }) => (
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
                      onChange={(e) =>
                        handleDescriptionChange(e.target.value, setFieldValue)
                      }
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
                      onChange={(e) =>
                        handleImageChange(e.target.files, setFieldValue)
                      }
                    >
                      Upload files{isSubmitting}
                      <VisuallyHiddenInput
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        color={RedColor}
                        onChange={(event) =>
                          handleImageChange(event.target.files, setFieldValue)
                        }
                        multiple
                      />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="createPost__bottomBlock">
            {imagePreview && imagePreview !== '' && (
              <Image
                src={imagePreview}
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
