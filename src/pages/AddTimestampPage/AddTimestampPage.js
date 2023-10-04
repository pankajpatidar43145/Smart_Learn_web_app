import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ContentDisplayPage from "./ContentDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // You can choose an appropriate user icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import "./AddTimestampPage.css"; // Import your CSS file

let isBool = true;
let myNumber;
myNumber = 0;

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

function AddTimestampPage() {
  const { index } = useParams(); // Get the index parameter from the URL
  const [selectedVideoData, setSelectedVideoData] = useState(null);
  const [videoPlayer, setVideoPlayer] = useState(null); // Reference to the YouTube player
  const timestampsRef = useRef([]); // Reference to the timestamps array
  const scriptLoadedRef = useRef(false); // Reference to check if the script has been loaded
  const token = localStorage.getItem("temptoken");
  // Check if token exists before decoding
  const decodedToken = decodeJwt(token);
  const email = decodedToken.payload.email;

  // Function to extract the YouTube video ID from the video link
  function extractVideoId(videoLink) {
    const url = new URL(videoLink);
    const searchParams = new URLSearchParams(url.search);
    if (url.hostname === "www.youtube.com") {
      return searchParams.get("v");
    } else if (url.hostname === "youtu.be") {
      return url.pathname.substring(1); // Remove the leading '/'
    }
    return null;
  }

  useEffect(() => {
    // Fetch the selected video data based on the index and email
    fetch(
      `https://smart-learn-web-app-u8vp.onrender.com/timestamps/getVideoDataByIndex?email=${email}&index=${index}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Extract the YouTube video ID from the video link
        const videoId = extractVideoId(data.videoLink);

        // Update the selectedVideoData with the video ID
        setSelectedVideoData({ ...data, videoId });
        timestampsRef.current = data.timestamps; // Store timestamps in the ref
      })
      .catch((error) => {
        console.error(error);
      });
  }, [index, email]); // Include email in the dependency array

  useEffect(() => {
    // Initialize the YouTube iframe API when selectedVideoData is available
    if (selectedVideoData && !scriptLoadedRef.current) {
      window.onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player("youtubePlayer", {
          videoId: selectedVideoData.videoId,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });

        // Set the videoPlayer state to the player instance
        setVideoPlayer(player);
      };

      // Load the YouTube iframe API script only if it hasn't been loaded yet
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.body.appendChild(script);
    }
  }, [selectedVideoData]);

  const onPlayerReady = (event) => {
    // Play the video
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      // Check the current time continuously
      const checkCurrentTimeInterval = setInterval(() => {
        const currentTimeInSeconds = event.target.getCurrentTime();

        // Check if the current time matches any timestamp with a very small tolerance (0.01 seconds)
        timestampsRef.current.forEach((timestamp) => {
          const timestampInSeconds = parseFloat(timestamp.timestamp);
          const tolerance = 0.01; // Minimal tolerance
          if (
            Math.abs(currentTimeInSeconds - timestampInSeconds) < tolerance &&
            isBool === true
          ) {
            isBool = false;
            myNumber = currentTimeInSeconds;
            event.target.pauseVideo();

            // Render ContentDisplayPage component with the content as a prop
            setContentToDisplay(timestamp.content);
          }
          if (currentTimeInSeconds >= myNumber + 1) {
            isBool = true;
          }
        });
      }, 10); // Check every 10 milliseconds

      // Clear the interval when the video ends
      event.target.addEventListener("onStateChange", (state) => {
        if (state === window.YT.PlayerState.ENDED) {
          clearInterval(checkCurrentTimeInterval);
        }
      });
    }
  };

  const [contentToDisplay, setContentToDisplay] = useState(null);

  const handleContinue = () => {
    // Continue button click handler - resume video playback
    if (videoPlayer) {
      videoPlayer.playVideo();
    }
    // Clear the content display
    setContentToDisplay(null);
  };

  if (!selectedVideoData) {
    // You can show a loading message or component here
    return <div> Loading... </div>;
  }

  return (
    <div>
      <h2 className="studentvideoh2"> Welcome </h2>{" "}
      <Link to="/studentvideos">
        {" "}
        {/* Add a Link component to navigate to /chatbox */}{" "}
        <button className="student-back-button2">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
        </button>{" "}
      </Link>{" "}
      <p> Video Description: {selectedVideoData.videoDescription} </p>{" "}
      <div id="youtubePlayer" className="video-container">
        {" "}
      </div>{" "}
      {contentToDisplay && (
        <ContentDisplayPage
          content={contentToDisplay}
          onContinue={handleContinue}
        />
      )}{" "}
    </div>
  );
}

export default AddTimestampPage;
