import React from "react";
import PlayTrailer from "../videoPlayer/PlayTrailer";
import { ExtractGenre, ActualTime } from "../../lib/utils";

import { IconClock, IconCalendarWeek } from "@tabler/icons-react";
import { Drama } from "lucide-react";

const Hero = ({ movie }) => {
  return (
    <div className="flex flex-col gap-4 px-2 md:flex-row md:gap-12 md:px-0">
      <div className="block w-48 overflow-hidden rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:w-56 xl:w-64">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-semibold text-neutral-800 md:text-2xl xl:text-2xl">
            {movie.title}
          </h2>
          <p className="w-fit rounded-full bg-neutral-800 px-2.5 text-white">
            {movie.language}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm font-medium md:text-sm xl:text-base">
          <p className="flex items-center gap-2 text-neutral-800">
            <Drama className="inline size-6 text-red-600" />{" "}
            {movie.genres && ExtractGenre(movie.genres)}
          </p>
          <p className="flex items-center gap-2 text-neutral-800">
            <IconClock className="inline size-6 text-red-600" />{" "}
            {ActualTime(movie.runtime)}
          </p>
          <p className="flex items-center gap-2 text-neutral-800">
            <IconCalendarWeek className="inline size-6 text-red-600" />
            {movie.release_date}
          </p>
        </div>
        <div className="">
          {movie.youtube_trailer ? (
            <PlayTrailer videoId={movie.youtube_trailer} />
          ) : (
            <p className="text-sm text-gray-500 italic">
              Trailer not available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
