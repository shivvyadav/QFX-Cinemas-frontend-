import React, { useState } from "react";

const ShowTimes = () => {
  const [date, setDate] = useState(false);
  const [time, setTime] = useState(false);

  return (
    <div className="rounded-2xl border border-neutral-300 px-5 py-4 xl:px-8">
      <h2 className="pb-4 text-base font-semibold text-red-600 md:text-xl">
        Show times
      </h2>

      {/* for dates */}
      <h2 className="text-sm font-medium text-neutral-800 md:text-base">
        Choose date
      </h2>
      <div className="my-2 flex flex-wrap gap-4">
        <div
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border px-3 py-2 ${date}?("bg-black text-white"):(bg-white text-white)`}
          //   onClick={setDateColor(true)}
        >
          <p className="text-lg font-medium xl:text-2xl">6</p>
          <p className="text-sm xl:text-base">Oct</p>
        </div>
      </div>

      {/* for timings  */}
      <h2 className="pt-4 text-sm font-medium text-neutral-800 md:text-base">
        Available timings
      </h2>
      <div className="my-2 flex flex-wrap gap-4">
        <div
          className={`cursor-pointer rounded-xl border px-4 py-2.5 text-base font-medium xl:px-8 xl:py-3 ${time}?("bg-black text-white"):(bg-white text-white)`}
        >
          06:30 PM
        </div>
      </div>
    </div>
  );
};

export default ShowTimes;
