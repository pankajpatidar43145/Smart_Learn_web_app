import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

function YoutubeVideo({ vid }) {
  const [questions, setQuestions] = useState([]);
  const playerRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    playerRef.current = event.target;
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const getCurrentTime = () => {
    // Use the player instance to get the current playback time
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log("Current Time:", currentTime);
      return currentTime;
    }
    return null;
  };
  const handleAddQuestion = () => {
    // Implement logic to add question at the specified timestamp
    const curntime = getCurrentTime();
    const newQuestion = {
      timestamp: curntime,
      question: selectedQuestion,
    };
    console.log(newQuestion);
    // setQuestions([...questions, newQuestion]);
    // setSelectedTime("");
    // setSelectedQuestion("");

    // // Store updated questions in local storage
    // localStorage.setItem(
    //   "questions",
    //   JSON.stringify([...questions, newQuestion])
    // );
  };
  return (
    <>
      <YouTube
        videoId={vid ? vid : "Grr0FlC8SQA"}
        opts={opts}
        onReady={onPlayerReady}
      />
      <div className="questions-section">
        <form className="add-question-form">
          {/* <input
            type="number"
            placeholder="Enter timestamp (seconds)"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />{" "} */}
          <input
            type="text"
            placeholder="Enter question"
            value={selectedQuestion}
            onChange={(e) => setSelectedQuestion(e.target.value)}
          />{" "}
          <button type="button" onClick={handleAddQuestion}>
            Add Question{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </>
  );
}

export default YoutubeVideo;
