import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Movies state
  const [acrossRegionMovies, setAcrossRegionMovies] = useState([]);
  const [onlyInTheatreMovies, setOnlyInTheatreMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const fetchAllMovies = async () => {
    try {
      const [nowPlayingIN, activeShows, upcomingIN, nowPlayingNP, upcomingNP] =
        await Promise.all([
          axios.get(
            "http://localhost:3000/api/shows/now_playing?region=IN&page=1",
          ),
          axios.get("http://localhost:3000/api/shows/activeShows"),
          axios.get("http://localhost:3000/api/movies/upcoming?region=IN"),
          axios.get(
            "http://localhost:3000/api/shows/now_playing?region=NP&page=1",
          ),
          axios.get("http://localhost:3000/api/movies/upcoming?region=NP"),
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
      setOnlyInTheatreMovies(activeShows.data); // ✅ moved active shows here
      setUpcomingMovies(upcomingCombined);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setIsLoading(false);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
