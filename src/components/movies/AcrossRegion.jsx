import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../movieComponents/MovieCard";
// import { CurrentMovies } from "../../assets/ApiData";

const AcrossRegion = () => {
  const [CurrentMovies, setCurrentMovies] = useState([]);
  async function fetchMovies() {
    const Current = [];
    await axios
      .get(`http://localhost:3000/api/shows/now_playing?region=IN&page=1`)
      .then((resp) => {
        Current.push(...resp.data.results);
      });
    await axios
      .get(`http://localhost:3000/api/shows/now_playing?region=NP&page=1`)
      .then((resp) => {
        resp.data.results.forEach((movie) => {
          if (!Current.find((m) => m._id === movie._id)) {
            Current.push(movie);
          }
        });
        setCurrentMovies(Current);
      });
  }
  // useEffect(() => {
  //   fetchMovies();
  // }, []);
  return (
    <div>
      <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
        Stories Across Region
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
        {CurrentMovies.map(
          (movie) =>
            movie.poster && (
              <MovieCard key={movie._id} movie={movie} type="View Details" />
            ),
        )}
      </div>
    </div>
  );
};

export default AcrossRegion;
