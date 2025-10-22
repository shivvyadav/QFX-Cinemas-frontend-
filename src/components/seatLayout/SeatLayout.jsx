import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Seat from "./Seat";
import SeatInfo from "./SeatInfo";
import { useNavigate, useParams } from "react-router-dom";
import { ExtractGenre, FormatTime, TicketRate } from "../../lib/utils";
import SeatBooked from "./SeatBooked";

// 🧩 Helper functions
const getDayName = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  const dayIndex = d.getDay();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[dayIndex];
};

const getShowPeriod = (timeStr) => {
  // Expecting timeStr like "13:30" or "09:00"
  const [hour] = timeStr.split(":").map(Number);
  return hour < 12 ? "morning" : "afternoon";
};
const SeatLayout = () => {
  const { movie_id, date, time } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [movie, setMovie] = useState(null);
  const [rates, setRates] = useState({ sofa: 0, recliner: 0, solo: 0 });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/shows/${movie_id}`)
      .then((response) => {
        setMovie(response.data);
        const occupied =
          response.data?.occupiedSeats?.[date]?.[time] ||
          response.data?.occupiedSeats?.[date] ||
          response.data?.occupiedSeats ||
          [];
        setOccupiedSeats(Array.isArray(occupied) ? occupied : []);
      })
      .catch((error) => console.log(error));
  }, [movie_id, date, time]);

  // update rates when date/time changes
  useEffect(() => {
    if (!date || !time) return;
    const currentDay = getDayName(date);
    const period = getShowPeriod(time); // "morning" | "afternoon"
    const rateForDay = TicketRate().find((d) => d.day === currentDay);
    if (rateForDay) {
      // prefer explicit keys like morningSofa / afternoonSofa etc.
      const sofa = rateForDay[`${period}Sofa`] ?? rateForDay[`sofa`] ?? 0;
      const recliner =
        rateForDay[`${period}Recliner`] ?? rateForDay[`recliner`] ?? 0;
      const solo =
        rateForDay[`${period}Solo`] ??
        Math.round((sofa + recliner) / 2) ?? // fall back to mean
        200;

      setRates({ sofa, recliner, solo });
    } else {
      setRates({ sofa: 300, recliner: 225, solo: 250 });
    }
    setSelectedSeats([]);
  }, [date, time]);

  // If some selected seats become occupied, remove them from selection
  useEffect(() => {
    if (!occupiedSeats || occupiedSeats.length === 0) return;
    setSelectedSeats((prev) => prev.filter((s) => !occupiedSeats.includes(s)));
  }, [occupiedSeats]);

  // 🧠 Toggle seat select/unselect
  const handleSeatSelect = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((acc, seatId) => {
      const row = String(seatId).charAt(0).toUpperCase();
      if (["A", "B"].includes(row)) return acc + (rates.sofa ?? 0);
      if (["C", "D", "E", "F", "G", "H"].includes(row))
        return acc + (rates.recliner ?? 0);
      if (["I"].includes(row)) return acc + (rates.solo ?? 0);
      return acc;
    }, 0);
  }, [selectedSeats, rates]);

  // Seat row helper
  const renderRow = (rowLabel, leftCount, rightCount = 0) => (
    <div className="mb-4 flex w-full items-center justify-center gap-6 px-4">
      <h2 className="w-4 text-sm font-semibold text-neutral-800">{rowLabel}</h2>
      <div className="flex gap-12">
        <div className="flex gap-2">
          {Array.from({ length: leftCount }, (_, i) => {
            const id = `${rowLabel}${i + 1}`;
            return (
              <Seat
                key={id}
                _id={id}
                isOccupied={occupiedSeats.includes(id)}
                isSelected={selectedSeats.includes(id)}
                onSelect={handleSeatSelect}
              />
            );
          })}
        </div>
        {rightCount > 0 && (
          <div className="flex gap-2">
            {Array.from({ length: rightCount }, (_, i) => {
              const id = `${rowLabel}${leftCount + i + 1}`;
              return (
                <Seat
                  key={id}
                  _id={id}
                  isOccupied={occupiedSeats.includes(id)}
                  isSelected={selectedSeats.includes(id)}
                  onSelect={handleSeatSelect}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  if (!movie) return <div className="min-h-screen"></div>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      }}
      className="min-h-screen bg-white"
    >
      {/* navbar */}
      <div className="fixed top-0 z-30 w-full border-b border-neutral-200 bg-neutral-50 px-6 py-5 shadow-sm md:px-16 lg:px-24 xl:px-36">
        <img
          src="../../../navLogo.svg"
          alt="navLogo"
          className="w-20 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* content */}
      <div className="mt-20 xl:mx-68">
        {/* sticky header */}
        <div className="sticky top-20 z-10 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-6 py-3 text-sm md:px-16 lg:px-24 xl:px-0 xl:text-base">
          <div className="text-neutral-700">
            <h2 className="text-base font-semibold lg:text-lg">
              {movie?.title}
            </h2>
            <p>{movie.genres && ExtractGenre(movie.genres)}</p>
          </div>
          <div className="font-medium">
            <h3>{date}</h3>
            <h3>
              {FormatTime(time)}, {getDayName(date)}
            </h3>
          </div>
        </div>

        {/* seat layout */}
        <div className="mx-6 overflow-x-auto py-4 text-center md:mx-16 lg:mx-28 xl:mx-24">
          {/* Sofa section */}
          <h2 className="py-4 text-sm font-medium text-neutral-800 md:text-lg">
            Sofa : Rs. {rates.sofa}
          </h2>
          {renderRow("A", 12)}
          {renderRow("B", 12)}

          {/* Recliner section */}
          <h2 className="py-4 text-sm font-medium text-neutral-800 md:text-lg">
            Recliner : Rs. {rates.recliner}
          </h2>
          {["C", "D", "E", "F", "G", "H"].map((row) => (
            <React.Fragment key={row}>{renderRow(row, 7, 9)}</React.Fragment>
          ))}

          {/* Last row */}
          <h2 className="py-4 text-sm font-medium text-neutral-800 md:text-lg">
            Solo : Rs. {rates.solo}
          </h2>
          {renderRow("I", 12)}

          {/* Screen */}
          <div className="mt-12 mb-24 flex justify-center">
            <img src="../../../screen.png" alt="screen" className="w-96" />
          </div>
        </div>
      </div>

      {/* Info panel */}
      <SeatInfo />
      {selectedSeats.length > 0 && (
        <SeatBooked
          movie={movie}
          seats={selectedSeats}
          totalAmount={totalAmount}
        />
      )}
    </motion.div>
  );
};

export default SeatLayout;
