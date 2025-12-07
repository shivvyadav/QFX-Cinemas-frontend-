import React, { useState, useEffect } from "react";
import axios from "axios";
import { TicketCheck, Users, Clapperboard, Coins } from "lucide-react";
import { IconTrashFilled } from "@tabler/icons-react";
import Title from "./Title";
import { YearExtract } from "../lib/utils";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
import Loader from "../components/loader/Loader";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [activeNow, setActiveNow] = useState([]);
  const [deleteShowId, setDeleteShowId] = useState(null);

  const handleDelete = async (showId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/shows/deleteShow/${showId}`,
      );
      fetchSummary();
      fetchActiveNow();
      setDeleteShowId(null);
      toast.success("Show deleted successfully");
    } catch (error) {
      console.error("Error deleting show:", error);
    }
  };
  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admin/summary`,
      );
      if (res.data.success) setSummary(res.data.summary);
    } catch (err) {
      console.error("Error fetching admin summary:", err);
    }
  };

  const fetchActiveNow = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/shows/activeShows`,
      );
      setActiveNow(response.data);
    } catch (error) {
      console.error("Error fetching active shows:", error);
    }
  };
  useEffect(() => {
    fetchSummary();
    fetchActiveNow();
  }, []);

  if (!summary) return <Loader />;
  const items = [
    {
      name: "Total Movies",
      value: summary?.totalMovies || 0,
      icon: Clapperboard,
    },
    {
      name: "Total Bookings",
      value: summary?.totalBookings || 0,
      icon: TicketCheck,
    },
    {
      name: "Total Earnings",
      value: `Rs. ${summary?.totalEarnings}`,
      icon: Coins,
    },
    { name: "Total Users", value: summary?.totalUsers || 0, icon: Users },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      className="relative min-h-screen py-24 pl-20 md:pl-48 lg:pl-56 xl:pl-70"
    >
      <Title text1="Admin" text2="Dashboard" />
      <div className="my-6 flex flex-wrap gap-4 xl:gap-6">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex h-16 w-36 items-center justify-around rounded-lg border border-neutral-300 bg-neutral-50 shadow md:h-18 md:w-40 xl:h-20 xl:w-48"
          >
            <div>
              <h2 className="text-sm font-medium text-neutral-800 xl:text-base">
                {item.name}
              </h2>
              <p className="font-medium text-neutral-800 md:text-base xl:text-lg">
                {item.value}
              </p>
            </div>
            <item.icon className="size-5 text-red-500 xl:size-7" />
          </div>
        ))}
      </div>

      {/* active now  */}
      <h2 className="py-5 text-sm font-semibold text-neutral-700 md:text-lg lg:pt-8">
        Active Shows
      </h2>
      <div className="relative flex flex-wrap gap-4 py-2">
        {activeNow.map((show) => (
          <div
            key={show._id}
            className="group relative w-52 overflow-hidden rounded-xl border border-neutral-300 shadow"
          >
            <img src={show.poster} alt="" className="h-56 w-full" />
            <div className="p-3">
              <h3 className="text-sm leading-4 font-semibold md:text-base md:leading-5">
                {show.title}
              </h3>
              <p className="pt-2 text-xs font-medium text-neutral-700 md:text-[14px]">
                {show.language} | <span>{YearExtract(show.release_date)}</span>
              </p>

              {/* delete icon */}
              <IconTrashFilled
                onClick={() =>
                  setDeleteShowId((prev) =>
                    prev === show._id ? null : show._id,
                  )
                }
                className="absolute right-4 bottom-4 size-6 text-red-500 hover:text-red-600"
              />

              {/* conditional confirm box */}
              {deleteShowId === show._id && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/60 text-white">
                  <p>Confirm to delete?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(show._id)}
                      className="mr-2 rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteShowId(null)}
                      className="rounded bg-neutral-200 px-4 py-1 text-sm font-medium text-neutral-800 hover:bg-neutral-300"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
