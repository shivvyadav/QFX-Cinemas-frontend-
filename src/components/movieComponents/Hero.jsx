import React from "react";
import PlayTrailer from "../videoPlayer/PlayTrailer";

import { IconClock, IconCalendarWeek } from "@tabler/icons-react";
import { Drama } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-12">
      <div className="hidden overflow-hidden rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:block md:w-56 xl:w-64">
        <img src="../media/jollyLLB.jpg" alt="jollyLLB" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 md:flex-col md:items-start">
          <h2 className="text-xl font-semibold md:text-2xl xl:text-3xl">
            Jolly LLB 3
          </h2>
          <p className="w-fit rounded-full bg-neutral-800 px-3 text-white">
            Hindi
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm font-medium md:text-sm xl:text-base">
          <p className="flex items-center gap-2">
            <Drama className="inline size-6 text-red-600" /> Drama, Comedy
          </p>
          <p className="flex items-center gap-2">
            <IconClock className="inline size-6 text-red-600" /> 2hr 30min
          </p>
          <p className="flex items-center gap-2">
            <IconCalendarWeek className="inline size-6 text-red-600" />
            2025-09-30
          </p>
        </div>
        <div className="hidden md:block">
          <PlayTrailer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
