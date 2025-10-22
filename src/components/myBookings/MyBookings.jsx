import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import Loader from "../loader/Loader";
import { ActualTime, FormatTime } from "../../lib/utils";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchMyBookings = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/bookings/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 md:px-24 md:py-20 lg:px-40 xl:px-64 xl:py-24">
      <h1 className="my-6 text-xl font-semibold xl:text-2xl">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-neutral-600">No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="mb-4 flex w-full justify-between rounded-lg border border-neutral-300 bg-neutral-50 shadow md:p-3 xl:h-48"
          >
            <div className="flex gap-2 overflow-hidden xl:gap-4">
              <img
                src={booking.show?.poster || "../media/defaultPoster.jpg"}
                alt={booking.show?.title}
                className="hidden h-full rounded-md md:block md:h-36 md:w-32 xl:h-full xl:w-44"
              />
              <div className="space-y-2 p-2 xl:p-4">
                <h2 className="text-md font-semibold xl:text-xl">
                  {booking.show?.title || "Untitled Show"}
                </h2>
                <p className="text-sm font-medium text-neutral-700">
                  {booking.show?.runtime
                    ? ActualTime(booking.show.runtime)
                    : "N/A"}
                </p>
                <p className="text-sm font-medium text-neutral-700">
                  {booking.date} | {FormatTime(booking.time)}
                </p>
              </div>
            </div>
            <div className="space-y-2 p-2 text-right xl:p-4">
              <h2 className="text-md font-semibold xl:text-xl">
                Rs. {booking.totalAmount}
              </h2>
              <p className="text-sm font-medium text-neutral-700">
                Total tickets : {booking.seats.length}
              </p>
              <p className="text-sm font-medium text-neutral-700">
                Seats : {booking.seats.join(", ")}
              </p>
              <p
                className={`text-sm font-semibold ${
                  booking.bookingStatus === "expired"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {booking.bookingStatus}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
