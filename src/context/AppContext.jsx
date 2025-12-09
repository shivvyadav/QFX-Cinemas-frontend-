import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Movies
  const [acrossRegionMovies, setAcrossRegionMovies] = useState([]);
  const [onlyInTheatreMovies, setOnlyInTheatreMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // Selected items
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  const CACHE_KEY = "movieData_v1";

  const fetchAllMovies = useCallback(async (force = false) => {
    if (!force) {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.across && parsed.upcoming && parsed.inTheatre) {
            setAcrossRegionMovies(parsed.across);
            setOnlyInTheatreMovies(parsed.inTheatre);
            setUpcomingMovies(parsed.upcoming);
            return;
          }
        } catch (e) {}
      }
    }

    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const [nowPlayingIN, activeShows, upcomingIN, nowPlayingNP, upcomingNP] =
        await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/shows/now_playing?region=IN&page=1`,
            { signal },
          ),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/shows/activeShows`, {
            signal,
          }),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/movies/upcoming?region=IN`,
            { signal },
          ),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/shows/now_playing?region=NP&page=1`,
            { signal },
          ),
          axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/movies/upcoming?region=NP`,
            { signal },
          ),
        ]);

      const acrossCombined = [...(nowPlayingIN.data.results || [])];
      (nowPlayingNP.data.results || []).forEach((movie) => {
        if (!acrossCombined.find((m) => m._id === movie._id))
          acrossCombined.push(movie);
      });

      const upcomingCombined = [...(upcomingIN.data.results || [])];
      (upcomingNP.data.results || []).forEach((movie) => {
        if (!upcomingCombined.find((m) => m._id === movie._id))
          upcomingCombined.push(movie);
      });

      setAcrossRegionMovies(acrossCombined);
      setOnlyInTheatreMovies(activeShows.data || []);
      setUpcomingMovies(upcomingCombined);

      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            across: acrossCombined,
            inTheatre: activeShows.data || [],
            upcoming: upcomingCombined,
          }),
        );
      } catch (e) {}
    } catch (error) {
      if (!axios.isCancel(error))
        console.error("Error fetching movie data:", error);
    } finally {
      setIsLoading(false);
    }
    return () => controller.abort();
  }, []);

  const fetchMovieDetail = useCallback(async (id) => {
    if (!id) return;
    const controller = new AbortController();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/movieDetail/${id}`,
        {
          signal: controller.signal,
        },
      );
      setSelectedMovie(res.data);
    } catch (error) {
      if (!axios.isCancel(error))
        console.error("Error fetching movie detail:", error);
      setSelectedMovie(null);
    }
    return () => controller.abort();
  }, []);

  const fetchShowDetail = useCallback(async (id) => {
    if (!id) return;
    const controller = new AbortController();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/shows/${id}`,
        {
          signal: controller.signal,
        },
      );
      setSelectedShow(res.data);
    } catch (error) {
      if (!axios.isCancel(error))
        console.error("Error fetching show detail:", error);
      setSelectedShow(null);
    }
    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  const value = useMemo(
    () => ({
      isLoading,
      acrossRegionMovies,
      onlyInTheatreMovies,
      upcomingMovies,
      selectedMovie,
      setSelectedMovie,
      selectedShow,
      setSelectedShow,
      fetchAllMovies,
      fetchMovieDetail,
      fetchShowDetail,
    }),
    [
      isLoading,
      acrossRegionMovies,
      onlyInTheatreMovies,
      upcomingMovies,
      selectedMovie,
      selectedShow,
      fetchAllMovies,
      fetchMovieDetail,
      fetchShowDetail,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
