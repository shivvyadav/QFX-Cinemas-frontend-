import React from "react";

const Loader = ({ z, translate = "" }) => {
  return (
    <div
      className={`absolute inset-0 z-${z} flex items-center justify-center bg-neutral-50`}
    >
      <div className="flex space-x-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`animate-bar w-2 bg-red-600 md:w-3 ${translate}`}
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
