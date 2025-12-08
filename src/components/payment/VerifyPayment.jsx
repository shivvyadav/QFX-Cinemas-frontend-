import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = searchParams.get("pidx");
      const seats = JSON.parse(localStorage.getItem("selectedSeats") || "[]");
      const totalAmount = localStorage.getItem("totalAmount");
      const showId = localStorage.getItem("showId");
      const date = localStorage.getItem("date");
      const time = localStorage.getItem("time");

      if (!pidx) {
        toast.error("Missing payment information.");
        navigate("/");
        return;
      }

      try {
        const token = await getToken();
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/khalti/verify`,
          {
            pidx,
            totalAmount,
            seats,
            date,
            time,
            showId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          toast.success("Payment verified successfully!");
          localStorage.removeItem("selectedSeats");
          localStorage.removeItem("totalAmount");
          localStorage.removeItem("date");
          localStorage.removeItem("time");
          localStorage.removeItem("showId");

          navigate("/myBookings");
          scrollTo(0, 0);
        } else {
          toast.error(res.data.message || "Payment failed.");
          navigate("/");
        }
      } catch (err) {
        console.error("Verification Error:", err.response?.data || err.message);
        toast.error("Payment verification failed.");
      }
    };

    verifyPayment();
  }, [searchParams, getToken, navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
      <p className="mt-6 text-lg font-medium text-gray-700">
        Verifying payment, please wait...
      </p>
    </div>
  );
};

export default VerifyPayment;
