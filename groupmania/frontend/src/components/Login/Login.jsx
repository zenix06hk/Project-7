"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useTheme } from "../../context/theme-context";

import "./login.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()

    .min(6, "must be at least 6 characters long")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only log session changes, not on every render
  useEffect(() => {
    if (session) {
      // console.log("Session updated:", session);
    }
  }, [session]);

  //Submit the Login clicking
  const handleSubmit = async (values, { setStatus }) => {
    // console.log("Login attempt:", values.email);
    //async call
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      // console.log("Login response:", response);

      if (response?.ok) {
        // console.log("Login successful, redirecting...");
        router.push("/");
      } else {
        // console.log("Login failed:", response?.error);
        setStatus({
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error); // Keep this for debugging errors
      setStatus({
        message: "An error occurred. Please try again.",
      });
    }
  };

  // function Login() {
  return (
    <div className="loginPage">
      <div className="loginPage-content">
        <Image
          src={
            mounted && theme === "dark"
              ? "/assets/icon_and_name_dark.png"
              : "/assets/icon_and_name.png"
          }
          alt="icon"
          width={500}
          height={80}
          className="loginPage-content-companyLogo"
        />
        <h3>Sign in with your Groupomania ID</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, status }) => (
            <Form>
              <label htmlFor="email">
                Email: {isSubmitting}
                <br></br>
                <Field
                  name="email"
                  type="text"
                  className={errors.email ? "error" : ""}
                  size="50"
                />
                <br></br>
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
                <br></br>
                <ErrorMessage
                  className="error"
                  name="password"
                  component="div"
                />
              </label>
              <br></br>

              {status?.message && <div className="error">{status.message}</div>}
              <div className="loginPage-content-btns">
                <button
                  type="submit"
                  className="loginPage-content btns signIn"
                  // disabled={isSubmitting}
                  // redirect="/"
                >
                  Log in
                </button>
                <br></br>

                <div className="register-link">
                  <Link href="/register">Create account</Link>
                </div>
                <br></br>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
