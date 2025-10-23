import React, { useState } from "react";
import MovieCard from "../movieComponents/MovieCard";

const Upcoming = ({ movies }) => {
  const [activeMovieId, setActiveMovieId] = useState(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
        {movies.map(
          (movie) =>
            movie.poster && (
              <MovieCard
                key={movie._id}
                movie={movie}
                type="View Details"
                activeMovieId={activeMovieId}
                setActiveMovieId={setActiveMovieId}
              />
            ),
        )}
      </div>
    </>
  );
};

export default Upcoming;
