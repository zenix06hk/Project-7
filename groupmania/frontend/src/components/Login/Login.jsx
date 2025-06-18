"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

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
  console.log({ session });
  //Submit the Login clicking
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    //async call
    try {
      const result = await signIn("credentials", {
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
      console.log(result);
    } catch (error) {
      // console.log("error");
      // setStatus({ error: true, message: "Error has occur" });
      console.error("Error occurred during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // function Login() {
  return (
    <div className="loginPage">
      <div className="loginPage-content">
        <Image
          src="/assets/icon_and_name.png"
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
          {({ isSubmitting, errors }) => (
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
              </label>
              <br></br>
              <ErrorMessage className="error" name="email" component="div" />
              <label htmlFor="password">
                Password:
                <br></br>
                <Field
                  name="password"
                  type="text"
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
              <div className="loginPage-content-btns">
                <button
                  type="submit"
                  className="loginPage-content btns signIn"
                  // disabled={isSubmitting}
                  onClick={() => router.push("/")}
                  // redirect="/"
                >
                  Log in
                </button>
                <br></br>
                {/* <div className="loginPage-content btns signIn">
                    <Link href="/home">Log In</Link>
                  </div> */}
                <button
                  type="submit"
                  className="loginPage-content btns register"
                  href="/register"
                  onClick={() => router.push("/register")}
                  // disabled={isSubmitting}
                >
                  Sign Up
                </button>
                <br></br>
                {/* <div className="loginPage-content btns register">
                    <Link href="/register">Sign up</Link>
                  </div> */}
                <a href=".">Forget password?</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
