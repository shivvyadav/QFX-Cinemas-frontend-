import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";

const ProtectedAdminRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const verifyAdmin = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        setIsVerifying(true);
        const token = await getToken();
        const res = await axios.get("http://localhost:3000/api/admin/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!cancelled && res.data?.success) {
          setIsAdmin(true);
          if (!sessionStorage.getItem("adminWelcomed")) {
            toast.success(res.data.message || "Welcome Admin!");
            sessionStorage.setItem("adminWelcomed", "true");
          }
        } else {
          setIsAdmin(false);
          toast.error(res.data?.message || "Access denied: Admins only!");
        }
      } catch (err) {
        if (!cancelled) {
          setIsAdmin(false);
          toast.error(
            err?.response?.data?.message || "Access denied: Admins only!",
          );
        }
      } finally {
        if (!cancelled) setIsVerifying(false);
      }
    };

    verifyAdmin();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);

  if (isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader z={50} />
      </div>
    );
  }

  if (!isSignedIn || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
