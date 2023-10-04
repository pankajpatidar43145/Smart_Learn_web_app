import React from "react";
import "./ContentDisplay.css"; // Import CSS for styling

function ContentDisplayPage({ content, onContinue }) {
  return (
    <div className="content-display-container contendisplay">
      <h2 className="contentdisplay-h2"> </h2>{" "}
      <p className="contentdisplay-p"> {content} </p>{" "}
      <button className="contentdisplay-button" onClick={onContinue}>
        Continue{" "}
      </button>{" "}
    </div>
  );
}

export default ContentDisplayPage;
