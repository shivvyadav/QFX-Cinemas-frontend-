import React from "react";
import MovieCard from "../movieComponents/MovieCard";
import movieDatas from "../../assets/data";

const OnlyInTheatre = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
        {movieDatas.map((movie) => (
          <MovieCard key={movie._id} movie={movie} type="Buy Tickets" />
        ))}
      </div>
    </div>
  );
};

export default OnlyInTheatre;
