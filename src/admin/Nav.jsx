import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="fixed z-40 w-screen border-b border-neutral-300 bg-neutral-50 px-6 py-4 lg:px-8 lg:text-sm xl:px-12">
      <Link to="/" onClick={() => scrollTo(0, 0)}>
        <img src="../../navLogo.svg" alt="Logo" className="w-18 md:w-20" />
      </Link>
    </div>
  );
};

export default Nav;
