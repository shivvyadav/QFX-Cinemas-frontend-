// src/context/MyContext.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import AppContext from "../../context/AppContext";

const MyContext = React.createContext({
  handlePrev: () => {},
  handleNext: () => {},
  movies: [],
  film: 0,
  left: null,
  right: null,
});

export const ContextProvider = ({ children }) => {
  const { onlyInTheatreMovies: globalMovies } = useContext(AppContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState(0);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [isClickable, setIsClickable] = useState(true);

  // --- Fetch locally (for instant load) ---
  const fetchActiveShows = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/shows/activeShows`,
      );
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching active shows in MyContext:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // If globalMovies already loaded, use them immediately
    if (globalMovies && globalMovies.length > 0) {
      setMovies(globalMovies);
      setIsLoading(false);
    } else {
      // Otherwise, fetch locally to avoid waiting
      fetchActiveShows();
    }
  }, [globalMovies]);

  const triggerCooldown = (delay = 1000) => {
    setIsClickable(false);
    setTimeout(() => setIsClickable(true), delay);
  };

  const handlePrev = () => {
    if (!isClickable) return; // ignore rapid clicks
    triggerCooldown(); // activate cooldown
    setFilm((prevFilm) => (prevFilm > 0 ? prevFilm - 1 : movies.length - 1));
    setLeft("left");
  };

  const handleNext = () => {
    if (!isClickable) return; // ignore rapid clicks
    triggerCooldown(); // activate cooldown
    setFilm((prevFilm) => (prevFilm < movies.length - 1 ? prevFilm + 1 : 0));
    setRight("right");
  };

  useEffect(() => {
    setLeft(null);
    setRight(null);
  }, [left, right]);

  if (isLoading || movies.length === 0) {
    return <Loader z="50" />;
  }

  return (
    <MyContext.Provider
      value={{ handlePrev, handleNext, movies, film, left, right }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
