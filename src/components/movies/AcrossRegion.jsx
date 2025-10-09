import React from "react";
import MovieCard from "../movieComponents/MovieCard";
import { CurrentMovies } from "../../assets/ApiData";

const AcrossRegion = () => {
  return (
    <div>
      <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
        Stories Across Region
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
        {CurrentMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} type="View Details" />
        ))}
      </div>
    </div>
  );
};

export default AcrossRegion;
