import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./teacherlogin.css";
import Navbar from "../Navbar/navbar";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if email and password are provided
    if (!email || !password) {
      window.alert("Please enter both email and password.");
      return;
    }

    // Make a POST request to your login endpoint with email and password
    axios
      .post(
        "https://smart-learn-web-app-u8vp.onrender.com/teacher/teacherlogin",
        {
          email,
          password,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;

          // Store the token in localStorage
          localStorage.setItem("teachertoken", token);

          // Redirect to the student home page
          navigate(`/teacherhome`);
        } else {
          // Authentication failed
          window.alert("Email or password is incorrect.");
        }
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        window.alert("Email or password is incorrect.");
      });
  };

  const handleRegister = () => {
    // Navigate to the teacherregister route
    navigate("/teacherregister");
  };
  const handleForgotPassword = () => {
    navigate("/teaforgotpassword");
  };

  const backgroundStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Ensure the background covers the entire viewport
    display: "flex", // Use flexbox to center content
    alignItems: "center", // Vertically center content
    justifyContent: "center", // Horizontally center content
  };

  return (
    <div>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="login-container d-flex justify-center align-items-center">
          <h1> Teacher Login </h1>{" "}
          <div className="input-group">
            <label> Email: </label>{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="input-group">
            <label> Password: </label>{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </div>{" "}
          <button className="login-button" onClick={handleLogin}>
            Login{" "}
          </button>{" "}
          <p>
            Don 't have an account?{" "}
            <button className="register-button" onClick={handleRegister}>
              Register{" "}
            </button>{" "}
          </p>{" "}
          <p>
            <button
              className="forgot-password-button"
              onClick={handleForgotPassword}
            >
              Forgot Password{" "}
            </button>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default TeacherLogin;
