import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import "./teacherhome.css";
import YouTube from "react-youtube";
import Navbar from "../Navbar/navbar";

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

const TeacherHome = () => {
  const token = localStorage.getItem("teachertoken");
  const decodedToken = decodeJwt(token);
  const email = decodedToken.payload.email;
  const navigate = useNavigate(); // Get the navigate function

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState([]);

  const videoRef = useRef(null);

  const handleLogout = () => {
    // Clear the teacher token from local storage
    localStorage.removeItem("teachertoken");

    // Use history.replace to navigate to the home route ("/") and prevent going back
    navigate("/");
    window.history.replaceState(null, "", "/");
  };

  const handleYoutubeSubmit = () => {
    console.log("YouTube URL:", youtubeUrl);
    console.log("Video Description:", videoDescription);

    const videoId = extractVideoIdFromUrl(youtubeUrl);

    if (videoId) {
      setVideoSrc(videoId);
      setShowVideo(true);
    }
  };

  const extractVideoIdFromUrl = (url) => {
    const videoId = url.split("/").pop().split("?")[0];
    return videoId;
  };

  const onVideoTimeChange = (event) => {
    setCurrentTime(event.target.getCurrentTime());
  };

  const addQuestion = () => {
    if (questionText && currentTime >= 0) {
      const newQuestion = {
        text: questionText,
        time: currentTime,
      };

      setQuestions([...questions, newQuestion]);
      setQuestionText("");
    }
  };

  const opts = {
    height: "360",
    width: "640",
    playerVars: {},
  };

  // Function to handle the upload action
  const handleUpload = () => {
    const shouldUpload = window.confirm(
      "Are you sure you want to upload the data?"
    );

    if (shouldUpload) {
      // Create an object with the data to be sent
      const requestData = {
        email,
        videoLink: youtubeUrl,
        videoDescription,
        timestamps: questions.map((question) => ({
          timestamp: question.time.toFixed(2),
          content: question.text,
        })),
      };

      // Make an HTTP POST request to your API
      fetch(
        "https://smart-learn-web-app-u8vp.onrender.com/timestamps/addTimestamp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      )
        .then((response) => {
          if (response.ok) {
            // Handle success
            alert("Data posted successfully");
          } else {
            // Handle error
            alert("Error posting data");
          }
        })
        .catch((error) => {
          // Handle network error
          console.error("Network error", error);
        });
    } else {
      // User canceled the upload
      alert("Upload canceled.");
    }
  };
  const backgroundStyle = {
    backgroundImage: 'url("https://wallpapercave.com/wp/wp6903417.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Ensure the background covers the entire viewport
    display: "block",
    alignItems: "center", // Vertically center content
    justifyContent: "center", // Horizontally center content
  };

  return (
    <div>
      <Navbar />
      <div style={backgroundStyle}>
        <button className="teacher-logout-button" onClick={handleLogout}>
          Logout{" "}
        </button>{" "}
        <div className="teacher-home-container">
          <div className="header">
            <button
              className="teacherprofile-button"
              onClick={() => {
                // Use navigate to go to the /teachervideos route with email as a query parameter
                navigate(`/teacherchatbox`);
              }}
            >
              ChatBox{" "}
            </button>{" "}
            {/* Modify the Uploaded Videos button */}{" "}
            <button
              className="teacherprofile-button"
              onClick={() => {
                // Use navigate to go to the /teachervideos route with email as a query parameter
                navigate(`/teacherprofile`);
              }}
            >
              My Profile{" "}
            </button>{" "}
            {/* Modify the Uploaded Videos button */}{" "}
            <button
              className="teacheruploaded-videos-button"
              onClick={() => {
                // Use navigate to go to the /teachervideos route with email as a query parameter
                navigate(`/teachervideos`);
              }}
            >
              Uploaded Videos{" "}
            </button>{" "}
          </div>{" "}
          <h1> Welcome </h1>{" "}
          <div className="add-youtube-section">
            <h2> Add Video </h2>{" "}
            <input
              type="text"
              placeholder="Enter video URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />{" "}
            <input
              type="text"
              placeholder="Enter video description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />{" "}
            {!showVideo && (
              <button onClick={handleYoutubeSubmit}> Add Video </button>
            )}{" "}
          </div>{" "}
          {showVideo && (
            <div className="video-section">
              <h2> Video Preview </h2>{" "}
              <YouTube
                videoId={videoSrc}
                opts={opts}
                onStateChange={onVideoTimeChange}
              />{" "}
              <p>
                {" "}
                Current Time: {currentTime.toFixed(2)}
                seconds{" "}
              </p>{" "}
            </div>
          )}{" "}
          {showVideo && (
            <div className="add-question-section">
              <h2> Add Question at Current Time </h2>{" "}
              <input
                type="text"
                placeholder="Enter your question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />{" "}
              <button onClick={addQuestion}> Add Question </button>{" "}
            </div>
          )}{" "}
          {showVideo && (
            <div className="questions-section">
              <h2> Questions </h2>{" "}
              <ul>
                {" "}
                {questions.map((question, index) => (
                  <li key={index}>
                    Time: {question.time.toFixed(2)}
                    seconds - {question.text}{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </div>
          )}{" "}
          <p> Email: {email} </p>{" "}
          {showVideo && (
            <button className="upload-button" onClick={handleUpload}>
              Upload{" "}
            </button>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default TeacherHome;
