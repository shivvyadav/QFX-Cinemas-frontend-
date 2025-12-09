import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";
import axios from "axios";

const ProtectedAdminRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const toastShown = useRef(false);

  useEffect(() => {
    let cancelled = false;

    if (isLoaded && !isSignedIn) {
      setIsVerifying(false);
      return;
    }

    const verifyAdmin = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        setIsVerifying(true);
        const token = await getToken();
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/verify`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!cancelled && res.data?.success) {
          setIsAdmin(true);
          if (!sessionStorage.getItem("adminWelcomed")) {
            toast.success(res.data.message || "Welcome Admin!");
            sessionStorage.setItem("adminWelcomed", "true");
          }
        } else {
          setIsAdmin(false);
          if (!toastShown.current) {
            toast.error(res.data?.message || "Admins only!");
            toastShown.current = true;
          }
        }
      } catch (err) {
        if (!cancelled) {
          setIsAdmin(false);
          if (!toastShown.current) {
            toast.error(err?.response?.data?.message || "Admins only!");
            toastShown.current = true;
          }
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

  if (isLoaded && !isSignedIn) {
    if (!toastShown.current) {
      toast.error("You are not signed in");
      toastShown.current = true;
    }
    return <Navigate to="/" replace />;
  }

  if (!isLoaded || isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader z={50} />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
