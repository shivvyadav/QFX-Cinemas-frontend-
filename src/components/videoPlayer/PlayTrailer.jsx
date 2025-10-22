import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

const PlayTrailer = ({ videoId }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPlayer(true)}
        className="rounded-full bg-red-500 px-3 py-1.5 font-medium text-white hover:bg-red-600"
      >
        <IconPlayerPlayFilled className="inline size-4" /> Play Trailer
      </button>

      {showPlayer && (
        <VideoPlayer
          url={videoId}
          onClose={() => setShowPlayer(false)}
          key={videoId}
        />
      )}
    </>
  );
};

export default PlayTrailer;
