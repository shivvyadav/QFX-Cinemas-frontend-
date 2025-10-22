import ReactPlayer from "react-player";
import { X } from "lucide-react";

const VideoPlayer = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative aspect-video w-[95%] rounded-xl sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-50 cursor-pointer rounded-full bg-white text-red-600 transition"
        >
          <X className="size-6" />
        </button>

        {/* React Player */}
        <ReactPlayer src={url} width="100%" height="100%" controls={true} />
      </div>
    </div>
  );
};

export default VideoPlayer;
