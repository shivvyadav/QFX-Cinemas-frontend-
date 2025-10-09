import React, { useState } from "react";
import { CurrentMovies } from "../assets/ApiData";
import Title from "./Title";
import Loader from "../components/loader/Loader";
import { toast } from "react-hot-toast";
import {
  IconSquareCheckFilled,
  IconBackspaceFilled,
} from "@tabler/icons-react";

const AddShow = () => {
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [dateAndTime, setDateAndTime] = useState("");
  const [totalDateAndTime, setTotalDateAndTime] = useState({});
  let toastId = null;

  const handleAddDateAndTime = () => {
    if (!dateAndTime) {
      if (toastId) toast.dismiss(toastId);
      toastId = toast.error("Select date and time");
      return;
    }
    const [date, time] = dateAndTime.split("T");
    if (!date || !time) return;

    setTotalDateAndTime((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveDateAndTime = (date, time) => {
    setTotalDateAndTime((prev) => {
      const times = prev[date] || [];
      const updatedTimes = times.filter((t) => t !== time);
      if (updatedTimes.length === 0) {
        delete prev[date];
      } else {
        prev[date] = updatedTimes;
      }
      return { ...prev };
    });
  };
  // console.log(totalDateAndTime);

  const handleAddShow = () => {
    if (!selectedMovies) {
      if (toastId) toast.dismiss(toastId);
      toastId = toast.error("Select movie");
      return;
    }
    if (Object.keys(totalDateAndTime).length === 0) {
      if (toastId) toast.dismiss(toastId);
      toastId = toast.error("Select date and time");
      return;
    }

    toast.success("Show added successfully");
  };

  return (
    <>
      <div className="gradient relative min-h-screen pt-24 pb-8 pl-20 md:pl-48 lg:pl-56 xl:pl-70">
        <Title text1="Add" text2="Show" />
        <h2 className="py-4 text-sm font-semibold text-neutral-700 md:text-lg lg:pt-8">
          Now Playing movies
        </h2>
        <div className="overflow-x-scroll">
          <div className="group flex gap-2 py-2 md:gap-4">
            {CurrentMovies.map((movie) => (
              <div
                key={movie._id}
                onClick={() => setSelectedMovies(movie._id)}
                className="group relative w-48 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-neutral-300 shadow transition-transform duration-300 group-hover:not-hover:opacity-50 hover:-translate-y-1"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-52 w-full"
                />
                <div className="p-2">
                  <h3 className="text-sm leading-4 font-semibold md:leading-5">
                    {movie.title}
                  </h3>
                  <p className="pt-1 text-xs font-medium text-neutral-700 md:text-[14px]">
                    {movie.language} | <span>2025</span>
                  </p>
                </div>
                {selectedMovies === movie._id && (
                  <IconSquareCheckFilled className="absolute top-2 right-2 size-7 text-white" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* date and time selection */}
        <div className="mt-8">
          <label
            htmlFor="dateAndTime"
            className="block text-sm font-medium text-neutral-800"
          >
            Select Date and Time
          </label>
          <input
            type="datetime-local"
            name="dateAndTime"
            value={dateAndTime}
            onChange={(e) => setDateAndTime(e.target.value)}
            className="mt-2 mr-2 rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm font-medium text-neutral-900 focus:outline-none"
          />
          <button
            onClick={handleAddDateAndTime}
            className="mt-4 cursor-pointer rounded-lg bg-red-500 px-5 py-2 font-medium text-white hover:bg-red-600"
          >
            Add
          </button>
        </div>

        {/*display total date and time */}
        {Object.keys(totalDateAndTime).length > 0 && (
          <div className="my-8">
            <h2 className="text-sm font-medium text-neutral-700">
              Selected date and time
            </h2>
            <div className="mt-2 mr-2">
              {Object.entries(totalDateAndTime).map(([date, times]) => (
                <div key={date} className="mb-4">
                  <h3 className="text-sm font-semibold text-neutral-700 md:text-base">
                    {date}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {times.map((time) => (
                      <div
                        key={time}
                        className="flex gap-4 rounded-lg border border-neutral-600 bg-neutral-50 px-2 py-2 font-medium"
                      >
                        {time}{" "}
                        <IconBackspaceFilled
                          onClick={() => handleRemoveDateAndTime(date, time)}
                          className="size-6 cursor-pointer text-red-400 hover:text-red-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* add show */}
        <div className="my-8">
          <button
            onClick={handleAddShow}
            className="cursor-pointer rounded-lg bg-red-500 px-5 py-2 font-medium text-white hover:bg-red-600"
          >
            Add Show
          </button>
        </div>
      </div>
    </>
  );
};

export default AddShow;
