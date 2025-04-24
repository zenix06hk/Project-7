"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
// import { useRouter } from "next/navigation";

import "./login.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .email("Invalid password")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  // const router = useRouter();
  //Submit the Login clicking
  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log(values);
    //async call
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}auth/sign-up`,
      {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    // console.log(res);
    setSubmitting(false);
    if (res.status === 201) {
    } else {
    }

    // setTimeout(() => {
    //  console.log(values);
    //  setSubmitting(false);
    // }, 500);
  };

  // function Login() {
  return (
    <>
      <div className="loginPage">
        <div className="loginPage-content">
          <Image
            src="/assets/icon_and_name.png"
            alt="icon"
            width={500}
            height={80}
            className="loginPage-content-companyLogo"
          />
          {/* <img
            src="/assets/hands_together.webp"
            alt="Groupmania"
            className="loginPage-content-companyLogo"
          ></img> */}
          <h3>Sign in with your Groupomania ID</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, status }) => (
              <Form>
                <label htmlFor="email">
                  Email:
                  <br></br>
                  <Field
                    name="email"
                    type="text"
                    className={errors.password ? "error" : ""}
                    size="50"
                  />
                  <ErrorMessage
                    className="error"
                    name="email"
                    component="div"
                  />
                </label>
                <br></br>
                <label htmlFor="fname">
                  Password:
                  <br></br>
                  <Field
                    name="password"
                    type="text"
                    className={errors.password ? "error" : ""}
                    size="50"
                  />
                  <ErrorMessage
                    className="error"
                    name="password"
                    component="div"
                  />
                  <br></br>
                </label>
                <br></br>
                <div className="loginPage-content-btns">
                  <div className="loginPage-content btns signIn">
                    <Link href="/home">Log In</Link>
                  </div>
                  <div className="loginPage-content btns register">
                    <Link href="/register">Sign up</Link>
                  </div>
                  <a href=".">Forget password?</a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
