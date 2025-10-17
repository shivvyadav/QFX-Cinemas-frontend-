import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../movieComponents/MovieCard";
// import { UpcomingMovies } from "../../assets/ApiData";

const Upcoming = () => {
  const [UpcomingMovies, setUpcomingMovies] = useState([]);
  async function fetchMovies() {
    const Upcoming = [];
    axios
      .get(`http://localhost:3000/api/movies/upcoming?region=IN`)
      .then((resp) => {
        if (resp) {
          Upcoming.push(...resp.data.results);
        }
      });
    axios
      .get(`http://localhost:3000/api/movies/upcoming?region=NP`)
      .then((resp) => {
        resp.data.results.forEach((movie) => {
          if (!Upcoming.find((m) => m._id === movie._id)) {
            Upcoming.push(movie);
          }
        });
        setUpcomingMovies(Upcoming);
      });
  }
  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  return (
    <>
      <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
        Upcomings
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
        {UpcomingMovies.map(
          (movie) =>
            movie.poster && (
              <MovieCard key={movie._id} movie={movie} type="View Details" />
            ),
        )}
      </div>
    </>
  );
};

export default Upcoming;
