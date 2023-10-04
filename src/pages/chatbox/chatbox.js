import React, { useState, useEffect } from "react";
import "./chatbox.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // You can choose an appropriate user icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ChatBox() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to handle clicking the "Chat" button
  const handleChatButtonClick = (teacher) => {
    // Create an object with the teacher's name and email
    const chatToken = {
      name: teacher.name,
      email: teacher.email,
    };

    // Store the chatToken in local storage
    localStorage.setItem("chatstudentToken", JSON.stringify(chatToken));
    console.log(chatToken);
    navigate(`/chatstudent`);
  };

  useEffect(() => {
    // Fetch teacher data from the API
    fetch(
      "https://smart-learn-web-app-u8vp.onrender.com/teacherdata/getteacherdata"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTeachers(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, []);

  // Filter teachers based on the search query
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="chatbox-container">
        <Link to="/studenthome">
          {" "}
          {/* Add a Link component to navigate to /chatbox */}{" "}
          <button className="my-back-button">
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
          </button>{" "}
        </Link>{" "}
        <h1 className="chatbox-heading"> Teachers </h1>{" "}
        <div className="my-search-bar">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />{" "}
        </div>{" "}
        <div className="chatboxteacherlist">
          {" "}
          {filteredTeachers.map((teacher) => (
            <div key={teacher._id} className="chatbox-teacher-box">
              <div className="chatbox-teacher-info">
                <p className="chatbox-teacher-name"> {teacher.name} </p>{" "}
                <p className="chatbox-teacher-email"> {teacher.email} </p>{" "}
              </div>{" "}
              <button
                className="chatbox-button"
                onClick={() => handleChatButtonClick(teacher)}
              >
                Chat{" "}
              </button>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default ChatBox;
