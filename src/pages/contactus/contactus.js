import React, { useState } from "react";
import "./contactus.css";
import Navbar from "../Navbar/navbar";

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      message.trim() === ""
    ) {
      setErrorMessage("All fields are necessary");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
    } else {
      setErrorMessage("");

      try {
        // Create an object with the form data
        const formData = {
          fullName: fullName,
          email: email,
          message: message,
        };

        // Make an HTTP POST request to your API endpoint
        const response = await fetch(
          "https://smart-learn-web-app-u8vp.onrender.com/contact/contactus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.status === 200) {
          // Form submitted successfully, handle success
          console.log("Form submitted successfully");
          window.alert("Form submitted successfully");
          // You can reset the form fields here if needed
          setFullName("");
          setEmail("");
          setMessage("");
        } else {
          // Handle errors from the API
          const data = await response.json();
          setErrorMessage(data.error || "Something went wrong");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
        setErrorMessage("Network error, please try again later");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h2> Get In Touch </h2>{" "}
        <p className="sub-heading"> Have a question, comment, or feedback ? </p>{" "}
        <form onSubmit={handleSubmit}>
          <div className="top-section">
            <div className="group">
              <label htmlFor="fullname"> Your Name </label>{" "}
              <div className="input-container">
                <input
                  type="text"
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="group">
              <label htmlFor="email"> Your Email </label>{" "}
              <div className="input-container">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="group">
            <label htmlFor="message"> Message </label>{" "}
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>{" "}
          </div>{" "}
          <div className="btn-container">
            <input type="submit" value="Send" />
          </div>{" "}
          <div className="error-message"> {errorMessage} </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default ContactForm;
