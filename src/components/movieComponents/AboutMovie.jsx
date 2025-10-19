import React from "react";

const AboutMovie = ({ movie }) => {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6 lg:p-8">
      <h2 className="text-base font-semibold text-neutral-800 md:text-xl">
        About the Movie
      </h2>
      <p className="py-2 text-justify text-sm text-neutral-700 xl:py-4 xl:text-base">
        {movie.description}
      </p>
      <h3 className="py-4 pt-6 text-xl font-semibold text-neutral-800 xl:pb-4">
        Cast & Crew
      </h3>
      <div className="scrollbar-hide flex gap-8 overflow-x-auto">
        {movie.cast.map(
          (actor) =>
            actor.profile && (
              <div
                key={actor.name}
                className="flex flex-shrink-0 flex-col items-center gap-4"
              >
                <img
                  src={actor.profile}
                  alt={actor.name}
                  className="size-24 rounded-full"
                />
                <p className="text-sm font-medium text-neutral-800">
                  {actor.name}
                </p>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default AboutMovie;
