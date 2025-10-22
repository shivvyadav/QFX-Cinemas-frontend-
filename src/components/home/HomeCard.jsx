import React from "react";

const HomeCard = ({ movie }) => {
  return (
    <div className="pt-18 md:hidden">
      <h2 className="p-6 text-base font-semibold text-neutral-800">
        In the Spotlight
      </h2>
      <div className="mx-4 overflow-hidden rounded-2xl border border-neutral-300">
        <div className="h-[200px] overflow-hidden">
          <img src={movie.poster} alt={movie.title} className="" />
        </div>
        <div className="p-3">
          <h4 className="font-semibold text-neutral-800">{movie.title}</h4>
          <p className="text-sm font-medium text-neutral-500">
            {movie.language}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
