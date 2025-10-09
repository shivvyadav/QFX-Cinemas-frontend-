import React from "react";
import Hero from "./Hero";
import AboutMovie from "./AboutMovie";
import ShowTimes from "./ShowTimes";

const ViewMovie = () => {
  // const { id } = useParams();
  return (
    <div className="space-y-8 px-4 py-24 md:px-16 md:pt-32 lg:px-32 xl:px-58">
      <Hero />
      <ShowTimes />
      <AboutMovie />
    </div>
  );
};

export default ViewMovie;
