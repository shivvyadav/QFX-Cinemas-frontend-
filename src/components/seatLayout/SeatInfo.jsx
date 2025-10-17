import React from "react";
import { X } from "lucide-react";

const SeatInfo = () => {
  return (
    <div className="fixed bottom-0 flex w-full flex-col items-center justify-center gap-1 border-t border-neutral-200 bg-neutral-50 py-2">
      <p className="text-sm font-medium text-blue">Screen this way</p>
      <div className="flex items-center gap-2 py-2 text-[12px]">
        <div className="size-5 rounded-md border"></div> <p>Available</p>
        <div className="relative size-5 rounded-md border border-neutral-300">
          <X className="absolute top-[50%] left-[50%] size-4 translate-x-[-50%] translate-y-[-50%] text-neutral-400" />
        </div>
        <p>Occupied</p>
        <div className="size-5 rounded-md border border-white bg-blue-500"></div>{" "}
        <p>Selected</p>
      </div>
    </div>
  );
};

export default SeatInfo;
