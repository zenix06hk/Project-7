import React from "react";
import Form from "next/form";
import Link from "next/link";
import Image from "next/image";

import "../app/styles/main.scss";
import "../app/styles/register.scss";
// import "../app/styles/authSideImg.scss";

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

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
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    //async call
    const response = await fetch("https://example.org/post", {
      body: JSON.stringify(values),
    });
    console.log(response);
    setSubmitting(false);
    if (response.status === 201) {
    } else {
    }

    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

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
          <Form>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="firstName">
                    First Name:
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
                  <label htmlFor="password">
                    Last Name:
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
                  <label htmlFor="password">
                    Staff number:
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
                  <label htmlFor="confirm-password">
                    Confirm password:
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
                  <Link to="/">
                    <button
                      type="submit"
                      className="btn btn-signUp"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </Link>
                </form>
              )}
            </Formik>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;