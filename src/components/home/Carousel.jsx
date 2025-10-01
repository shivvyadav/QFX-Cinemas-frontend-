import React from "react";

const Carousel = () => {
  return (
    <div className="flex items-center justify-center md:gap-2 md:px-28 md:py-36 lg:px-38">
      <div className="hidden w-3xl md:block md:w-xl md:space-y-4 lg:w-2xl lg:space-y-6">
        <h1 className="max-w-3xl font-heading font-semibold tracking-tight md:text-xl md:leading-9 lg:text-[26px] lg:leading-10 xl:text-4xl xl:leading-12">
          Demon Slayer: Kimetsu no Yaiba Infinity Castle
        </h1>
        <h3 className="text-lg font-semibold text-neutral-800 md:text-[15px] lg:text-base">
          U13+ | Action, Adventure +1 more
        </h3>
        <button className="group relative hidden overflow-hidden rounded-xl border-[2px] border-neutral-900 px-6 py-3 md:block md:px-4 md:py-2 lg:px-5 lg:py-2.5">
          <span className="absolute inset-0 -translate-x-full bg-neutral-900 transition-transform duration-300 ease-linear group-hover:translate-x-0" />
          <span className="relative z-10 text-base font-semibold text-black transition-colors duration-300 group-hover:text-white">
            Book Now
          </span>
        </button>
      </div>
      <div className="hidden w-84 overflow-hidden rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:block">
        <img src="../media/demonSlayer.jpg" alt="Demon Slayer " />
      </div>
    </div>
  );
};

export default Carousel;
