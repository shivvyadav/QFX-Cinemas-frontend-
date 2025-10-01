import React from "react";

const HomeCard = () => {
  return (
    <div className="pt-18 md:hidden">
      <h2 className="p-6 text-base font-semibold text-neutral-800">
        In the Spotlight
      </h2>
      <div className="mx-4 overflow-hidden rounded-2xl border">
        <div className="h-[200px] overflow-hidden">
          <img src="../media/demonSlayer.jpg" alt="Demon Slayer" className="" />
        </div>
        <div className="p-3">
          <h4 className="font-semibold text-neutral-800">Demon Slayer</h4>
          <p className="text-sm font-medium text-neutral-500">U13+</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
