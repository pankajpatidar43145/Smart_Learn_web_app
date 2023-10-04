import React, { useState, useEffect } from "react";
import "./teacherchatbox.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // You can choose an appropriate user icon
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ChatBox() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to handle clicking the "Chat" button
  const handleChatButtonClick = (student) => {
    // Create an object with the teacher's name and email
    const chatToken = {
      name: student.name,
      email: student.email,
    };

    // Store the chatToken in local storage
    localStorage.setItem("chatteacherToken", JSON.stringify(chatToken));
    console.log(chatToken);
    navigate(`/chatteacher`);
  };

  useEffect(() => {
    // Fetch teacher data from the API
    fetch(
      "https://smart-learn-web-app-u8vp.onrender.com/studentdata/getstudentdata"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setStudents(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // Filter teachers based on the search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="chatbox-container">
        <Link to="/teacherhome">
          {" "}
          {/* Add a Link component to navigate to /chatbox */}{" "}
          <button className="my-back-button">
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
          </button>{" "}
        </Link>{" "}
        <h1 className="chatbox-heading"> Students </h1>{" "}
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
          {filteredStudents.map((student) => (
            <div key={student._id} className="chatbox-teacher-box">
              <div className="chatbox-teacher-info">
                <p className="chatbox-teacher-name"> {student.name} </p>{" "}
                <p className="chatbox-teacher-email"> {student.email} </p>{" "}
              </div>{" "}
              <button
                className="chatbox-button"
                onClick={() => handleChatButtonClick(student)}
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
