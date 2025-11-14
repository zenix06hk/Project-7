import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
// NOTE: Alert was missing in the original imports but is used in the JSX
import { Box, Button, styled, Alert } from '@mui/material';
import * as Yup from 'yup';
// Changed import from Formik/Form/useFormikContext to useFormik
import { useFormik } from 'formik';

import { getUserAvatarUrl } from '@/components/utility/getUserAvatarUrl.js';

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

const initialValues = {
  // The 'file' field will hold the actual File object
  file: '',
};

const validationSchema = Yup.object().shape({
  // Adjusted validation to check if a file object is present
  file: Yup.mixed().required('Image is required'),
});

const ProfileAvatar = ({ session, currentAvatar, onAvatarUpdate }) => {
  // Local state is still useful for immediate UI effects like the preview
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarStatus, setAvatarStatus] = useState(null);
  // const [updateAvatar, setUpdateAvatar] = useState({
  //   avatar: "",
  // });

  // 1. Define the submission handler outside of useFormik for clarity
  const handleAvatarUpdate = async (values, { setSubmitting }) => {
    // Check if the file value is a File object before proceeding
    if (!(values.file instanceof File)) {
      setAvatarStatus({ error: true, message: 'Please select an image file.' });
      setSubmitting(false);
      return;
    }

    setAvatarStatus(null);

    // Create and populate FormData
    const formData = new FormData();
    formData.append('file', values.file);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/update-profile-avatar`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = await result.json();
      console.log(data);
      // Simple status update logic
      if (result.ok) {
        setAvatarStatus({
          error: false,
          message: 'Avatar updated successfully!',
        });

        // Clear preview since we now have the updated avatar
        onAvatarUpdate(data?.avatar);
        setAvatarPreview(null);

        // Reset form after successful upload
        formik.resetForm();
      } else {
        setAvatarStatus({
          error: true,
          message: data.message || 'Failed to update avatar.',
        });
      }

      console.log(data);
    } catch (error) {
      console.error(error);
      setAvatarStatus({
        error: true,
        message: 'An unexpected error occurred.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // 2. Initialize the useFormik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleAvatarUpdate,
  });

  // Destructure Formik helpers
  const { values, errors, setFieldValue, isSubmitting, handleSubmit, touched } =
    formik;

  // 3. Image change logic is integrated with Formik's setFieldValue and local preview state
  const handleImageChange = (files) => {
    if (files && files[0]) {
      const file = files[0];

      // Update Formik state with the actual File object
      setFieldValue('file', file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // The component now returns the JSX directly, using formik helpers
  return (
    // 4. Use formik.handleSubmit on the Form element
    <form onSubmit={handleSubmit}>
      <div className="updateprofile-section-container">
        <h3>Profile Avatar</h3>

        {/* Status Messages for Avatar */}
        {avatarStatus && (
          <Box sx={{ mb: 2 }}>
            <Alert severity={avatarStatus.error ? 'error' : 'success'}>
              {avatarStatus.message}
            </Alert>
          </Box>
        )}

        <div className="updateprofile-avatar">
          {console.log('Current Avatar Value:', currentAvatar)}
          {/* Use regular img for preview/uploaded images to avoid Next.js domain issues */}
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Profile Preview"
              width={150}
              height={150}
              className="updateprofile-avatar-img"
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <Image
              src={currentAvatar}
              alt="Profile"
              width={150}
              height={150}
              className="updateprofile-avatar-img"
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          )}
        </div>
        <Button
          component="label"
          className="createPost__uploadImgBtn"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          Upload Avatar
          <VisuallyHiddenInput
            id="file"
            type="file"
            name="file"
            accept="image/*"
            // 5. Update the onChange handler to use the integrated function
            onChange={(event) => handleImageChange(event.target.files)}
          />
        </Button>
        {/* Display Formik error for the file field */}
        {touched.file && errors.file && <div>{errors.file}</div>}

        {/* Update Avatar Button */}
        <Button
          variant="outlined"
          type="submit"
          // Disable if submitting OR if 'file' value is not a File object (meaning no file selected yet)
          disabled={isSubmitting || !(values.file instanceof File)}
          sx={{
            width: '100%',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 500,
            border: '1px solid #ffdbdb',
            backgroundColor: 'transparent',
            color: 'var(--text-color)',
            minWidth: '160px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #ffdbdb',
            },
            '&:disabled': {
              opacity: 0.6,
              cursor: 'not-allowed',
            },
          }}
        >
          {isSubmitting ? 'Updating...' : 'Update Avatar'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileAvatar;
