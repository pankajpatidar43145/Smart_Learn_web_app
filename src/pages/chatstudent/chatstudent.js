import React, { useState, useEffect, useRef } from "react";
import "./chatstudent.css"; // Import your CSS for styling
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // You can choose an appropriate user icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ChatApp() {
  const token = localStorage.getItem("studenttoken");
  const decodedToken = decodeJwt(token);
  const senderemail = decodedToken.payload.email;
  const chatToken = JSON.parse(localStorage.getItem("chatstudentToken"));
  const receiveremail = chatToken.email;
  const receivername = chatToken.name;
  const [senderMessages, setSenderMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageContainerRef = useRef(null);

  const autoRefreshInterval = 6000; // Refresh every 6 seconds (adjust as needed)

  const refreshMessages = () => {
    // Fetch messages for the sender
    fetch(
      `https://smart-learn-web-app-u8vp.onrender.com/chatdata/chatdata/${senderemail}/${receiveremail}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSenderMessages(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sender's messages:", error);
      });
  };

  useEffect(() => {
    // Fetch messages for the sender initially
    refreshMessages();

    // Set up an interval to periodically refresh messages
    const refreshIntervalId = setInterval(() => {
      refreshMessages();
    }, autoRefreshInterval);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(refreshIntervalId);
    };
  }, [senderemail, receiveremail]);

  const renderMessages = () => {
    const groupedMessages = {};
    senderMessages.forEach((message) => {
      const messageDate = formatDate(message.createdAt);
      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = [];
      }
      groupedMessages[messageDate].push(message);
    });

    const messageElements = [];

    for (const date in groupedMessages) {
      messageElements.push(
        <div key={date} className="date-container">
          <div className="message-date"> {date} </div>{" "}
          {groupedMessages[date].map((message, index) => (
            <div
              key={`${date}-${index}`}
              className={`message ${
                message.senderemail === senderemail
                  ? "message-outgoing"
                  : "message-incoming"
              }`}
            >
              <p className="message-text"> {message.message} </p>{" "}
              <p className="message-timestamp">
                {" "}
                {formatTime(message.createdAt)}{" "}
              </p>{" "}
            </div>
          ))}{" "}
        </div>
      );
    }

    return <div> {messageElements} </div>;
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderemail: senderemail,
      receiveremail: receiveremail,
      message: newMessage,
    };

    // Send the message to the backend API
    fetch("https://smart-learn-web-app-u8vp.onrender.com/chatdata/chatdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API if needed
        console.log("Message sent to the backend:", data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

    const currentTime = new Date();
    const newMessageObj = {
      senderemail: senderemail,
      receiveremail: receiveremail,
      message: newMessage,
      createdAt: currentTime.toISOString(),
    };

    // Update the respective message state based on the sender or receiver
    const updatedSenderMessages = [...senderMessages, newMessageObj];
    const sortedSenderMessages = updatedSenderMessages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setSenderMessages(sortedSenderMessages);

    setNewMessage("");
  };
  const backgroundStyle = {
    background: "#7f7fd5",
    background: "-webkit-linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5)",
    background: "linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Ensure the background covers the entire viewport
  };
  return (
    <div>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="top-left-button">
          <Link to="/chatbox">
            {" "}
            {/* Add a Link component to navigate to /chatbox */}{" "}
            <button className="back-button">
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} />{" "}
            </button>{" "}
          </Link>{" "}
          <div className="chat-app-container">
            <div className="chat-header">
              <div className="profile-icon">
                <FontAwesomeIcon icon={faUser} size="x" /> {/* User icon */}{" "}
              </div>{" "}
              <h2> {receivername} </h2>{" "}
            </div>{" "}
            <div className="message-container" ref={messageContainerRef}>
              {" "}
              {renderMessages()}{" "}
            </div>{" "}
            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />{" "}
              <button className="send-button" onClick={handleSendMessage}>
                Send{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default ChatApp;
