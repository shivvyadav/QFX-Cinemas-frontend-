// src/context/AppContext.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Movies
  const [acrossRegionMovies, setAcrossRegionMovies] = useState([]);
  const [onlyInTheatreMovies, setOnlyInTheatreMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // Selected items
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  // --- Fetch All Movies ---
  const fetchAllMovies = async () => {
    try {
      const [nowPlayingIN, activeShows, upcomingIN, nowPlayingNP, upcomingNP] =
        await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/shows/now_playing?region=IN&page=1`,
          ),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/shows/activeShows`),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/movies/upcoming?region=IN`,
          ),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/shows/now_playing?region=NP&page=1`,
          ),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/movies/upcoming?region=NP`,
          ),
        ]);

      // Across Region movies (remove duplicates)
      const acrossCombined = [...nowPlayingIN.data.results];
      nowPlayingNP.data.results.forEach((movie) => {
        if (!acrossCombined.find((m) => m._id === movie._id)) {
          acrossCombined.push(movie);
        }
      });

      // Upcoming movies (remove duplicates)
      const upcomingCombined = [...upcomingIN.data.results];
      upcomingNP.data.results.forEach((movie) => {
        if (!upcomingCombined.find((m) => m._id === movie._id)) {
          upcomingCombined.push(movie);
        }
      });

      setAcrossRegionMovies(acrossCombined);
      setOnlyInTheatreMovies(activeShows.data);
      setUpcomingMovies(upcomingCombined);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Fetch Movie Detail ---
  const fetchMovieDetail = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/movieDetail/${id}`,
      );
      setSelectedMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
      setSelectedMovie(null);
    }
  };

  // --- Fetch Show Detail (for BuyMovie) ---
  const fetchShowDetail = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/shows/${id}`,
      );
      setSelectedShow(res.data);
    } catch (error) {
      console.error("Error fetching show detail:", error);
      setSelectedShow(null);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        acrossRegionMovies,
        onlyInTheatreMovies,
        upcomingMovies,
        selectedMovie,
        selectedShow,
        fetchMovieDetail,
        fetchShowDetail, // ✅ new function
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
