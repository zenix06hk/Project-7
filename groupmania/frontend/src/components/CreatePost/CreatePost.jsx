"use client";

import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Form from "next/form";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { red } from "@mui/material/colors";

import "./createpost.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

// export default function Form() {
//   const [submit, setSubmit] = useState();
//   const [error, setError] = useState(null);

function CreatePost({ userPost, postDescription, postImage, newPostItem }) {
  const { name, img, description, uploadedImage } = userPost;
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
  // const [file, setFile] = useState();
  // function handleChange(e) {
  //   console.log(e.target.file);
  //   setFile(URL.createObjectURL(e.target.file[0]));
  // }

  // const handleImageUpload = (e) => {
  //   const [file] = e.target.files;
  //   if (file) {
  //     console.log(file);
  //   }
  // };
  return (
    <div className="createPost__container">
      <Image
        src="/assets/profile_image.jpg"
        alt="icon"
        width={80}
        height={80}
        className="createPost__profileImg"
      />
      <div className="createPost__content">
        <div className="createPost__upperBlock">
          {/* <div className="createPost__test"> */}
          <Form>
            <label htmlFor="fname"></label>
            <input
              type="text"
              id="description"
              placeholder="How's going today?"
              size="100"
              className="createPost__textfield"
              value={description}
              onChange={(e) => postDescription(e.target.value)}
            />
            <label htmlFor="image"></label>
            {/* <input
              type="file"
              id="image"
              name="image"
              value=""
              onChange={(e) => postImage(e.target.files)}
            /> */}
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
                onChange={(event) => console.log(event.target.files)}
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
          {/* </div> */}
        </div>
        <div className="createPost__bottomBlock">
          {uploadedImage && (
            <Image
              src={uploadedImage}
              alt="icon"
              width="300"
              height="300"
              className="createPost__uploadImg"
            />
          )}
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple={true}
          /> */}

          {/* <div className="createPost_button photo"> */}
          {/* <button
            type="submit"
            className="createPost__button photo"
            onClick={postImage}
          >
            <FontAwesomeIcon
              icon={faPhotoFilm}
              className="createPost__container-tab-icon"
              width="30px"
              height="30px"
            />
            <p>Photo</p>
          </button> */}
          {/* </div> */}
          {/* <div className="createPost_button submit" onClick={newPostItem}> */}

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
