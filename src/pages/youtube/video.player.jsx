import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

function YoutubeVideo1({ vid, data }) {
  const playerRef = useRef(null);
  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    playerRef.current = event.target;
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
  useEffect(() => {
    console.log(data.timestamps);
    const curntime = getCurrentTime();
    const comments = data?.timestamps;
    console.log(1);
    if (curntime !== null && comments) {
      comments.forEach((item) => {
        console.log(item.timestamp);
        console.log(curntime);
        if (item.timestamp == curntime) {
          playerRef.current.pauseVideo();
          console.log("Paused at", curntime);
        }
      });
    }
  }, []);

  return (
    <>
      <YouTube videoId={vid} onReady={onPlayerReady} />
    </>
  );
}

export default YoutubeVideo1;
