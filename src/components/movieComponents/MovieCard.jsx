import React, { useState } from "react";
import { Eye, PlayIcon, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlayTrailer from "../videoPlayer/PlayTrailer";
import { YearExtract } from "../../lib/utils";

const MovieCard = ({ movie, type }) => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-neutral-300 lg:w-60"
      onClick={() => setShowOverlay(!showOverlay)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full md:h-58 lg:h-64 xl:h-68"
      />
      <div className="p-3">
        <h3 className="text-sm leading-4 font-semibold md:text-base md:leading-5">
          {movie.title}
        </h3>
        <p className="pt-1 text-xs font-medium text-neutral-700 md:text-[14px]">
          {movie.language} | <span>{YearExtract(movie.release_date)}</span>
        </p>
      </div>
      <div
        className={`absolute inset-0 hidden origin-bottom-left scale-0 bg-black/50 transition-transform duration-300 ease-in-out group-hover:scale-100 lg:flex`}
      ></div>
      <div
        className={`absolute inset-0 hidden flex-col items-center justify-center gap-4 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex`}
      >
        {type == "View Details" ? (
          <button
            onClick={() => {
              navigate(`/movies/${movie.id}`);
              scrollTo(0, 0);
            }}
            className="rounded-full bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            <Eye className="inline size-5" /> {type}
          </button>
        ) : (
          <button
            onClick={() => {
              navigate(`/movies/buy/${movie.id}`);
              scrollTo(0, 0);
            }}
            className="flex gap-2 rounded-full bg-red-500 px-5 py-2 font-medium text-white hover:bg-red-600"
          >
            <Ticket className="inline size-5" />
            {type}
          </button>
        )}
      </div>
      {/* for mobile and tablet */}
      {showOverlay && (
        <div className="lg:hidden">
          <div className={`absolute inset-0 scale-100 bg-black/50`}></div>
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-4 text-xs opacity-100`}
            onClick={(e) => e.stopPropagation()}
          >
            <PlayTrailer movieId={movie.title} />
            {type == "View Details" ? (
              <button
                onClick={() => {
                  navigate(`/movies/${movie.title}`);
                }}
                className="rounded-full bg-red-500 px-3 py-2 font-medium text-white hover:bg-red-700"
              >
                <Eye className="inline size-4" /> {type}
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate(`/movies/buy/${movie.id}`);
                  scrollTo(0, 0);
                }}
                className="flex gap-2 rounded-full bg-red-500 px-5 py-2 font-medium text-white hover:bg-red-700"
              >
                <Ticket className="inline size-5" />
                {type}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
