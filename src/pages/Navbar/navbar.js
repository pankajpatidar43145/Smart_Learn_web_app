import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyles = {
    background: "#007BFF",
    padding: "10px 0",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  };

  const logoStyles = {
    textDecoration: "none",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
  };

  const linksStyles = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  };

  const linkItemStyles = {
    marginRight: "20px",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "#fff",
    fontSize: "16px",
    transition: "color 0.3s",
  };

  const linkHoverStyles = {
    color: "#f8f9fa",
    textDecoration: "underline",
  };

  return (
    <header style={navbarStyles}>
      <div style={containerStyles}>
        <Link to="/" style={logoStyles}>
          Smart <b> Learn </b>{" "}
        </Link>{" "}
        <ul style={linksStyles} className="links">
          <li style={linkItemStyles}>
            <Link to="/" style={linkStyles}>
              Home{" "}
            </Link>{" "}
          </li>{" "}
          <li style={linkItemStyles}>
            <Link to="/aboutus" style={linkStyles}>
              About Us{" "}
            </Link>{" "}
          </li>{" "}
          <li style={linkItemStyles}>
            <Link to="/teacherlogin" style={linkStyles}>
              Teacher{" "}
            </Link>{" "}
          </li>{" "}
          <li style={linkItemStyles}>
            <Link to="/studentlogin" style={linkStyles}>
              Student{" "}
            </Link>{" "}
          </li>{" "}
          <li style={linkItemStyles}>
            <Link to="/contactuss" style={linkStyles}>
              Contact Us{" "}
            </Link>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </header>
  );
}

export default Navbar;
