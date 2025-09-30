import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

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
    path: "/",
  },
  {
    name: "Releases",
    path: "/",
  },
  {
    name: "Favourite",
    path: "/favourite",
  },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 md:px-16 lg:px-36 lg:text-sm xl:text-base">
      <Link to="/">
        <img
          src="../media/navLogo.svg"
          alt="Logo"
          className="w-12 md:w-16 xl:w-20"
        />
      </Link>

      <div className="hidden font-medium text-neutral-700 lg:flex lg:justify-center lg:gap-6 xl:gap-10">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => {
              if (isActive) {
                return `rounded-full bg-blue-100 px-3 py-1.5 text-blue-800`;
              }
              return `rounded-full px-3 py-1.5 text-neutral-700 transition-colors duration-300 hover:bg-neutral-200 hover:text-black`;
            }}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-8 font-medium">
        <Search
          size={20}
          className="hidden cursor-pointer hover:scale-110 lg:block"
        />
        <button className="group relative hidden overflow-hidden rounded-full border px-4 py-1.5 lg:block">
          <span className="absolute inset-0 -translate-x-full bg-neutral-900 transition-transform duration-300 ease-linear group-hover:translate-x-0" />
          <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white">
            Login
          </span>
        </button>
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
          <div className="flex w-full flex-col gap-4 px-6 pt-16 pb-6 text-center font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => {
                  if (isActive) {
                    return `mx-auto rounded-full bg-blue-100 px-6 py-1.5 text-blue-800 md:px-20`;
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
            <button
              className="group relative mx-auto overflow-hidden rounded-full border px-10 py-1.5 md:px-24"
              onClick={() => {
                (scrollTo(0, 0), setIsOpen(!isOpen));
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
