"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { red } from "@mui/material/colors";

import "./updateProfile.scss";

// import profileImg from "../../../public/assets/hands_together";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";

// const profile_Img = profileImg;

const validationSchema = Yup.object().shape({
  about: Yup.string().max(500, "About section must not exceed 500 characters"),
  firstName: Yup.string()
    .min(2, "First name must be minimum 2 characters")
    .max(30, "First name must not be more than 30 characters"),
  lastName: Yup.string()
    .min(2, "Last name must be minimum 2 characters")
    .max(30, "Last name must not be more than 30 characters"),
  email: Yup.string().email("Invalid email format"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .when("password", {
      is: (val) => val && val.length > 0,
      then: (schema) => schema.required("Please confirm your password"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

const UpdateProfile = () => {
  const { data: session } = useSession();

  const RedColor = red[500];

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

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    // Clear any previous status
    setStatus(null);
    // console.log("Form values:", values);
    //async call
    try {
      const requestBody = {};

      // Only include fields that have values
      if (values.firstName && values.firstName.trim()) {
        requestBody.first_name = values.firstName.trim();
      }
      if (values.lastName && values.lastName.trim()) {
        requestBody.last_name = values.lastName.trim();
      }
      if (values.email && values.email.trim()) {
        requestBody.email = values.email.trim();
      }
      if (values.password && values.password.trim()) {
        requestBody.password = values.password.trim();
      }

      // console.log("Request body:", requestBody);
      // console.log("Session:", session);
      // console.log("Access Token:", session?.accessToken);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}auth/update-profile`,
        {
          method: "PUT",
          body: JSON.stringify({
            updateContent: requestBody,
            updateAvatar: session?.user?.image,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      // console.log("Response status:", res.status);
      // console.log("Response ok:", res.ok);
      const data = await res.json();
      // console.log("Response data:", data);

      setSubmitting(false);

      if (data?.success) {
        resetForm();
        setStatus({ success: true, message: "Profile updated successfully!" });
      } else {
        setStatus({
          error: true,
          message: data?.error ?? "Profile update failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setSubmitting(false);
      setStatus({ error: true, message: "Network error. Please try again." });
    }
    // setTimeout(() => {
    //  console.log(values);
    //  setSubmitting(false);
    // }, 500);
  };

  return (
    <div className="updateprofile-container">
      <div className="updateprofile-header">
        <h1>Edit your profile</h1>
      </div>

      <div className="updateprofile-content">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, status }) => (
            <div className="updateprofile-layout">
              {/* Left Side - Profile Picture Section */}
              <div className="updateprofile-left-panel">
                <div className="updateprofile-picture-section">
                  <div className="updateprofile-avatar">
                    <Image
                      src={
                        session?.user?.image ??
                        "/assets/annoymous_avatar.avif.jpg"
                      }
                      alt="Profile"
                      width={150}
                      height={150}
                      className="updateprofile-avatar-img"
                    />
                  </div>
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

                  {/* User Info Display */}
                  <div className="updateprofile-user-info">
                    <div className="updateprofile-name-row">
                      <span className="updateprofile-current-name">
                        Name:{" "}
                        {session?.user?.firstName && session?.user?.lastName
                          ? `${session.user.firstName} ${session.user.lastName}`
                          : session?.user?.name || "User Name"}
                      </span>
                    </div>
                    <div className="updateprofile-email-row">
                      <span className="updateprofile-current-email">
                        Email: {session?.user?.email || "user@example.com"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form Fields */}
              <div className="updateprofile-right-panel">
                <Form className="updateprofile-form">
                  {/* About You Section */}

                  {/* First Name Section */}
                  <div className="updateprofile-section">
                    <label htmlFor="firstName" className="updateprofile-label">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      className={`updateprofile-input ${
                        errors.firstName ? "error" : ""
                      }`}
                      placeholder=""
                    />
                    <ErrorMessage
                      className="error"
                      name="firstName"
                      component="div"
                    />
                  </div>

                  {/* Surname Section */}
                  <div className="updateprofile-section">
                    <label htmlFor="lastName" className="updateprofile-label">
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className={`updateprofile-input ${
                        errors.lastName ? "error" : ""
                      }`}
                      placeholder=""
                    />
                    <ErrorMessage
                      className="error"
                      name="lastName"
                      component="div"
                    />
                  </div>

                  {/* Email Section */}
                  <div className="updateprofile-section">
                    <label htmlFor="email" className="updateprofile-label">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`updateprofile-input ${
                        errors.email ? "error" : ""
                      }`}
                      placeholder=""
                    />
                    <ErrorMessage
                      className="error"
                      name="email"
                      component="div"
                    />
                  </div>

                  {/* Password Section */}
                  <div className="updateprofile-section">
                    <label htmlFor="password" className="updateprofile-label">
                      Change password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className={`updateprofile-input ${
                        errors.password ? "error" : ""
                      }`}
                      placeholder=""
                    />
                    <ErrorMessage
                      className="error"
                      name="password"
                      component="div"
                    />
                  </div>

                  {/* Confirm Password Section */}
                  <div className="updateprofile-section">
                    <label
                      htmlFor="confirmPassword"
                      className="updateprofile-label"
                    >
                      Confirm change password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={`updateprofile-input ${
                        errors.confirmPassword ? "error" : ""
                      }`}
                      placeholder=""
                    />
                    <ErrorMessage
                      className="error"
                      name="confirmPassword"
                      component="div"
                    />
                  </div>

                  {status?.error && (
                    <div className="error">{status.message}</div>
                  )}
                  {status?.success && (
                    <div className="success">{status.message}</div>
                  )}
                  <div></div>

                  {/* Action Buttons */}
                  <div className="updateprofile-actions">
                    <Link href="/">
                      <button
                        type="button"
                        className="updateprofile-cancel-btn"
                      >
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="updateprofile-save-btn"
                      disabled={isSubmitting}
                    >
                      Save Changes{isSubmitting}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;
