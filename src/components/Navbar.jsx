import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Menu, X, TicketPlus, UserStar } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Movies",
    path: "/movies",
  },
  {
    name: "Theatre",
    path: "/theatre",
  },
  {
    name: "Activities",
    path: "/activities",
  },
  {
    name: "More",
    path: "/releases",
  },
];
const smallLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Movies",
    path: "/movies",
  },
  {
    name: "Theatre",
    path: "/theatre",
  },
  {
    name: "Activities",
    path: "/activities",
  },
  {
    name: "Ticket rate",
    path: "/ticketRate",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      className="fixed z-40 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-6 py-5 md:px-16 lg:px-24 lg:text-sm xl:px-36 xl:text-base"
    >
      <Link to="/" onClick={() => scrollTo(0, 0)}>
        <img
          src="../../navLogo.svg"
          alt="Logo"
          className="w-12 md:w-16 xl:w-20"
        />
      </Link>

      <div className="hidden font-medium text-neutral-700 lg:flex lg:justify-center lg:gap-6 xl:gap-10">
        {links.map((link) =>
          link.name == "More" ? (
            <div
              key={link.name}
              className="relative h-full cursor-pointer px-3 py-1.5 text-neutral-700 hover:text-red-500"
              onMouseEnter={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
            >
              More
              {dropDown && (
                <div className="absolute h-28 w-48 -translate-x-8 translate-y-[6px] overflow-hidden rounded-sm bg-white py-4 text-neutral-600 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                  <NavLink
                    to="/ticketRate"
                    onClick={() => {
                      (scrollTo(0, 0), setDropDown(false));
                    }}
                    className="block py-2 transition-colors duration-300 hover:bg-neutral-100 hover:text-red-500"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ticket Rate
                  </NavLink>
                  <NavLink
                    to="/gallery"
                    onClick={() => {
                      (scrollTo(0, 0), setDropDown(false));
                    }}
                    className="block py-2 transition-colors duration-300 hover:bg-neutral-100 hover:text-red-500"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gallery
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => {
                if (isActive) {
                  return `un rounded-full px-3 py-1.5 text-red-600 underline underline-offset-4`;
                }
                return `rounded-full px-3 py-1.5 text-neutral-700 transition-colors duration-300 hover:text-red-500`;
              }}
              onClick={() => scrollTo(0, 0)}
            >
              {link.name}
            </NavLink>
          ),
        )}
      </div>

      <div className="flex items-center gap-8 font-medium">
        <Search
          size={20}
          className="hidden cursor-pointer hover:scale-110 lg:block"
        />

        {user ? (
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus size={16} />}
                  onClick={() => navigate("/myBookings")}
                />
                {user?.emailAddresses[0]?.emailAddress ==
                  import.meta.env.VITE_ADMIN_EMAIL && (
                  <UserButton.Action
                    label="Admin Dashboard"
                    labelIcon={<UserStar size={16} />}
                    onClick={() => navigate("/admin/dashboard")}
                  />
                )}
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        ) : (
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group relative hidden overflow-hidden rounded-full border px-4 py-1.5 lg:block">
                <span className="absolute inset-0 -translate-x-full bg-neutral-900 transition-transform duration-300 ease-linear group-hover:translate-x-0" />
                <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
                  Login
                </span>
              </button>
            </SignInButton>
          </SignedOut>
        )}
        <Menu
          size={20}
          className="text-text-secondary lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <div className="absolute inset-0 top-0 right-0 flex h-screen w-full flex-col gap-2 bg-white text-neutral-700 lg:hidden">
          <X
            size={20}
            className="absolute top-6 right-6 md:right-16"
            onClick={() => {
              (scrollTo(0, 0), setIsOpen(!isOpen));
            }}
          />
          <div className="flex w-full flex-col gap-4 px-6 pt-16 pb-6 text-center font-medium">
            {smallLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => {
                  if (isActive) {
                    return `mx-auto rounded-full px-6 py-1.5 text-red-500 md:px-20`;
                  }
                  return `rounded-full px-3 py-1.5 text-neutral-700`;
                }}
                onClick={() => {
                  (scrollTo(0, 0), setIsOpen(!isOpen));
                }}
              >
                {link.name}
              </NavLink>
            ))}
            {user ? null : (
              <button
                className="group relative mx-auto overflow-hidden rounded-full border px-8 py-1.5 md:px-16"
                onClick={() => {
                  (scrollTo(0, 0), setIsOpen(!isOpen));
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
