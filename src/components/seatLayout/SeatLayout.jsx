import React from "react";

const SeatLayout = () => {
  return (
    <div className="">
      {/* navbar */}
      <div className="fixed top-0 z-30 w-full border-b border-neutral-200 bg-neutral-50 px-6 py-5 shadow-sm md:px-16 lg:px-24 xl:px-36">
        <img src="../../media/navLogo.svg" alt="navLogo" className="w-20" />
      </div>
      {/* content  */}
      <div className="mt-20 xl:mx-68">
        {/* sticky  */}
        <div className="sticky top-20 flex w-full items-center justify-between border-b border-neutral-200 bg-white py-3 text-sm xl:text-base">
          <div className="text-neutral-700">
            <h2 className="text-base font-semibold lg:text-lg">Movie Title</h2>
            <p>Action, Thriller</p>
          </div>
          <div className="font-medium">
            <h3>2025-10-10</h3>
            <h3>06 : 15 PM</h3>
          </div>
        </div>

        {/* seat layout */}
        <div className="px-24 py-4 text-justify">
          <h2 className="py-4 text-center text-lg font-medium">
            Sofa : Rs. 200
          </h2>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default SeatLayout;
