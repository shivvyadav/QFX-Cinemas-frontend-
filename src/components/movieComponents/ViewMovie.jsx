import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Hero from "./Hero";
import AboutMovie from "./AboutMovie";
import { motion } from "motion/react";

const ViewMovie = () => {
  const { id } = useParams();
  const { selectedMovie, fetchMovieDetail } = useContext(AppContext);

  useEffect(() => {
    if (id) fetchMovieDetail(id);
  }, [id]);

  if (!selectedMovie) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="space-y-8 px-4 py-24 md:px-16 md:pt-32 lg:px-32 xl:px-58"
    >
      <Hero movie={selectedMovie} />
      <AboutMovie movie={selectedMovie} />
    </motion.div>
  );
};

export default ViewMovie;
