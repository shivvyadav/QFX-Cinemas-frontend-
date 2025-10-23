import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

const Payment = ({ setShowPayment, seats, totalAmount, showId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const { date, time } = useParams();

  // ------------------ Khalti Payment ------------------
  const handleKhaltiPayment = async () => {
    try {
      const orderId = `ORDER-${Date.now()}`;
      localStorage.setItem("selectedSeats", JSON.stringify(seats));
      localStorage.setItem("totalAmount", totalAmount);
      localStorage.setItem("date", date);
      localStorage.setItem("time", time);
      localStorage.setItem("showId", showId);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/khalti/initiate`,
        {
          amount: totalAmount * 100,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      if (res.data.success) {
        window.location.href = res.data.payment_url;
      } else {
        toast.error("Payment initiation failed");
      }
    } catch (err) {
      console.error("Khalti initiation error:", err);
    }
  };

  // ------------------ End Khalti Payment ------------------

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      className="fixed top-[50%] left-[50%] z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between gap-6 rounded-xl border border-neutral-300 bg-neutral-50 p-6 shadow-lg w-[300px]  md:w-[600px] md:flex-row md:p-8"
    >
      {/* Seat info */}
      <div className="flex flex-col gap-2 md:gap-6">
        <div className="space-y-2">
          <p className="text-lg font-medium">Seats :</p>
          <div className="flex flex-wrap gap-2">
            {seats.map((seat) => (
              <div
                key={seat}
                className="h-6 w-10 rounded-sm bg-black text-center text-white"
              >
                {seat}
              </div>
            ))}
          </div>
        </div>
        <p>
          <span className="text-lg font-medium text-red-500">Total: Rs.</span>{" "}
          {totalAmount}
        </p>
      </div>

      {/* Payment options */}
      <div className="space-y-4 border-neutral-300 md:border-l md:pl-6 mr-2">
        <p className="md:text-center text-lg font-medium">Payment Mode</p>
        <div className="flex  gap-4">
          <button
            onClick={handleKhaltiPayment}
            className="w-24 rounded-md border border-neutral-300 p-4 hover:border-neutral-500"
          >
            <img
              src="../../../khalti.png"
              alt="Khalti"
              className="mx-auto block"
            />
          </button>

          {isAdmin && (
            <button
              // onClick={() => handleBooking("cash")}
              className="w-24 rounded-md border border-neutral-300 p-4 text-center font-semibold hover:border-neutral-500"
            >
              Cash
            </button>
          )}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setShowPayment(false)}
        className="absolute top-2 right-2 cursor-pointer rounded-md border border-neutral-200 text-red-500 hover:text-red-700"
      >
        <X />
      </button>
    </motion.div>
  );
};

export default Payment;
