import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import MovieCard from "../movieComponents/MovieCard";

const OnlyInTheatre = () => {
  const { onlyInTheatreMovies } = useContext(AppContext);
  const [activeMovieId, setActiveMovieId] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
        {onlyInTheatreMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            type="Buy Tickets"
            activeMovieId={activeMovieId}
            setActiveMovieId={setActiveMovieId}
          />
        ))}
      </div>
    </div>
  );
};

export default OnlyInTheatre;
