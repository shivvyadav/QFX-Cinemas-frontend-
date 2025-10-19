import React, { useEffect, useRef } from "react";
import { Eye, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { YearExtract } from "../../lib/utils";

const MovieCard = ({ movie, type, activeMovieId, setActiveMovieId }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const isActive = activeMovieId === movie._id;

  // 🧠 Detect click outside of card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setActiveMovieId(null);
      }
    };
    // Only listen when overlay is active
    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive, setActiveMovieId]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl border border-neutral-300 lg:w-60"
      onClick={() => setActiveMovieId(isActive ? null : movie._id)}
    >
      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full md:h-58 lg:h-64 xl:h-68"
      />

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm leading-4 font-semibold md:text-base md:leading-5">
          {movie.title}
        </h3>
        <p className="pt-1 text-xs font-medium text-neutral-700 md:text-[14px]">
          {movie.language} | <span>{YearExtract(movie.release_date)}</span>
        </p>
      </div>

      {/* Desktop hover overlay */}
      <div className="absolute inset-0 flex origin-bottom-left scale-0 bg-black/50 opacity-0 transition duration-400 group-hover:scale-100 group-hover:opacity-100 lg:flex" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-sm opacity-0 transition-opacity duration-400 group-hover:opacity-100 lg:flex">
        {type === "View Details" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movies/details/${movie._id}`);
              scrollTo(0, 0);
            }}
            className="rounded-full bg-red-500/60 px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-red-600"
          >
            <Eye className="inline size-5" /> {type}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/theatre/buy/${movie._id}`);
              scrollTo(0, 0);
            }}
            className="flex gap-2 rounded-full bg-red-500/60 px-5 py-2 font-medium text-white transition-colors duration-300 hover:bg-red-600"
          >
            <Ticket className="inline size-5" />
            {type}
          </button>
        )}
      </div>

      {/* Mobile/tablet overlay */}
      {isActive && (
        <div className="lg:hidden">
          <div className="absolute inset-0 bg-black/50"></div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-xs"
            onClick={(e) => e.stopPropagation()} // prevent outside close
          >
            {type === "View Details" ? (
              <button
                onClick={() => navigate(`/movies/${movie._id}`)}
                className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 font-medium text-white"
              >
                <Eye className="inline size-4" /> {type}
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate(`/theatre/buy/${movie._id}`);
                  scrollTo(0, 0);
                }}
                className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 font-medium text-white"
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
