import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./teachervideos.css";
import Navbar from "../Navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // You can choose an appropriate user icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

function TimestampsPage() {
  const token = localStorage.getItem("teachertoken");
  const decodedToken = decodeJwt(token);
  const email = decodedToken.payload.email;
  console.log(email);
  const [videoDescriptions, setVideoDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideoDescriptions, setFilteredVideoDescriptions] = useState(
    []
  );

  useEffect(() => {
    // Fetch data from the API using the extracted email
    fetch(
      `https://smart-learn-web-app-u8vp.onrender.com/timestamps/getTimestampsByEmail?email=${email}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an array with timestamps documents
        const descriptions = data.map(
          (timestamp) => timestamp.videoDescription
        );
        setVideoDescriptions(descriptions);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [email]);

  useEffect(() => {
    // Filter video descriptions based on the search query
    const filteredDescriptions = videoDescriptions.filter((description) =>
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVideoDescriptions(filteredDescriptions);
  }, [searchQuery, videoDescriptions]);

  const navigateToTimestamp = (index) => {
    // Navigate to the new route with the data for the selected index
    window.location.href = `/teacherstamp/${index}`;
  };

  if (loading) {
    return <div className="timestampspage-loading"> Loading... </div>;
  }

  if (error) {
    return <div className="timestampspage-error"> Error: {error.message} </div>;
  }
  const backgroundStyle = {
    background: "linear-gradient(45deg, #f7f7f7, #e3e3e3)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "block",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div>
      <Navbar />
      <div style={backgroundStyle}>
        <Link to="/teacherhome">
          {" "}
          {/* Add a Link component to navigate to /chatbox */}{" "}
          <button className="teacher-video-back-button">
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
          </button>{" "}
        </Link>{" "}
        <div className="timestampspage-container">
          <style>
            {" "}
            {`
      `}{" "}
          </style>{" "}
          <h1 className="timestampspage-title"> Welcome </h1>{" "}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search topics"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="video-card-container">
            {" "}
            {filteredVideoDescriptions.map((description, index) => (
              <div key={index} className="video-card">
                <p className="video-description"> {description} </p>{" "}
                <button
                  className="know-more-button"
                  onClick={() => navigateToTimestamp(index)}
                >
                  Know More{" "}
                </button>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default TimestampsPage;
