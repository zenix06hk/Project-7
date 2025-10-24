"use client";

import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Form from "next/form";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { red } from "@mui/material/colors";

import "./createpost.scss";
import { getUserAvatarUrl } from "@/components/utility/getUserAvatarUrl.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

const initialValues = {
  post: "",
};

const CreatePost = ({ userPost, postDescription, postImage, newPostItem }) => {
  const { data: session } = useSession();
  const { description, uploadedImage } = userPost;
  // console.log({ uploadedImage });

  const RedColor = red[500];

  //upload file component
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
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
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      setSubmitting(false);
      if (data?.success) {
        resetForm();
        setStatus({ success: true, message: "success" });
      } else {
        setStatus({ error: true, message: data?.error ?? "Error has occur" });
      }
    } catch (error) {
      console.error("Create post error:", error);
      setSubmitting(false);
      setStatus({ error: true, message: "Network error. Please try again." });
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
            <Form>
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
              <label htmlFor="image"></label>
              <Button
                component="label"
                className="createPost__uploadImgBtn"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                value=""
                onChange={(e) => postImage(e.target.files)}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  color={RedColor}
                  onChange={(event) => postImage(event.target.files)}
                  label={'margin="none"'}
                  multiple
                />
              </Button>
            </Form>
            <button
              type="submit"
              className="createPost__button submit"
              onClick={newPostItem}
              height="30px"
              value=""
            >
              <p>Post</p>
            </button>
          </div>
          <div className="createPost__bottomBlock">
            {uploadedImage && uploadedImage !== "" && (
              <Image
                src={uploadedImage}
                alt="icon"
                width="300"
                height="300"
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
