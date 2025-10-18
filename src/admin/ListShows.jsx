import React from "react";
import Title from "./Title";

const ListShows = () => {
  return (
    <div className=" min-h-screen py-24 pl-20 md:pr-3 md:pl-48 lg:pl-56 xl:pl-70">
      <Title text1="List" text2="Shows" />

      {/* table */}
      <div className="mt-8 overflow-x-auto">
        <table className="border-collapse overflow-hidden rounded-lg text-sm shadow xl:min-w-5xl">
          <thead>
            <tr className="bg-teal-500 text-left text-white">
              <th className="border px-3 py-2.5">Movie Name</th>
              <th className="border px-3 py-2.5">Show Time</th>
              <th className="border px-3 py-2.5">Total Bookings</th>
              <th className="border px-3 py-2.5">Earnings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                Demon Slayer: Kimetsu no Yaiba
              </td>
              <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                Mon, November 10 at 2:45 PM
              </td>
              <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                62
              </td>
              <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                Rs. 1488
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListShows;
