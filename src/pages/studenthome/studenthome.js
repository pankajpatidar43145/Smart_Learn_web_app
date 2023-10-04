import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./studenthome.css";
import AnalogClock from "./Analogclock";
import Navbar from "../Navbar/navbar";

function StudentHome() {
  const navigate = useNavigate();
  const [studentEmail, setStudentEmail] = useState("");
  const [teacherData, setTeacherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    // Clear the teacher token from local storage
    localStorage.removeItem("studenttoken");

    // Use history.replace to navigate to the home route ("/") and prevent going back
    navigate("/");
    window.history.replaceState(null, "", "/");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (email) {
      setStudentEmail(email);
    }

    fetch(
      "https://smart-learn-web-app-u8vp.onrender.com/teacherdata/getteacherdata"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTeacherData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, []);

  const handleTeacherBoxClick = async (teacherEmail) => {
    try {
      const response = await fetch(
        "https://smart-learn-web-app-u8vp.onrender.com/tempemail/addtempemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: teacherEmail }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data; // Assuming the API response contains a 'token' field

        // Store the token in local storage or any other preferred storage mechanism
        localStorage.setItem("temptoken", token);

        // Redirect to the '/studentvideos' page
        navigate("/studentvideos");
      } else {
        console.error("Error adding teacher email:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding teacher email:", error);
    }
  };

  const filteredTeacherData = teacherData.filter((teacher) => {
    return (
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const backgroundStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/37728/pexels-photo-37728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "block",
    alignItems: "center",
    justifyContent: "center",
  };

  const analogClockContainerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    textAlign: "center",
  };
  const goToprofile = () => {
    navigate(`/profile`);
  };
  return (
    <div>
      <Navbar />
      <div style={backgroundStyle}>
        <button className="student-logout-button" onClick={handleLogout}>
          Logout{" "}
        </button>{" "}
        <div className="student-home">
          <div className="button-container">
            <button className="profile-button" onClick={goToprofile}>
              My Profile{" "}
            </button>{" "}
            <button
              className="chat-button"
              onClick={() => navigate("/chatbox")}
            >
              Chat Box{" "}
            </button>{" "}
          </div>{" "}
          <h1 className="welcome-heading"> Welcome, meet your teachers </h1>{" "}
          {studentEmail && (
            <p className="email-paragraph"> Your email: {studentEmail} </p>
          )}{" "}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by department, name, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />{" "}
          </div>{" "}
          {filteredTeacherData.length === 0 ? (
            <p className="no-matching-teachers">
              {" "}
              No matching teachers found.{" "}
            </p>
          ) : (
            <div className="teacher-list">
              {" "}
              {filteredTeacherData.map((teacher) => (
                <div
                  className="teacher-info"
                  key={teacher._id}
                  onClick={() => handleTeacherBoxClick(teacher.email)}
                >
                  <p className="teacher-name"> Name: {teacher.name} </p>{" "}
                  <p className="teacher-email"> Email: {teacher.email} </p>{" "}
                  <p className="teacher-department">
                    Department: {teacher.department}{" "}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>
          )}{" "}
        </div>{" "}
        <div style={analogClockContainerStyle}>
          <AnalogClock />
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default StudentHome;
