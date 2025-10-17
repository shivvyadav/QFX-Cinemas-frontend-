import React, { useState } from "react";
import Payment from "../payment/Payment";

const SeatBooked = ({ seats, totalAmount, handleProceed }) => {
  const [showPayment, setShowPayment] = useState(false);
  return (
    <>
      <div className="fixed bottom-0 flex w-full items-center justify-around gap-4 border-t border-neutral-200 bg-neutral-50 px-4 py-5 md:gap-8 lg:gap-16">
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
          onClick={() => {
            handleProceed();
            setShowPayment(true);
          }}
        >
          Proceed
        </button>
      </div>
      {showPayment && (
        <Payment
          setShowPayment={setShowPayment}
          seats={seats}
          totalAmount={totalAmount}
        />
      )}
    </>
  );
};

export default SeatBooked;
