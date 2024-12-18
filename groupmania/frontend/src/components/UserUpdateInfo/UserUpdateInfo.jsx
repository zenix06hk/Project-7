import React from "react";
import { Link } from "react-router-dom";

import "./userUpdateInfo.scss";

import profileImg from "../../../public/assets/hands_together";

import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";

const profile_Img = profileImg;

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

function UserUpdateInfo() {
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

    // setTimeout(() => {
    //  console.log(values);
    //  setSubmitting(false);
    // }, 500);
  };

  return (
    <div className="userupdate-container">
      <h1> Profile Update</h1>
      <div className="userupdate-container-content">
        <div className="userupdate-container-img">
          <img
            src={profile_Img}
            alt="Groupmania"
            className="userupdate-profileImg"
          ></img>
        </div>
        <div className="userupdate-profileImg-upload">
          <p>Upload photo</p>
        </div>
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
              <Link to="/home">
                <button
                  type="submit"
                  className="btn btn-signUp"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserUpdateInfo;
