import React from "react";
import AcrossRegion from "./AcrossRegion";
import OnlyInTheatre from "../theatre/OnlyInTheatre";
import Upcoming from "./Upcoming";

const Movies = () => {
  return (
    <div className="space-y-8 px-4 py-20 md:px-16 lg:px-32 xl:px-58">
      <AcrossRegion />
      {OnlyInTheatre && (
        <div>
          <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
            Only In Theatre
          </h2>
          <OnlyInTheatre />
        </div>
      )}
      <Upcoming />
    </div>
  );
};

export default Movies;
