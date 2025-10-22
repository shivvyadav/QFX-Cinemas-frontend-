import React, { useState } from "react";
import { motion } from "framer-motion";
import Payment from "../payment/Payment";
import { useUser, useClerk } from "@clerk/clerk-react"; // 👈 import Clerk hooks

const SeatBooked = ({ movie, seats, totalAmount }) => {
  const [showPayment, setShowPayment] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk(); // 👈 allows programmatic sign-in popup

  const handleProceed = () => {
    if (!isSignedIn) {
      openSignIn({
        // optional redirect to same page after sign in
        redirectUrl: window.location.pathname,
      });
      return;
    }
    setShowPayment(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 flex w-full items-center justify-around gap-4 border-t border-neutral-200 bg-neutral-50 px-4 py-5 md:gap-8 lg:gap-16"
      >
        <div className="flex gap-12">
          <div>
            <p className="text-sm text-neutral-500">Selected</p>
            <p className="font-semibold text-neutral-800">
              {seats.length} seats
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Total</p>
            <p className="font-semibold text-neutral-800">Rs. {totalAmount}</p>
          </div>
        </div>
        <button
          className="cursor-pointer rounded-xl bg-black px-8 py-2.5 font-semibold text-white"
          onClick={handleProceed}
        >
          Proceed
        </button>
      </motion.div>

      {showPayment && (
        <Payment
          showId={movie._id}
          setShowPayment={setShowPayment}
          seats={seats}
          totalAmount={totalAmount}
        />
      )}
    </>
  );
};

export default SeatBooked;
