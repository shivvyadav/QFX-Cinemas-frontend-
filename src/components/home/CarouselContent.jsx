import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ExtractGenre } from "../../lib/utils";

const CarouselContent = ({ movie, left, right }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: left === "left" ? [-1300] : right === "right" ? [1300] : 0,
        transition: {
          type: "spring",
          duration: 1.2,
          ease: "easeInOut",
        },
      }}
      className="flex items-center justify-center md:gap-2 md:px-28 md:py-36 lg:px-38"
    >
      <div className="hidden w-3xl md:block md:w-xl md:space-y-4 lg:w-2xl lg:space-y-6">
        <h1 className="max-w-3xl font-heading font-semibold tracking-tight selection:bg-neutral-900 selection:text-white md:text-xl md:leading-9 lg:text-[26px] lg:leading-10 xl:text-4xl xl:leading-12">
          {movie.title}
        </h1>
        <h3 className="text-sm font-semibold text-neutral-800 md:text-[15px] lg:text-lg">
          {movie.language} | {ExtractGenre(movie.genres)}
        </h3>
        {movie && (
          <button
            onClick={() => navigate(`/theatre/buy/${movie._id}`)}
            className="group relative hidden overflow-hidden rounded-xl border-[2px] border-neutral-900 px-6 py-3 md:block md:px-4 md:py-2 lg:px-5 lg:py-2.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-neutral-900 transition-transform duration-300 ease-linear group-hover:translate-x-0" />
            <span className="relative z-10 text-base font-semibold text-black transition-colors duration-300 group-hover:text-white">
              Buy Ticket
            </span>
          </button>
        )}
      </div>
      <div className="hidden w-80 overflow-hidden rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:block">
        <img src={movie.poster} alt={movie.title} />
      </div>
    </motion.div>
  );
};

export default CarouselContent;
