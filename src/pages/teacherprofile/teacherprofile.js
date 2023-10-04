import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // You can choose an appropriate user icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./teacherprofile.css";

function decodeJwt(token) {
  if (!token) {
    // Handle the case where token is not set
    return null;
  }

  // JWTs consist of three parts: header, payload, and signature, separated by dots
  const [headerBase64, payloadBase64, signature] = token.split(".");

  // Decode the header and payload from base64
  const decodedHeader = atob(headerBase64);
  const decodedPayload = atob(payloadBase64);

  // Parse the JSON data in the header and payload
  const header = JSON.parse(decodedHeader);
  const payload = JSON.parse(decodedPayload);

  return { header, payload, signature };
}

function TeacherProfile() {
  const [teacherData, setTeacherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  useEffect(() => {
    const token = localStorage.getItem("teachertoken");

    // Check if token exists before decoding
    if (token) {
      const decodedToken = decodeJwt(token);
      const email = decodedToken.payload.email;

      // Make an API request to fetch all student data
      axios
        .get(
          "https://smart-learn-web-app-u8vp.onrender.com/teacherdata/getteacherdata"
        )
        .then((response) => {
          // Filter the data to find the student with the matching email
          const filteredTeacher = response.data.find(
            (teacher) => teacher.email === email
          );

          if (filteredTeacher) {
            setTeacherData(filteredTeacher);
          } else {
            console.error(`Teacher with email ${email} not found.`);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching teacher data:", error);
          setLoading(false);
        });
    } else {
      // Handle the case where token is not set
      setLoading(false);
    }
  }, []);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Link to="/teacherhome">
          {" "}
          {/* Add a Link component to navigate to /chatbox */}{" "}
          <button className="teacher-back-button">
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
          </button>{" "}
        </Link>{" "}
        <div className="teacher-profile-container">
          <style>
            {" "}
            {`
        `}{" "}
          </style>{" "}
          <h1> My Profile </h1>{" "}
          {loading ? (
            <p> Loading... </p>
          ) : (
            <div>
              <p> Name: {teacherData.name} </p>{" "}
              <p> Email: {teacherData.email} </p>{" "}
              <p> Department: {teacherData.department} </p>{" "}
              <p>
                Password:{" "}
                {showPassword ? (
                  teacherData.password
                ) : (
                  <span className="password-hidden"> ** ** ** ** </span>
                )}{" "}
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}{" "}
                </span>{" "}
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default TeacherProfile;
