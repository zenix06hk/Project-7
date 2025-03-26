"use client";

import React from "react";
import Image from "next/image";

import "./register.scss";

import { useFormik } from "formik";
import { Formik, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Name must be minimum 2")
    .max(30, "Name must not be more than 100 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const router = useRouter();

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    // router.push("/home");
    //async call
    // const response = await fetch("https://example.org/post", {
    //   body: JSON.stringify(values),
    // });
    // console.log(response);
    setSubmitting(false);
    // if (response.status === 201) {
    // } else {
    // }
    // setTimeout(() => {
    //   console.log(values);
    //   setSubmitting(false);
    // }, 500);
  };
  return (
    <>
      <div className="registerPage">
        <div className="registerPage-content">
          <Image
            src="/assets/icon_and_name.png"
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
            {({ isSubmitting, errors, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                  Username:
                  <br></br>
                  <Field
                    name="username"
                    type="text"
                    className={errors.password ? "error" : ""}
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
                    className={errors.password ? "error" : ""}
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
                    className={errors.password ? "error" : ""}
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
                  <ErrorMessage
                    className="error"
                    name="email"
                    component="div"
                  />
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
                    className={errors.password ? "error" : ""}
                    size="50"
                  />
                  <ErrorMessage
                    className="error"
                    name="confirmPassword"
                    component="div"
                  />
                </label>
                <br></br>
                <div>
                  <button
                    type="submit"
                    className="btn btn-signUp"
                    disabled={isSubmitting}
                  >
                    Sign Up {isSubmitting}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
