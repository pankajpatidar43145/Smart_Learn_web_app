import React, { useState } from "react";
import "./aboutus.css"; // Import your CSS styles here
import Navbar from "../Navbar/navbar";
const About = () => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="background-container">
          <div className="bg-1"> </div> <div className="bg-2"> </div>{" "}
        </div>{" "}
        <div className="about-container">
          <div className="image-container">
            <img
              src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>{" "}
          <div className="text-container">
            <h1> About us </h1>{" "}
            <p>
              Smart Learn is a web application developed by students from the
              Indian Institute of Technology Ropar under the guidance of
              Professor Dr.Abhinav Dhall.{" "}
            </p>{" "}
            {showFullContent ? (
              <>
                <p>
                  Our mission is to provide a seamless learning experience for
                  both teachers and students.{" "}
                </p>{" "}
                <p>
                  For teachers, Smart Learn offers a platform to upload
                  educational videos with specific properties, making it easier
                  to organize and share knowledge with students.Teachers can
                  create a rich learning environment, where students can access
                  expertly curated video lessons and engage in meaningful
                  discussions.{" "}
                </p>{" "}
                <p>
                  Students can benefit from a wide range of educational content,
                  personalized to their needs.They can watch videos, ask
                  questions to teachers, and gain valuable insights to enhance
                  their learning journey.{" "}
                </p>{" "}
                <p>
                  We are committed to promoting education and fostering a
                  community of lifelong learners.Thank you for choosing Smart
                  Learn as your educational companion.{" "}
                </p>{" "}
              </>
            ) : null}{" "}
            <a href="#" onClick={toggleFullContent}>
              {" "}
              {showFullContent ? "Read Less" : "Read More"}{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default About;
