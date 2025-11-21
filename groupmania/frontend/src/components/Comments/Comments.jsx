'use client';

import { useState } from 'react';
import Form from 'next/form';
import { useSession } from 'next-auth/react';

import { Formik, Field, ErrorMessage, useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { red } from '@mui/material/colors';

const initialValues = {
  comment: '',
};

function Comments({ id, postComment }) {
  const [comment, setComment] = useState('');

  const RedColor = red[500];

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

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      postComment(comment, id);
      setComment('');
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, errors, status }) => (
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            id="comment"
            placeholder="Comment here..."
            size="100"
            className="createPost__textfield"
            value={comment}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="createPost__button submit"
            height="30px"
            value=""
          >
            Send
          </button>
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
        </Form>
      )}
    </Formik>
  );
}
export default Comments;
