import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { PlayIcon } from "lucide-react";

const PlayTrailer = ({ videoId }) => {
  const videoLink = "https://www.youtube.com/watch?v=sRjOrbStr1Y";
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPlayer(true)}
        className="rounded-full bg-red-500 px-5 py-2 font-medium text-white hover:bg-red-600"
      >
        <PlayIcon className="inline size-4" /> Play Trailer
      </button>

      {showPlayer && (
        <VideoPlayer url={videoLink} onClose={() => setShowPlayer(false)} />
      )}
    </>
  );
};

export default PlayTrailer;
