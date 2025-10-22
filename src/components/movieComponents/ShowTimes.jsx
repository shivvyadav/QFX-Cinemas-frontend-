import React, { useState, useEffect } from "react";
import { FormatDate, FormatTime } from "../../lib/utils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ShowTimes = ({ movie }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  // ✅ Handle case where movie or showDateTime not loaded yet
  const showDateTime = movie?.showDateTime || {};

  useEffect(() => {
    const dates = Object.keys(showDateTime || {});

    if (dates.length > 0) {
      const today = new Date().setHours(0, 0, 0, 0);

      // ✅ Find first future date
      const upcomingDate = dates.find((dateKey) => {
        const dateObj = new Date(dateKey);
        return dateObj >= today;
      });

      setSelectedDate(upcomingDate || dates[0]);
    }
  }, [showDateTime]);

  // ✅ Check if a show is in the past
  const isPastShow = (date, time) => {
    const showDateTime = new Date(`${date}T${time}:00`);
    return showDateTime < new Date();
  };

  const handleBookTicket = (time) => {
    if (isPastShow(selectedDate, time)) return;

    const selectedDateTimes = showDateTime[selectedDate] || [];
    const selectedDateTime = selectedDateTimes.find((t) => t === time);
    if (!selectedDateTime) {
      toast.error("Selected time not available");
      return;
    }

    navigate(`/seatLayout/${movie._id}/${selectedDate}/${time}`);
    scrollTo(0, 0);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 px-5 py-4 xl:px-8">
      <h2 className="pb-4 text-base font-semibold text-red-600 md:text-xl">
        Show times
      </h2>

      {/* Date selection */}
      <h2 className="text-sm font-medium text-neutral-800 md:text-base">
        Choose date
      </h2>

      <div className="my-2 flex flex-wrap gap-4">
        {Object.keys(showDateTime).length > 0 ? (
          Object.keys(showDateTime).map((dateKey) => {
            const { day, month } = FormatDate(dateKey);
            const isActive = selectedDate === dateKey;
            const dateObj = new Date(dateKey);
            const isPastDate = dateObj < new Date().setHours(0, 0, 0, 0);

            return (
              <div
                key={dateKey}
                onClick={() => {
                  if (!isPastDate) setSelectedDate(dateKey);
                }}
                className={`flex flex-col items-center justify-center rounded-xl border px-3 py-2 transition-all duration-200 ${
                  isPastDate
                    ? "cursor-default bg-neutral-100 text-neutral-400 opacity-60"
                    : isActive
                      ? "cursor-pointer border-black bg-black text-white"
                      : "cursor-pointer bg-white text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                <p className="text-lg font-medium xl:text-xl">{day}</p>
                <p className="text-sm xl:text-base">{month}</p>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-neutral-500">No show dates available</p>
        )}
      </div>

      {/* Timings */}
      <h2 className="pt-4 text-sm font-medium text-neutral-800 md:text-base">
        Available timings
      </h2>

      <div className="my-2 flex flex-wrap gap-4">
        {selectedDate && Array.isArray(showDateTime[selectedDate]) ? (
          showDateTime[selectedDate].map((time, i) => {
            const past = isPastShow(selectedDate, time);
            return (
              <div
                key={i}
                onClick={() => !past && handleBookTicket(time)}
                className={`rounded-xl border px-4 py-2.5 text-base font-medium transition-all duration-200 xl:px-8 xl:py-3 ${
                  past
                    ? "cursor-default bg-neutral-100 text-neutral-400 opacity-60"
                    : "cursor-pointer bg-white text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {FormatTime(time)}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-neutral-500">Select a date to see times</p>
        )}
      </div>
    </div>
  );
};

export default ShowTimes;
