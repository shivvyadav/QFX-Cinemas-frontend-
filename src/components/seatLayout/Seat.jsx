import React from "react";
import { X } from "lucide-react";

const Seat = ({ _id, isSelected, isOccupied, onSelect }) => {
  const handleClick = () => {
    if (!isOccupied) onSelect(_id);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border text-xs font-medium transition-all duration-200 ${
        isOccupied
          ? "border-neutral-300 text-neutral-400"
          : isSelected
            ? "border-white bg-blue-600 text-white"
            : "bg-white text-black hover:bg-neutral-100"
      }`}
    >
      {isOccupied ? (
        <X className="h-4 w-4 text-neutral-500" />
      ) : (
        _id.replace(/^[A-Z]/, "")
      )}
    </div>
  );
};

export default Seat;
