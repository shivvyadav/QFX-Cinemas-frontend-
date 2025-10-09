import React from "react";

const MyBookings = () => {
  return (
    <div className="min-h-screen px-6 py-16 md:px-24 md:py-20 lg:px-40 xl:px-64 xl:py-24">
      <h1 className="my-6 text-xl font-semibold xl:text-2xl">My Bookings</h1>

      <div className="mb-4 flex w-full justify-between rounded-lg border border-neutral-300 bg-neutral-50 shadow md:p-3 xl:h-48">
        <div className="flex gap-2 overflow-hidden xl:gap-6">
          <img
            src="../media/demonSlayer.jpg"
            alt="demonSlayer"
            className="hidden h-full rounded-md object-cover md:block md:w-32 xl:w-48"
          />
          <div className="space-y-2 p-2 xl:p-4">
            <h2 className="text-md font-semibold xl:text-xl">
              Demon Slayer: Kimetsu no Yaiba
            </h2>
            <p className="text-sm font-medium text-neutral-700">2hr 30min</p>
            <p className="text-sm font-medium text-neutral-700">
              2025-02-09 | 2:30pm
            </p>
          </div>
        </div>
        <div className="space-y-2 p-2 text-right xl:p-4">
          <h2 className="text-md font-semibold xl:text-xl">Rs. 200</h2>
          <p className="text-sm font-medium text-neutral-700">
            Total tickets : 2
          </p>
          <p className="text-sm font-medium text-neutral-700">
            seats : 1, 2, 3, 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
