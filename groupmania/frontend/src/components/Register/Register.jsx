"use client";

import React, { useState } from "react";
import Image from "next/image";

import "./register.scss";

import Link from "next/link";
import { useFormik } from "formik";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Name must be minimum 6")
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

const initialValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const router = useRouter();

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    setSubmitting(true);
    console.log(values);

    // router.push("/home");
    //async call
    //this is a fetch call for the backend environment for api
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}auth/sign-up`,
        {
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setSubmitting(false);
      if (data?.success) {
        resetForm();
        setStatus({ success: true, message: "success" });
      } else {
        setStatus({ error: true, message: data?.error ?? "Error has occur" });
      }
    } catch (error) {
      console.log("error");
      setStatus({ error: true, message: "Error has occur" });
    }
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
            {({ isSubmitting, errors, status }) => (
              <Form>
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

                {status?.error && <div className="error">{status.message}</div>}
                {status?.success && (
                  <div className="error">
                    {status.message} - Register completed, please login
                    <Link href="/login">here</Link>
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
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
