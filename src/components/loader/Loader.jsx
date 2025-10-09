import React from "react";

const Loader = ({ z }) => {
  return (
    <div
      className={`absolute inset-0 z-${z} flex min-h-screen items-center justify-center bg-black`}
    >
      <div className="flex space-x-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`animate-bar w-1 bg-red-600 sm:w-2 md:w-3`}
            style={{
              animationDelay: `${i * 0.15}s`,
              height: "44px",
              borderRadius: "4px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
