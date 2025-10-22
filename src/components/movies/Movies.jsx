import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import AcrossRegion from "./AcrossRegion";
import OnlyInTheatre from "../theatre/OnlyInTheatre";
import Upcoming from "./Upcoming";
import Loader from "../loader/Loader";

const Movies = () => {
  const { isLoading, acrossRegionMovies, onlyInTheatreMovies, upcomingMovies } =
    useContext(AppContext);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen space-y-8 px-4 py-20 md:px-16 lg:px-32 xl:px-58">
      {acrossRegionMovies.length > 0 && (
        <div>
          <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
            Stories Across Region
          </h2>
          <AcrossRegion movies={acrossRegionMovies} />
        </div>
      )}

      {onlyInTheatreMovies.length > 0 && (
        <div>
          <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
            Only In Theatre
          </h2>
          <OnlyInTheatre movies={onlyInTheatreMovies} />
        </div>
      )}

      {upcomingMovies.length > 0 && (
        <div>
          <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
            Upcomings
          </h2>
          <Upcoming movies={upcomingMovies} />
        </div>
      )}
    </div>
  );
};

export default Movies;
