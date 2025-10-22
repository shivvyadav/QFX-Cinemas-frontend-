import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext"; // ✅ import context
import ShowTimes from "./ShowTimes";
import Hero from "./Hero";
import AboutMovie from "./AboutMovie";

const BuyMovie = () => {
  const { id } = useParams();
  const { selectedShow, fetchShowDetail } = useContext(AppContext);

  useEffect(() => {
    if (id) fetchShowDetail(id);
  }, [id]);

  if (!selectedShow) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <div className="space-y-8 px-4 py-24 md:px-16 md:pt-32 lg:px-32 xl:px-58">
      <Hero movie={selectedShow} />
      <ShowTimes movie={selectedShow} />
      <AboutMovie movie={selectedShow} />
    </div>
  );
};

export default BuyMovie;
