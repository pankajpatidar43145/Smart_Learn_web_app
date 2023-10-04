import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function LandingPage() {
  useEffect(() => {
    // Disable the browser's back functionality when the user lands on this page
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
    };
  }, []);

  return (
    <div className="landing-page">
      <header>
        <div className="container">
          <Link to="/" className="logo">
            Smart <b> Learn </b>{" "}
          </Link>{" "}
          <ul className="links">
            <li>
              <Link to="/"> Home </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/aboutus"> About Us </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/teacherlogin"> Teacher </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/studentlogin"> Student </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/contactuss"> Contact Us </Link>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </header>{" "}
      <div className="content">
        <div className="container">
          <div className="info">
            <h1> Welcome to Smart Learn </h1>{" "}
            <p>
              Discover a world of knowledge and inspiration at your
              fingertips.Our platform connects students and teachers for a
              seamless learning experience.Explore expertly curated video
              lessons and engage in meaningful discussions.{" "}
            </p>{" "}
            <Link to="/teacherlogin">
              <button> Join as Teacher </button>{" "}
            </Link>{" "}
            <Link to="/studentlogin">
              <button> Join as Student </button>{" "}
            </Link>{" "}
          </div>{" "}
          <div className="image">
            <img
              src="https://i.postimg.cc/65QxYYzh/001234.png"
              alt="Landing Page Image"
            />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default LandingPage;
