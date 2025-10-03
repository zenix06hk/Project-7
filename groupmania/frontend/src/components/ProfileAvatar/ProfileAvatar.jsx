import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { Box, Button, styled } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, useFormikContext } from "formik";

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
  image: "",
};

const validationSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
});

const ProfileAvatar = (session) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarStatus, setAvatarStatus] = useState(null);

  // Handle avatar file selection - same functionality as CreatePost
  const handleImageChange = (files, setFieldValue) => {
    if (files && files[0]) {
      const file = files[0];
      setFieldValue("image", file);
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
  const handleAvatarUpdate = async (values) => {
    if (!selectedAvatar) return;

    setAvatarStatus(null);

    console.log("Uploading file...");
    console.log({ values });

    // const formData = new FormData();
    // formData.append('file', file);

    try {
      // You can write the URL of your server or any other endpoint used for file upload
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/update-profile-avatar`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await result.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const reader = new FileReader();
    //   reader.onload = async (e) => {
    //     const base64Avatar = e.target.result;

    //     const res = await fetch(
    //       `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/update-profile-avatar`,
    //       {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //           updateAvatar: base64Avatar,
    //         }),
    //         headers: {
    //           'Content-type': 'application/json; charset=UTF-8',
    //           Authorization: `Bearer ${session?.accessToken}`,
    //         },
    //       }
    //     );

    //     const data = await res.json();

    //     if (data?.success) {
    //       setAvatarStatus({
    //         success: true,
    //         message: 'Avatar updated successfully!',
    //       });
    //       setSelectedAvatar(null);
    //       setAvatarPreview(null);

    //       // Refresh the page to sync avatar with header
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 1500);
    //     } else {
    //       setAvatarStatus({
    //         error: true,
    //         message: data?.error ?? 'Avatar update failed. Please try again.',
    //       });
    //     }
    //   };
    //   reader.readAsDataURL(selectedAvatar);
    // } catch (error) {
    //   setAvatarStatus({
    //     error: true,
    //     message: 'Network error. Please try again.',
    //   });
    // }
  };

  return (
    <Formik
      onSubmit={handleAvatarUpdate}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      {({ setFieldValue, errors, isSubmitting }) => (
        <Form>
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
                  (session?.user?.image ?? "/assets/annoymous_avatar.avif.jpg")
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
                name="image"
                accept="image/*"
                onChange={(event) =>
                  handleImageChange(event.target.files, setFieldValue)
                }
                multiple={false}
              />
            </Button>
            {errors?.image && <div>{errors.image}</div>}

            {/* Update Avatar Button */}
            <Button
              variant="outlined"
              type="submit"
              disabled={isSubmitting || !selectedAvatar}
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
        </Form>
      )}
    </Formik>
  );
};

export default ProfileAvatar;
