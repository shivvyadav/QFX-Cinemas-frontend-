import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import Title from "./Title";
import { FormatTime } from "../lib/utils";
import Loader from "../components/loader/Loader";

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/bookings/all`,
        ); // update base URL if needed
        if (res.data.success) {
          setBookings(res.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.3 },
      }}
      className="min-h-screen py-24 pl-20 md:pr-3 md:pl-48 lg:pl-56 xl:pl-70"
    >
      <Title text1="List" text2="Bookings" />

      {loading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="border-collapse overflow-hidden rounded-lg text-sm shadow xl:min-w-5xl">
            <thead>
              <tr className="bg-teal-500 text-left text-white">
                <th className="border px-3 py-2.5">User Name</th>
                <th className="border px-3 py-2.5">Movie Name</th>
                <th className="border px-3 py-2.5">Show Time</th>
                <th className="border px-3 py-2.5">Seats</th>
                <th className="border px-3 py-2.5">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                    {booking.show?.title || "Unknown Movie"}
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                    {booking.date} , {FormatTime(booking.time)}
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                    {booking.seats.join(", ")}
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                    Rs. {booking.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ListBookings;
