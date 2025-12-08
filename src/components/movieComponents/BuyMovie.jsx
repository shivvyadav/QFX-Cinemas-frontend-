import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import ShowTimes from "./ShowTimes";
import Hero from "./Hero";
import AboutMovie from "./AboutMovie";
import { motion } from "motion/react";

const BuyMovie = () => {
  const { id } = useParams();
  const appContext = useContext(AppContext);

  const selectedShow = appContext?.selectedShow;
  const fetchShowDetail = appContext?.fetchShowDetail;

  useEffect(() => {
    if (id && fetchShowDetail) fetchShowDetail(id);
  }, [id, fetchShowDetail]);

  if (!appContext || !selectedShow) {
    return <div className="min-h-screen" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="space-y-8 px-4 py-24 md:px-16 md:pt-32 lg:px-32 xl:px-58"
    >
      <Hero movie={selectedShow} />
      <ShowTimes movie={selectedShow} />
      <AboutMovie movie={selectedShow} />
    </motion.div>
  );
};

export default BuyMovie;
