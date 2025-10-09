import React from "react";

const actors = [
  {
    name: "Rishav Shetty",
    imageUrl: "../media/cast1.jpg",
  },
  {
    name: "Rukmini Vasantha",
    imageUrl: "../media/cast2.jpg",
  },
  {
    name: "Jayaram",
    imageUrl: "../media/cast3.jpg",
  },
  {
    name: "Gulsan Devaiah",
    imageUrl: "../media/cast4.jpg",
  },
];
const AboutMovie = () => {
  return (
    <div className="rounded-2xl border border-neutral-300 bg-bg-secondary p-8">
      <h2 className="text-base font-semibold text-neutral-800 md:text-xl">
        About the Movie
      </h2>
      <p className="py-2 text-justify text-sm text-neutral-700 xl:py-4 xl:text-base">
        Exploring the origins of Kaadubettu Shiva during the Kadamba dynasty
        era, it delves into the untamed wilderness and forgotten lore
        surrounding his past.
      </p>
      <h3 className="py-2 text-xl font-semibold text-neutral-800 xl:py-4">
        Cast & Crew
      </h3>
      <div className="scrollbar-hide flex gap-8 overflow-x-auto">
        {actors.map((actor) => (
          <div
            key={actor.name}
            className="flex flex-shrink-0 flex-col items-center gap-4"
          >
            <img
              src={actor.imageUrl}
              alt={actor.name}
              className="size-24 rounded-full"
            />
            <p className="text-sm font-medium text-neutral-800">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMovie;
