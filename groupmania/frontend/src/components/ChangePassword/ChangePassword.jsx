import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';

import './changepassword.scss';

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const ChangePassword = ({ accessToken }) => {
  const passwordInitialValues = {
    password: '',
    confirmPassword: '',
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
          message: 'Both password fields are required.',
        });
        setSubmitting(false);
        return;
      }

      if (values.password !== values.confirmPassword) {
        setStatus({ error: true, message: 'Passwords do not match.' });
        setSubmitting(false);
        return;
      }

      const requestBody = {
        password: values.password.trim(),
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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      setSubmitting(false);

      if (data?.success) {
        resetForm();
        setStatus({ success: true, message: 'Password changed successfully!' });
      } else {
        setStatus({
          error: true,
          message: data?.error ?? 'Password change failed. Please try again.',
        });
      }
    } catch (error) {
      setSubmitting(false);
      setStatus({ error: true, message: 'Network error. Please try again.' });
    }
  };

  return (
    <div>
      {/* Section 2: Password Change */}
      <div className="updateprofile0-section-container">
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
                    errors.password ? 'error' : ''
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
                    errors.confirmPassword ? 'error' : ''
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
              {status?.error && <div className="error">{status.message}</div>}
              {status?.success && (
                <div className="success">{status.message}</div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                className="changepassword-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Changing...' : 'Change Password'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
