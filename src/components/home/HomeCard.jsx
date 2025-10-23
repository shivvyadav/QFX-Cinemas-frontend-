import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ movies }) => {
  const navigate = useNavigate();
  return (
    <div className="pt-24 pb-20 md:hidden">
      <h2 className="mx-8 pb-4 font-semibold text-neutral-800">
        In the Spotlight
      </h2>

      <div className="flex flex-col gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="mx-8 overflow-hidden rounded-xl border border-neutral-200 bg-white"
          >
            <div className="relative flex max-h-[200px] w-full items-start justify-center overflow-hidden bg-neutral-900">
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-full w-auto translate-y-[-10%] object-contain"
              />
              <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
                {movie.genres[0]}
              </span>
            </div>
            <div className="p-3">
              <h3 className="mb-2 line-clamp-2 font-semibold text-neutral-900">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-md bg-neutral-100 px-2 py-1">
                    {movie.language}
                  </span>
                  <span className="text-xs text-neutral-500">2h 15m</span>
                </div>
                <button
                  onClick={() => {
                    navigate(`/theatre/buy/${movie._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white focus:outline-none"
                >
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
