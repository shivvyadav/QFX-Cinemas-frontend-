import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import Title from "./Title";
import Loader from "../components/loader/Loader";

const ListShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/shows/summary`,
        );
        if (res.data.success) setShows(res.data.shows);
      } catch (error) {
        console.error("Error fetching shows summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="min-h-screen py-24 pl-20 md:pr-3 md:pl-48 lg:pl-56 xl:pl-70"
    >
      <Title text1="List" text2="Shows" />

      {loading ? (
        <Loader />
      ) : shows.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No shows found.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="mr-4 border-collapse overflow-hidden rounded-lg text-sm shadow md:min-w-lg lg:min-w-2xl xl:min-w-5xl">
            <thead>
              <tr className="bg-teal-500 text-left text-white">
                <th className="border px-3 py-2.5">Movie Name</th>
                <th className="border px-3 py-2.5">Total Bookings</th>
                <th className="border px-3 py-2.5">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show.id} className="hover:bg-neutral-50">
                  <td className="border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-800">
                    {show.title}
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-center text-sm font-medium text-neutral-800">
                    {show.totalBookings}
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-center text-sm font-medium text-neutral-800">
                    Rs. {show.totalEarnings}
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

export default ListShows;
