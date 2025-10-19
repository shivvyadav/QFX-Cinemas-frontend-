import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import ShowTimes from "./ShowTimes";
import Hero from "./Hero";
import AboutMovie from "./AboutMovie";

const BuyMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/shows/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!movie) {
    return <div className="min-h-screen"></div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      }}
      className="space-y-8 px-4 py-24 md:px-16 md:pt-32 lg:px-32 xl:px-58"
    >
      <Hero movie={movie} />
      <ShowTimes movie={movie} />
      <AboutMovie movie={movie} />
    </motion.div>
  );
};

export default BuyMovie;
