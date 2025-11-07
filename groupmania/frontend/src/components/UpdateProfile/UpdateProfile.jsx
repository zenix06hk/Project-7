'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Alert } from '@mui/material';

import './updateProfile.scss';
import ChangePassword from '../ChangePassword/ChangePassword';

import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { getUserAvatarUrl } from '../utility/getUserAvatarUrl';

// Validation schemas for each section

const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, 'First name must be minimum 2 characters')
    .max(30, 'First name must not be more than 30 characters'),
  lastName: Yup.string()
    .trim()
    .min(2, 'Last name must be minimum 2 characters')
    .max(30, 'Last name must not be more than 30 characters'),
  email: Yup.string().trim().email('Invalid email format'),
});

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

// Styled Button component for minimized Material-UI styling
const UpdateButton = styled(Button)({
  alignSelf: 'flex-end',
  marginTop: '20px',
  borderRadius: '8px',
  padding: '20px 50px',
  fontSize: '14px',
  fontWeight: 500,
  border: '1px solid #ffdbdb',
  backgroundColor: 'transparent',
  color: 'var(--text-color)',
  minWidth: '120px',
  textTransform: 'none',
  '&:hover:not(:disabled)': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid #ffdbdb',
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

// Styled TextField component that adapts to light/dark mode
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--text-color, #000)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--hover-color, #2196f3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--focus-color, #1976d2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--text-color, #000)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--focus-color, #1976d2)',
  },
  '& .MuiOutlinedInput-input': {
    color: 'var(--text-color, #000)',
  },
  '& .MuiFormHelperText-root': {
    color: 'var(--text-color, #000)',
  },
});

// Custom hook to get field props for Material-UI TextField
const useFieldProps = (fieldName, label, type = 'text') => {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext();

  return {
    fullWidth: true,
    id: fieldName,
    name: fieldName,
    label: label,
    type: type,
    variant: 'outlined',
    value: values[fieldName] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[fieldName] && Boolean(errors[fieldName]),
    helperText: touched[fieldName] && errors[fieldName],
  };
};

// Component that uses Formik context - must be inside Formik
const ProfileFormFields = () => {
  const { isSubmitting, status } = useFormikContext();

  return (
    <Form className="updateprofile-form">
      {/* Status Messages */}
      {status?.error && (
        <div className="updateprofile-status-error">
          <Alert severity="error">{status.message}</Alert>
        </div>
      )}
      {status?.success && (
        <div className="updateprofile-status-success">
          <Alert severity="success">{status.message}</Alert>
        </div>
      )}

      <div className="updateprofile-form-fields">
        {/* First Name Section */}
        <StyledTextField {...useFieldProps('firstName', 'First Name')} />

        {/* Last Name Section */}
        <StyledTextField {...useFieldProps('lastName', 'Last Name')} />

        {/* Email Section */}
        <StyledTextField {...useFieldProps('email', 'Email', 'email')} />

        {/* Submit Button */}
        <UpdateButton type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </UpdateButton>
      </div>
    </Form>
  );
};

const UpdateProfile = () => {
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorFetching, setHasErrorFetching] = useState('');
  const [profileUpdate, setProfileUpdate] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // State for avatar updates across all components
  const [currentAvatar, setCurrentAvatar] = useState(null);
  useEffect(() => {
    // the method used to fetch my profile
    async function fetchUserProfile() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/user-profile`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        // Check if the response is actually JSON
        const data = await res.json();
        if (!data.success) {
          setIsLoading(false);
          setHasErrorFetching(data.error || 'something has gone wrong.');
          return <></>;
        }

        setProfileUpdate({
          ...profileUpdate,
          ...data.user,
        });

        // Initialize display info
        setProfileUpdate({
          firstName: data.user?.firstName || '',
          lastName: data.user?.lastName || '',
          email: data.user?.email || '',
        });

        // Initialize current avatar - backend returns 'image' field for avatar
        setCurrentAvatar(getUserAvatarUrl(data.user?.image));

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setHasErrorFetching('error has occurred');
      }
    }
    if (status == 'loading') {
      {
        //if status is loading, wait to loading
        return;
      }
    }

    if (status === 'authenticated') {
      fetchUserProfile();
    } else {
      console.log('user not authenticated');
    }
  }, [session]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (hasErrorFetching) {
    return <div>{hasErrorFetching}</div>;
  }

  // Profile section initial values and handler

  const handleProfileSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    setStatus(null);

    try {
      const requestBody = {
        firstName: values.firstName?.trim(),
        lastName: values.lastName?.trim(),
        email: values.email?.trim(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/update-profile`,
        {
          method: 'PUT',
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
        setProfileUpdate({
          firstName: values.firstName?.trim() || '',
          lastName: values.lastName?.trim() || '',
          email: values.email?.trim() || '',
        });

        setStatus({ success: true, message: 'Profile updated successfully!' });
      } else {
        setStatus({
          error: true,
          message: data?.error ?? 'Profile update failed. Please try again.',
        });
      }
    } catch (error) {
      setSubmitting(false);
      setStatus({ error: true, message: 'Network error. Please try again.' });
    }
  };

  const onAvatarUpdate = async (newAvatarUrl) => {
    console.log('Avatar updated to URL:', newAvatarUrl);
    setCurrentAvatar(getUserAvatarUrl(newAvatarUrl));

    try {
      // Update the session with the new image
      await update({ image: newAvatarUrl });
      console.log('Session updated successfully with new avatar');
    } catch (error) {
      console.error('Failed to update session:', error);
    }
  };

  // Avatar update handler to be passed to ProfileAvatar

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
              <ProfileAvatar
                session={session}
                currentAvatar={currentAvatar}
                onAvatarUpdate={onAvatarUpdate}
              />

              {/* User Info Display */}
              <div className="updateprofile-user-info">
                <div className="updateprofile-name-row">
                  <span className="updateprofile-current-name">
                    Name:{' '}
                    {profileUpdate?.firstName && profileUpdate?.lastName
                      ? `${profileUpdate.firstName} ${profileUpdate.lastName}`
                      : 'Loading...'}
                  </span>
                </div>
                <div className="updateprofile-email-row">
                  <span className="updateprofile-current-name">
                    Email: {profileUpdate?.email || 'Loading...'}
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
                initialValues={{
                  firstName: profileUpdate?.firstName || '',
                  lastName: profileUpdate?.lastName || '',
                  email: profileUpdate?.email || '',
                }}
                validationSchema={profileValidationSchema}
                enableReinitialize={true}
                onSubmit={handleProfileSubmit}
              >
                <ProfileFormFields />
              </Formik>
            </div>

            <ChangePassword accessToken={session?.accessToken} />

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
