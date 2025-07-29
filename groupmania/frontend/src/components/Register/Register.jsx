"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "../../context/theme-context";

import "./register.scss";

import Link from "next/link";
import { useFormik } from "formik";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must not be more than 30 characters")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must not be more than 30 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    // console.log("Form values:", values);

    // Clear any previous status
    setStatus(null);

    //async call
    //this is a fetch call for the backend environment for api
    try {
      const requestBody = {
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}auth/sign-up`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
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
        setStatus({ success: true, message: "Account created successfully!" });
      } else {
        setStatus({
          error: true,
          message: data?.error ?? "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitting(false);
      setStatus({ error: true, message: "Network error. Please try again." });
    }
  };
  return (
    <div className="registerPage">
      <div className="registerPage-content">
        <Image
          src={
            mounted && theme === "dark"
              ? "/assets/icon_and_name_dark.png"
              : "/assets/icon_and_name.png"
          }
          alt="icon"
          width={500}
          height={80}
          className="registerPage-content-companyLogo"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, status }) => (
            <Form>
              <label htmlFor="username">
                username:
                <br></br>
                <Field
                  name="username"
                  type="text"
                  className={errors.username ? "error" : ""}
                  size="50"
                />
                <ErrorMessage
                  className="error"
                  name="username"
                  component="div"
                />
              </label>
              <br></br>
              <label htmlFor="first_name">
                First Name:
                <br></br>
                <Field
                  name="first_name"
                  type="text"
                  className={errors.first_name ? "error" : ""}
                  size="50"
                />
                <ErrorMessage
                  className="error"
                  name="first_name"
                  component="div"
                />
              </label>
              <br></br>
              <label htmlFor="last_name">
                Last Name:
                <br></br>
                <Field
                  name="last_name"
                  type="text"
                  className={errors.last_name ? "error" : ""}
                  size="50"
                />
                <ErrorMessage
                  className="error"
                  name="last_name"
                  component="div"
                />
              </label>
              <br></br>
              <label htmlFor="email">
                Email:
                <br></br>
                <Field
                  name="email"
                  type="email"
                  className={errors.email ? "error" : ""}
                  size="50"
                />
                <ErrorMessage className="error" name="email" component="div" />
              </label>
              <br></br>
              <label htmlFor="password">
                Password:
                <br></br>
                <Field
                  name="password"
                  type="password"
                  className={errors.password ? "error" : ""}
                  size="50"
                />
                <ErrorMessage
                  className="error"
                  name="password"
                  component="div"
                />
              </label>
              <br></br>
              <label htmlFor="confirmPassword">
                Confirm password:
                <br></br>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={errors.confirmPassword ? "error" : ""}
                  size="50"
                />
                <ErrorMessage
                  className="error"
                  name="confirmPassword"
                  component="div"
                />
              </label>
              <br></br>

              {status?.error && <div className="error">{status.message}</div>}
              {status?.success && (
                <div className="success">
                  {status.message} - Registration completed, please login{" "}
                  <Link href="/signin">here</Link>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="btn btn-signUp"
                  disabled={isSubmitting}
                >
                  Sign Up {isSubmitting}
                </button>
                <div className="login-link">
                  Already have an account?{" "}
                  <Link href="/signin">Back to sign in page</Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
