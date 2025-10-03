// src/pages/Error.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black">
      <div className="rounded-2xl p-8 text-center">
        <h1 className="font-extrabold drop-shadow-lg text-5xl md:text-6xl xl:text-7xl">
          404
        </h1>
        <h2 className="mt-4 font-semibold text-xl md:text-2xl xl:text-3xl">
          Oops! Page not found
        </h2>
        <p className="mt-2 max-w-md text-sm md:text-base text-gray-700 xl:text-lg">
          The page you are looking for doesn’t exist or has been moved. Let’s
          get you back on track.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-all duration-300 hover:bg-purple-200"
        >
          {" "}
          Go Home{" "}
        </button>
      </div>
    </div>
  );
};

export default Error;
