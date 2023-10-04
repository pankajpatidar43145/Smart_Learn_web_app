import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./studentregister.css"; // You can create the CSS file for the registration page styles
import Navbar from "../Navbar/navbar";

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent
  const navigate = useNavigate();

  const handleSendOTP = () => {
    // Check if any of the required fields are empty
    if (!name || !email || !department || !password || !confirmPassword) {
      // Display an alert message
      window.alert("Please enter all the above details before sending OTP.");
      return;
    }
    if (password.length < 6) {
      window.alert(
        "Password length must be greater than or equal to 6 characters."
      );
      return;
    }
    if (password !== confirmPassword) {
      // Display an alert message
      window.alert("Password and Confirm Password do not match.");
      return;
    }

    // Make an HTTP POST request to send OTP
    axios
      .post(
        "https://smart-learn-web-app-u8vp.onrender.com/studentdata/check-email-exists",
        {
          email,
        }
      )
      .then((response) => {
        if (!response.data.exists) {
          // Email exists, continue with sending OTP
          axios
            .post(
              "https://smart-learn-web-app-u8vp.onrender.com/otpRoutes/send-otp",
              {
                email,
              }
            )
            .then(async (response) => {
              console.log("OTP sent successfully");
              // Display an alert message
              alert("Please check your Gmail for the OTP.");
              // Update state to show the message
              setOtpSent(true);

              // Store the OTP
              try {
                await axios.post(
                  "https://smart-learn-web-app-u8vp.onrender.com/verifyRoutes/storeotp",
                  {
                    email,
                    otp: response.data.otp, // Assuming the OTP is available in the response data
                  }
                );

                console.log("OTP stored successfully");
              } catch (storeError) {
                console.error("Failed to store OTP:", storeError);
              }
            })
            .catch((error) => {
              console.error("Failed to send OTP:", error);
              // Display an alert message
              window.alert("Failed to send OTP. Please try again later.");
            });
        } else {
          // Email doesn't exist in your database
          console.log("An account with this email already exists.");
          window.alert("An account with this email already exists.");
        }
      })
      .catch((error) => {
        console.error("Failed to check email existence:", error);
        window.alert("An error occurred. Please try again later.");
      });
  };

  const handleRegister = () => {
    // Implement your registration logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Department:", department);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("OTP:", otp);

    // Make an HTTP POST request to verify the OTP
    axios
      .post(
        "https://smart-learn-web-app-u8vp.onrender.com/verifyRoutes/verifyOTP",
        {
          email,
          otp,
        }
      )
      .then((response) => {
        console.log("OTP verification successful");
        // Display a success message for OTP verification
        alert("OTP verification successful!");

        // Make an HTTP POST request to store the registration data
        axios
          .post(
            "https://smart-learn-web-app-u8vp.onrender.com/studentdata/create",
            {
              name,
              email,
              department,
              password,
            }
          )
          .then((response) => {
            console.log("Registration successful");
            // Display a success message for registration
            alert("Registration successful!");
            navigate("/studentlogin");
          })
          .catch((error) => {
            console.error("Failed to store registration data:", error);
            // Display an error message for registration
            window.alert(
              "Failed to store registration data. Please try again later."
            );
          });
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        // Display an error message for wrong OTP
        window.alert("Wrong OTP. Registration failed.");
      });
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
        <div className="register-container">
          <h1> Student Register </h1>{" "}
          <div className="input-group">
            <label> Name: </label>{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="input-group">
            <label> Email: </label>{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="input-group">
            <label> Department: </label>{" "}
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
          <div className="input-group">
            <label> Confirm Password: </label>{" "}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="input-group">
            <label> Enter OTP: </label>{" "}
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />{" "}
            <button onClick={handleSendOTP}> Send OTP </button>{" "}
          </div>{" "}
          {otpSent && <p> Please check your Gmail for the OTP. </p>}{" "}
          <button className="register-button" onClick={handleRegister}>
            Register{" "}
          </button>{" "}
          <p>
            Already have an account ? <Link to="/studentlogin"> Login </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default StudentRegister;
