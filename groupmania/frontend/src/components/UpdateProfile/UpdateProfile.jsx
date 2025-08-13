"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { red } from "@mui/material/colors";
import { Box, Alert } from "@mui/material";

import "./updateProfile.scss";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";

// Validation schemas for each section
const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must be minimum 2 characters")
    .max(30, "First name must not be more than 30 characters"),
  lastName: Yup.string()
    .trim()
    .min(2, "Last name must be minimum 2 characters")
    .max(30, "Last name must not be more than 30 characters"),
  email: Yup.string().trim().email("Invalid email format"),
});

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const UpdateProfile = () => {
  const { data: session, status } = useSession();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarStatus, setAvatarStatus] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/user-profile`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await res.json();
    }

    if (status === "loading") {
      console.log("do nothing");
      return;
    }

    if (status === "authenticated") {
      fetchUserProfile();
    } else {
      console.log("something gone wrong");
    }
  }, [session]);

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  console.log("token?", session?.accessToken);

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

  // Handle avatar file selection - same functionality as CreatePost
  const postImage = (files) => {
    if (files && files[0]) {
      const file = files[0];
      setSelectedAvatar(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle avatar update
  const handleAvatarUpdate = async () => {
    if (!selectedAvatar) return;

    setAvatarStatus(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Avatar = e.target.result;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}auth/update-profile`,
          {
            method: "PUT",
            body: JSON.stringify({
              updateAvatar: base64Avatar,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        const data = await res.json();

        if (data?.success) {
          setAvatarStatus({
            success: true,
            message: "Avatar updated successfully!",
          });
          setSelectedAvatar(null);
          setAvatarPreview(null);

          // Refresh the page to sync avatar with header
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setAvatarStatus({
            error: true,
            message: data?.error ?? "Avatar update failed. Please try again.",
          });
        }
      };
      reader.readAsDataURL(selectedAvatar);
    } catch (error) {
      console.error("Avatar update error:", error);
      setAvatarStatus({
        error: true,
        message: "Network error. Please try again.",
      });
    }
  };

  // Profile section initial values and handler
  const profileInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const handleProfileSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    setStatus(null);

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

      // Check if at least one field is provided
      if (Object.keys(requestBody).length === 0) {
        setStatus({
          error: true,
          message: "Please fill at least one field to update.",
        });
        setSubmitting(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}auth/update-profile`,
        {
          method: "PUT",
          body: JSON.stringify({
            updateContent: requestBody,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = await res.json();
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
  };

  // Password section initial values and handler
  const passwordInitialValues = {
    password: "",
    confirmPassword: "",
  };

  const handlePasswordSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    setStatus(null);

    try {
      // Check if both password fields are provided and match
      if (!values.password || !values.confirmPassword) {
        setStatus({
          error: true,
          message: "Both password fields are required.",
        });
        setSubmitting(false);
        return;
      }

      if (values.password !== values.confirmPassword) {
        setStatus({ error: true, message: "Passwords do not match." });
        setSubmitting(false);
        return;
      }

      const requestBody = {
        password: values.password.trim(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}auth/update-profile`,
        {
          method: "PUT",
          body: JSON.stringify({
            updateContent: requestBody,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = await res.json();
      setSubmitting(false);

      if (data?.success) {
        resetForm();
        setStatus({ success: true, message: "Password changed successfully!" });
      } else {
        setStatus({
          error: true,
          message: data?.error ?? "Password change failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Password change error:", error);
      setSubmitting(false);
      setStatus({ error: true, message: "Network error. Please try again." });
    }
  };

  return (
    <div className="updateprofile-container">
      <div className="updateprofile-header">
        <h1>Edit your profile</h1>
      </div>

      <div className="updateprofile-content">
        <div className="updateprofile-layout">
          {/* Left Side - Profile Picture Section */}
          <div className="updateprofile-left-panel">
            <div className="updateprofile-picture-section">
              <div className="updateprofile-section-container">
                <h3>Profile Avatar</h3>

                {/* Status Messages for Avatar */}
                {avatarStatus && (
                  <Box sx={{ mb: 2 }}>
                    <Alert severity={avatarStatus.error ? "error" : "success"}>
                      {avatarStatus.message}
                    </Alert>
                  </Box>
                )}

                <div className="updateprofile-avatar">
                  <Image
                    src={
                      avatarPreview ||
                      (session?.user?.image ??
                        "/assets/annoymous_avatar.avif.jpg")
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
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  Upload Avatar
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => postImage(event.target.files)}
                    multiple={false}
                  />
                </Button>

                {/* Update Avatar Button */}
                <Button
                  variant="outlined"
                  onClick={handleAvatarUpdate}
                  disabled={!selectedAvatar}
                  sx={{
                    width: "100%",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: 500,
                    border: "1px solid #ffdbdb",
                    backgroundColor: "transparent",
                    color: "var(--text-color)",
                    minWidth: "160px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid #ffdbdb",
                    },
                    "&:disabled": {
                      opacity: 0.6,
                      cursor: "not-allowed",
                    },
                  }}
                >
                  Update Avatar
                </Button>
              </div>

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
            {/* Section 1: Profile Information */}
            <div className="updateprofile-section-container">
              <h3>Profile Information</h3>
              <Formik
                initialValues={profileInitialValues}
                validationSchema={profileValidationSchema}
                onSubmit={handleProfileSubmit}
              >
                {({ isSubmitting, errors, status }) => (
                  <Form className="updateprofile-form">
                    {/* First Name Section */}
                    <div className="updateprofile-section">
                      <label
                        htmlFor="firstName"
                        className="updateprofile-label"
                      >
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

                    {/* Last Name Section */}
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

                    {/* Status Messages */}
                    {status?.error && (
                      <div className="error">{status.message}</div>
                    )}
                    {status?.success && (
                      <div className="success">{status.message}</div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="updateprofile-save-btn"
                      disabled={isSubmitting}
                    >
                      Update Profile {isSubmitting && "..."}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            {/* Section 2: Password Change */}
            <div className="updateprofile-section-container">
              <h3>Change Password</h3>
              <Formik
                initialValues={passwordInitialValues}
                validationSchema={passwordValidationSchema}
                onSubmit={handlePasswordSubmit}
              >
                {({ isSubmitting, errors, status }) => (
                  <Form className="updateprofile-form">
                    {/* Password Section */}
                    <div className="updateprofile-section">
                      <label htmlFor="password" className="updateprofile-label">
                        New Password
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
                        Confirm New Password
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

                    {/* Status Messages */}
                    {status?.error && (
                      <div className="error">{status.message}</div>
                    )}
                    {status?.success && (
                      <div className="success">{status.message}</div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="updateprofile-save-btn"
                      disabled={isSubmitting}
                    >
                      Change Password {isSubmitting && "..."}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            {/* Action Buttons */}
            <div className="updateprofile-actions">
              <Link href="/">
                <button type="button" className="updateprofile-cancel-btn">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
