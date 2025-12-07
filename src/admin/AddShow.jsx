import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import Title from "./Title";
import Loader from "../components/loader/Loader";
import { toast } from "react-hot-toast";
import {
  IconSquareCheckFilled,
  IconBackspaceFilled,
} from "@tabler/icons-react";

const AddShow = () => {
  const { acrossRegionMovies, isLoading } = useContext(AppContext);

  const [selectedMovie, setSelectedMovie] = useState(null);
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
      const updated = { ...prev };
      updated[date] = updated[date].filter((t) => t !== time);

      if (updated[date].length === 0) delete updated[date];

      return updated;
    });
  };

  const handleAddShow = async () => {
    if (!selectedMovie) {
      toast.error("Select a movie");
      return;
    }

    if (Object.keys(totalDateAndTime).length === 0) {
      toast.error("Select date and time");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/shows/addShow`,
        {
          movieId: selectedMovie,
          showDateTime: totalDateAndTime,
        },
      );

      setSelectedMovie(null);
      setDateAndTime("");
      setTotalDateAndTime({});
      toast.success(res.data.message || "Show added successfully");
      scrollTo(0, 0);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="gradient min-h-screen pt-24 pb-8 pl-20 md:pl-48 lg:pl-56 xl:pl-70">
      {isLoading && (
        <Loader
          z={10}
          translate={"translate-x-12 md:translate-x-22 translate-y-2"}
        />
      )}

      <Title text1="Add" text2="Show" />

      <h2 className="py-4 text-sm font-semibold text-neutral-700 md:text-lg lg:pt-8">
        Now Playing Movies
      </h2>

      {/* Movie List */}
      <div className="overflow-x-scroll">
        <div className="group flex gap-2 py-2 md:gap-4">
          {acrossRegionMovies.map((movie) => (
            <div
              key={movie._id}
              onClick={() => setSelectedMovie(movie._id)}
              className="group relative w-48 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-neutral-300 shadow transition-transform duration-300 hover:-translate-y-1"
            >
              <img src={movie.poster} className="h-52 w-full" />
              <div className="p-2">
                <h3 className="text-sm font-semibold">{movie.title}</h3>
                <p className="pt-1 text-xs font-medium text-neutral-700">
                  {movie.language} | {movie.release_date?.slice(0, 4)}
                </p>
              </div>

              {selectedMovie === movie._id && (
                <IconSquareCheckFilled className="absolute top-2 right-2 size-7 text-white" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Date & Time Picker */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-neutral-800">
          Select Date and Time
        </label>

        <input
          type="datetime-local"
          value={dateAndTime}
          onChange={(e) => setDateAndTime(e.target.value)}
          className="mt-2 mr-2 rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm font-medium"
        />

        <button
          onClick={handleAddDateAndTime}
          className="mt-4 rounded-lg bg-red-500 px-5 py-2 text-white"
        >
          Add
        </button>
      </div>

      {/* Selected Times */}
      {Object.keys(totalDateAndTime).length > 0 && (
        <div className="my-8">
          <h2 className="text-sm font-medium text-neutral-700">
            Selected Date & Time
          </h2>

          {Object.entries(totalDateAndTime).map(([date, times]) => (
            <div key={date} className="mb-4">
              <h3 className="text-sm font-semibold">{date}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {times.map((time) => (
                  <div
                    key={time}
                    className="flex items-center gap-4 rounded-lg border px-2 py-2"
                  >
                    {time}
                    <IconBackspaceFilled
                      onClick={() => handleRemoveDateAndTime(date, time)}
                      className="size-6 cursor-pointer text-red-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Show Button */}
      <div className="my-8">
        <button
          onClick={handleAddShow}
          className="rounded-lg bg-red-500 px-5 py-2 text-white"
        >
          Add Show
        </button>
      </div>
    </div>
  );
};

export default AddShow;
