import React, { useEffect, useState } from "react";

const Ad = () => {
  const [showButton, setShowButton] = useState(false);
  const [player, setPlayer] = useState(null);

  // Array of YouTube video IDs for demonstration
  const videoIds = [
    "dQw4w9WgXcQ", // Replace with any YouTube video IDs
    "M7lc1UVf-VE",
    "9bZkp7q19f0",
  ];

  // Function to pick a random video
  const getRandomVideoId = () => {
    const randomIndex = Math.floor(Math.random() * videoIds.length);
    return videoIds[randomIndex];
  };

  // This function is called when the YouTube Iframe API is ready
  const onYouTubeIframeAPIReady = () => {
    const videoId = getRandomVideoId(); // Get random video
    const newPlayer = new window.YT.Player("player", {
      videoId,
      events: {
        onReady: onPlayerReady,
      },
    });
    setPlayer(newPlayer);
  };

  // Function to trigger when the video player is ready
  const onPlayerReady = () => {
    // Set timeout to stop the video after 10 seconds
    setTimeout(() => {
      if (player) {
        player.pauseVideo();
      }
      setShowButton(true); // Show the button after stopping the video
    }, 10000); // Stop video after 10 seconds
  };

  // Load the YouTube Iframe API script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    // Function called by YouTube API when it's loaded
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // Clean up the script tag when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", margin: "100px" }}>
      {/* YouTube player will be rendered here */}
      <div id="player"></div>

      {/* Show button after 10 seconds */}
      {showButton && (
        <button
          onClick={() => alert("Amount added to your account!")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          collect Your Reward
        </button>
      )}
    </div>
  );
};

export default Ad;
