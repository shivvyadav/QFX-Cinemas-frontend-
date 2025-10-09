import React from "react";
import { TicketCheck, Users, Clapperboard, Coins } from "lucide-react";
import Title from "./Title";

const items = [
  {
    name: "Total Bookings",
    icon: TicketCheck,
  },
  {
    name: "Total Revenue",
    icon: Coins,
  },
  {
    name: "Total Movies",
    icon: Clapperboard,
  },
  {
    name: "Total Users",
    icon: Users,
  },
];

const Dashboard = () => {
  return (
    <div className="gradient min-h-screen py-24 pl-20 md:pl-48 lg:pl-56 xl:pl-70">
      <Title text1="Admin" text2="Dashboard" />
      <div className="my-6 flex flex-wrap gap-4 xl:gap-6">
        {items.map((item) => (
          <div className="flex h-16 w-36 items-center justify-around rounded-lg border border-neutral-300 bg-neutral-50 shadow md:h-18 md:w-40 xl:h-20 xl:w-48">
            <div>
              <h2 className="text-sm font-medium text-neutral-800 xl:text-base">
                {item.name}
              </h2>
              <p className="font-medium text-neutral-800 md:text-base xl:text-lg">
                24
              </p>
            </div>
            <item.icon className="size-5 text-teal-800 xl:size-7" />
          </div>
        ))}
      </div>

      {/* active now  */}
      <h2 className="py-5 text-sm font-semibold text-neutral-700 md:text-lg lg:pt-8">
        Active Shows
      </h2>
      <div className="flex flex-wrap gap-3 pr-3 md:gap-6">
        <div className="group relative w-52 overflow-hidden rounded-xl border border-neutral-300 shadow">
          <img src="../media/demonSlayer.jpg" alt="" className="h-56 w-full" />
          <div className="p-2">
            <h3 className="text-sm leading-4 font-semibold md:text-base md:leading-5">
              Demon Slayer: Kimetsu no Yaiba
            </h3>
            <p className="pt-1 text-xs font-medium text-neutral-700 md:text-[14px]">
              Hindi | <span>2025</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
