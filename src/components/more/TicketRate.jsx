const data = [
  {
    day: "SUN",
    morningSofa: 300,
    morningRecliner: 250,
    afternoonSofa: 500,
    afternoonRecliner: 440,
  },
  {
    day: "MON",
    morningSofa: 250,
    morningRecliner: 200,
    afternoonSofa: 250,
    afternoonRecliner: 200,
  },
  {
    day: "TUE",
    morningSofa: 250,
    morningRecliner: 250,
    afternoonSofa: 350,
    afternoonRecliner: 250,
  },
  {
    day: "WED",
    morningSofa: 250,
    morningRecliner: 250,
    afternoonSofa: 350,
    afternoonRecliner: 250,
  },
  {
    day: "THU",
    morningSofa: 300,
    morningRecliner: 250,
    afternoonSofa: 350,
    afternoonRecliner: 300,
  },
  {
    day: "FRI",
    morningSofa: 300,
    morningRecliner: 250,
    afternoonSofa: 500,
    afternoonRecliner: 440,
  },
  {
    day: "SAT",
    morningSofa: 300,
    morningRecliner: 250,
    afternoonSofa: 500,
    afternoonRecliner: 440,
  },
];
const TicketRate = () => {
  const todayIndex = new Date().getDay();

  return (
    <div className="py-20">
      <h1 className="bg-[#e2e2e2] text-center font-heading text-3xl leading-18 font-semibold md:leading-24">
        Ticket Prices
      </h1>
      <div className="overflow-x-auto px-6 pt-16 md:px-16 lg:px-24 xl:px-36">
        <table className="w-full border-collapse overflow-hidden rounded-lg text-sm shadow md:text-base">
          {/* Table Head */}
          <thead>
            <tr className="relative bg-red-600 text-white">
              <th className="absolute top-10 left-1 px-3 md:top-8 md:left-3 lg:left-6 xl:top-6 xl:left-12">
                Day
              </th>
              <th colSpan="2" className="border px-3 py-2">
                Morning (Before 11AM)
              </th>
              <th colSpan="2" className="border px-3 py-2">
                Afternoon (After 11AM)
              </th>
            </tr>
            <tr className="bg-red-600 text-white">
              <th className="border-b px-3 py-2.5"></th>
              <th className="border px-3 py-2.5">Sofa</th>
              <th className="border px-3 py-2.5">Recliner</th>
              <th className="border px-3 py-2.5">Sofa</th>
              <th className="border px-3 py-2.5">Recliner</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row, i) => {
              const isToday = i === todayIndex;
              return (
                <tr
                  key={i}
                  className={`text-center ${
                    isToday ? "bg-orange-300 font-semibold" : "bg-white"
                  }`}
                >
                  <td className="border border-neutral-200 px-3 py-2.5 text-[15px] font-semibold">
                    {row.day}
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-[15px] text-neutral-800">
                    Rs. {row.morningSofa}.00
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-[15px] text-neutral-800">
                    Rs. {row.morningRecliner}.00
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-[15px] text-neutral-800">
                    Rs. {row.afternoonSofa}.00
                  </td>
                  <td className="border border-neutral-200 px-3 py-2.5 text-[15px] text-neutral-800">
                    Rs. {row.afternoonRecliner}.00
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketRate;
