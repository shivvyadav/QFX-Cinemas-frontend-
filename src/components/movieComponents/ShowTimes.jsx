import React, { useState, useEffect } from "react";
import { FormatDate, FormatTime } from "../../lib/utils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ShowTimes = ({ movie }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const dates = Object.keys(movie.showDateTime);
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, [movie.showDateTime]);

  const handleBookTicket = (time) => {
    const selectedDateTimes = movie.showDateTime[selectedDate] || [];
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

      {/* for dates */}
      <h2 className="text-sm font-medium text-neutral-800 md:text-base">
        Choose date
      </h2>

      <div className="my-2 flex flex-wrap gap-4">
        {Object.keys(movie.showDateTime).map((dateKey) => {
          const { day, month } = FormatDate(dateKey);
          const isActive = selectedDate === dateKey;

          return (
            <div
              key={dateKey}
              onClick={() => {
                setSelectedDate(dateKey);
              }}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border px-3 py-2 transition-all duration-200 ${
                isActive
                  ? "border-black bg-black text-white"
                  : "bg-white text-neutral-800 hover:bg-neutral-100"
              }`}
            >
              <p className="text-lg font-medium xl:text-xl">{day}</p>
              <p className="text-sm xl:text-base">{month}</p>
            </div>
          );
        })}
      </div>

      {/* for timings */}
      <h2 className="pt-4 text-sm font-medium text-neutral-800 md:text-base">
        Available timings
      </h2>
      <div className="my-2 flex flex-wrap gap-4">
        {selectedDate ? (
          movie.showDateTime[selectedDate].map((time, i) => (
            <div
              key={i}
              onClick={() => handleBookTicket(time)}
              className="cursor-pointer rounded-xl border bg-white px-4 py-2.5 text-base font-medium text-neutral-800 transition-all duration-200 hover:bg-neutral-100 xl:px-8 xl:py-3"
            >
              {FormatTime(time)}
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-500">Select a date to see times</p>
        )}
      </div>
    </div>
  );
};

export default ShowTimes;
