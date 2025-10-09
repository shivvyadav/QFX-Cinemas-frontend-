import React, { useEffect } from "react";
import axios from "axios";

// const CurrentMovies = [];
// const Details=[];
// const UpcomingMovies = [];
const ApiData = () => {
  async function fetchMovies() {
    // await axios
    //   .get(`http://localhost:3000/api/movies/now_playing?region=IN&page=1`)
    //   .then((resp) => {
    //     Current.push(...resp.data.results);
    //   });
    // await axios
    //   .get(`http://localhost:3000/api/movies/now_playing?region=NP&page=1`)
    //   .then((resp) => {
    //     CurrentMovies.push(...resp.data.results);
    //   });
    // axios
    //   .get(`http://localhost:3000/api/movies/upcoming?region=IN`)
    //   .then((resp) => {
    //     if (resp) {
    //       UpcomingMovies.push(...resp.data.results);
    //     }
    //   });
    // axios
    //   .get(`http://localhost:3000/api/movies/upcoming?region=NP`)
    //   .then((resp) => {
    //     if (resp) {
    //       UpcomingMovies.push(...resp.data.results);
    //     }
    //   });
  }
  useEffect(() => {
    fetchMovies();
  }, []);

  return <div></div>;
};

export default ApiData;

const CurrentMovies = [
  {
    _id: 123,
    title: "Jolly LLB 3",
    poster: "../media/jollyLLB.jpg",
    release_date: "2025-09-25",
    language: "Hindi",
  },
  {
    _id: 456,
    title: "Kantara",
    poster: "../media/kantara.jpg",
    release_date: "2025-08-14",
    language: "Kannada",
  },
  {
    _id: 789,
    title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
    poster: "../media/demonSlayer.jpg",
    release_date: "2025-08-20",
    language: "Japanese",
  },
];

const UpcomingMovies = [
  {
    _id: 123,
    title: "Jolly LLB 3",
    poster: "../media/jollyLLB.jpg",
    release_date: "2025-09-25",
    language: "Hindi",
  },
  {
    _id: 456,
    title: "Kantara",
    poster: "../media/kantara.jpg",
    release_date: "2025-08-20",
    language: "Kannada",
  },
  {
    _id: 789,
    title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
    poster: "../media/demonSlayer.jpg",
    release_date: "2025-08-20",
    language: "Japanese",
  },
];

export { CurrentMovies, UpcomingMovies };
