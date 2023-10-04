import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./forgotpassword.css"; // You can create the CSS file for the forgot password page styles
import Navbar from "../Navbar/navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification
  const navigate = useNavigate();

  const handleSendOTP = () => {
    // Check if the email field is empty
    if (!email) {
      window.alert("Please enter your email before sending OTP.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      window.alert("Please enter all the required details.");
      return;
    }

    if (newPassword.length < 6) {
      window.alert(
        "Password length must be greater than or equal to 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      window.alert("Password and Confirm Password do not match.");
      return;
    }

    // Make an HTTP POST request to check if the email exists
    axios
      .post(
        "https://smart-learn-web-app-u8vp.onrender.com/studentdata/check-email-exists",
        {
          email,
        }
      )
      .then((response) => {
        if (response.data.exists) {
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
          console.log("No account with this email.");
          window.alert("No account with this email.");
        }
      })
      .catch((error) => {
        console.error("Failed to check email existence:", error);
        window.alert("An error occurred. Please try again later.");
      });
  };

  const handleVerifyOTP = () => {
    // Check if OTP is empty
    if (!otp) {
      window.alert("Please enter the OTP sent to your email.");
      return;
    }

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
        setOtpVerified(true); // OTP verified successfully
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        window.alert("Wrong OTP. OTP verification failed.");
      });
  };

  const handleResetPassword = () => {
    // Check if any of the required fields are empty and OTP is verified
    if (!email || !newPassword || !confirmPassword || !otpVerified) {
      window.alert("Please enter all the required details and verify OTP.");
      return;
    }

    if (newPassword.length < 6) {
      window.alert(
        "Password length must be greater than or equal to 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      window.alert("Password and Confirm Password do not match.");
      return;
    }

    // Make an HTTP POST request to update the password
    axios
      .post(
        `https://smart-learn-web-app-u8vp.onrender.com/studentdata/change-password/${email}`,
        {
          password: newPassword,
        }
      )
      .then((response) => {
        console.log("Password reset successful");
        alert("Password reset successful!");
        navigate("/studentlogin");
      })
      .catch((error) => {
        console.error("Failed to reset password:", error);
        window.alert("Failed to reset password. Please try again later.");
      });
  };

  const backgroundStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="forgot-password-container">
          <h1> Forgot Password </h1>{" "}
          <div className="input-group">
            <label> Email: </label>{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="input-group">
            <label> New Password: </label>{" "}
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          {otpSent ? (
            <div>
              <div className="input-group">
                <label> Enter OTP: </label>{" "}
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />{" "}
                <button onClick={handleVerifyOTP}> Verify OTP </button>{" "}
              </div>{" "}
            </div>
          ) : (
            <div className="input-group">
              <label> Enter OTP: </label>{" "}
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />{" "}
              <button onClick={handleSendOTP}> Send OTP </button>{" "}
            </div>
          )}{" "}
          <button
            className="reset-password-button"
            onClick={handleResetPassword}
          >
            Reset Password{" "}
          </button>{" "}
          <p>
            Remember your password ? <Link to="/studentlogin"> Login </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ForgotPassword;
