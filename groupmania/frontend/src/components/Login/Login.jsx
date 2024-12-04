import React from "react";
import Form from "next/form";
import { Link } from "react-dom";
import Image from "next/image";

//Submit the Login clicking
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

function Login() {
  return (
    <>
      <div className="loginPage">
        <div className="loginPage-content">
          <Image
            src="/assets/icon_and_name.png"
            alt="icon"
            // fill
            width={100}
            height={80}
            className="loginPage-content-companyLogo"
            style={{
              position: "relative",
              width: "200px",
              height: "80px",
              objectFit: "cover",
            }}
          />
          {/* <img
            src="/assets/hands_together.webp"
            alt="Groupmania"
            className="loginPage-content-companyLogo"
          ></img> */}
          <h3>Sign in with your Groupmania ID</h3>
          <Form>
            <label htmlFor="fname">Email:</label>
            <br></br>
            <input type="text" id="fname" name="fname" size="50"></input>
            <br></br>
            <label htmlFor="fname">Password:</label>
            <br></br>
            <input type="text" id="fname" name="fname" size="50"></input>
            <br></br>
            <div className="loginPage-content-btns">
              {/* <Link to="/home">
                <div className="loginPage-content btns-signIn">Sign In</div>
              </Link>
              <Link to="/register">
                <div className="loginPage-content btns-register">Register</div>
              </Link> */}
            </div>
            {/* <a href=".">Forget password?</a> */}
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
