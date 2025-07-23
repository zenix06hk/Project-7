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

  console.log({ session });
  //Submit the Login clicking
  const handleSubmit = async (values, { setStatus }) => {
    console.log(values);
    //async call
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      // setSubmitting(false);
      // // if (data?.success) {
      // //   setStatus({ success: true, message: data.message });
      // if (data?.error) {
      //   alert(data.error); // Show error message from backend
      // } else if (data?.success) {
      //   console.log("Login successful", data);
      //   router.push("/home"); // Redirect to homepage
      //   // } else {
      //   //   setStatus({
      //   //     error: true,
      //   //     message: data?.error ?? "Invalid email or password",
      //   //   });
      // }

      if (response.ok) {
        router.push("/");
        // console.log("success");
      } else {
        setStatus({
          message: "invalid email or password",
        });
      }
    } catch (error) {
      setStatus({
        message: "An error occurred. Please try again.",
      });
      console.error("Error occurred during login:", error);
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

              {status?.message && <div>{status.message}</div>}
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

                {/* <div className="loginPage-content btns signIn">
                    <Link href="/home">Log In</Link>
                  </div> */}
                <Link href="/register" className="register-link">
                  Create account
                </Link>
                <br></br>
                {/* <div className="loginPage-content btns register">
                    <Link href="/register">Sign up</Link>
                  </div> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
