import React from "react";
import Carousel from "./Carousel";
import HomeCard from "./HomeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-teal-100 via-teal-50 to-white">
        <div className="absolute z-10 flex cursor-pointer items-center justify-center rounded-full hover:text-neutral-600 md:top-[38%] md:left-[8%] lg:top-[42%] lg:left-[9%] xl:top-[45%]">
          <ChevronLeft />
        </div>
        <Carousel />
        <div className="absolute z-10 flex cursor-pointer items-center justify-center rounded-full hover:text-neutral-600 md:top-[38%] md:right-[8%] lg:top-[42%] lg:right-[9%] xl:top-[45%]">
          <ChevronRight />
        </div>
        <HomeCard />
      </div>
    </>
  );
};

export default Home;
