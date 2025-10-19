import React from "react";
import MovieCard from "../movieComponents/MovieCard";

const Upcoming = ({ movies }) => (
  <>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
      {movies.map(
        (movie) =>
          movie.poster && (
            <MovieCard key={movie._id} movie={movie} type="View Details" />
          ),
      )}
    </div>
  </>
);

export default Upcoming;
