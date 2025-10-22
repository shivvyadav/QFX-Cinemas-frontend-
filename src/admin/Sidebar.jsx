import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, SquarePlus, List, TicketCheck } from "lucide-react";
const items = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Shows",
    path: "/admin/addShows",
    icon: SquarePlus,
  },
  {
    name: "List Shows",
    path: "/admin/listShows",
    icon: List,
  },
  {
    name: "List Bookings",
    path: "/admin/listBookings",
    icon: TicketCheck,
  },
];
const Sidebar = () => {
  return (
    <>
      <div className="fixed z-30 min-h-screen border-r border-neutral-300 bg-neutral-50 pt-24 xl:w-[15rem]">
        <div className="flex flex-col gap-2 pl-2 md:pl-12 lg:pl-16">
          <img
            src="../../admin.jpg"
            alt="admin"
            className="size-10 rounded-full border border-neutral-300 object-cover xl:size-16"
          />

          <p className="hidden text-sm font-semibold md:block xl:px-2">Admin</p>
        </div>
        <div className="mt-4 flex flex-col">
          {items.map((item) => (
            <div key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/admin/dashboard"}
                onClick={() => scrollTo(0, 0)}
                className={({ isActive }) => {
                  if (isActive) {
                    return "flex items-center gap-2 rounded-r-sm border-r-6 border-teal-800 bg-teal-300 px-4 py-2 text-sm font-semibold md:px-6 lg:px-10 xl:text-[14px]";
                  } else {
                    return "flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-800 md:px-6 md:text-[14px] lg:px-10";
                  }
                }}
              >
                <item.icon className="size-5" />
                <p className="hidden md:block">{item.name}</p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
