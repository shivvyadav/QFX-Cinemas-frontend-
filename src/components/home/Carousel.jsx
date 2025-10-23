import React, { useContext } from "react";
import CarouselContent from "./CarouselContent";
import HomeCard from "./HomeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MyContext from "./HomeContext";

const Carousel = () => {
  const { handlePrev, handleNext, movies, film, left, right } =
    useContext(MyContext);
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-teal-100 via-teal-50 to-white">
      <div
        className="absolute z-10 flex cursor-pointer items-center justify-center rounded-full hover:text-neutral-600 md:top-[38%] md:left-[8%] lg:top-[42%] lg:left-[9%] xl:top-[45%]"
        onClick={handlePrev}
      >
        <ChevronLeft />
      </div>
      <CarouselContent movie={movies[film]} left={left} right={right} />
      <div
        className="absolute z-10 flex cursor-pointer items-center justify-center rounded-full hover:text-neutral-600 md:top-[38%] md:right-[8%] lg:top-[42%] lg:right-[9%] xl:top-[45%]"
        onClick={handleNext}
      >
        <ChevronRight />
      </div>
      <HomeCard movies={movies} />
    </div>
  );
};

export default Carousel;
