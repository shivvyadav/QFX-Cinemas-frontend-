import React, { useState, useEffect } from "react";

const MyContext = React.createContext({
  handlePrev: () => {},
  handleNext: () => {},
});

const movies = [
  {
    title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
    description: "UA13+ | Action, Adventure +1 more",
    url: "../media/demonSlayer.jpg",
  },
  {
    title: "Jolly LLB 3",
    description: "UA16+ | Drama, Comedy",
    url: "../media/jollyLLB.jpg",
  },
  {
    title: "Kantara: A Legend Chapter-1",
    description: "UA16+ | Adventure, Drama +1 more",
    url: "../media/kantara.jpg",
  },
];

export const ContextProvider = ({ children }) => {
  const [film, setFilm] = useState(0);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  const handlePrev = () => {
    setFilm((prevFilm) => (prevFilm > 0 ? prevFilm - 1 : movies.length - 1));
    setLeft("left");
  };
  useEffect(() => {
    setLeft(null);
    setRight(null);
  }, [left || right]);

  const handleNext = () => {
    setFilm((prevFilm) => (prevFilm < movies.length - 1 ? prevFilm + 1 : 0));
    setRight("right");
  };

  return (
    <MyContext.Provider
      value={{ handlePrev, handleNext, film, movies, left, right }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
