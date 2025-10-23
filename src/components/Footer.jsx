import React from "react";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const footerItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Contact us",
    path: "/contact",
  },
  {
    name: "Terms & Condition",
    path: "/termsAndCondition",
  },
  {
    name: "Privacy Policy",
    path: "/privacyPolicy",
  },
];
const Footer = () => {
  return (
    <div className="bg-[url(../../footer.png)] bg-cover bg-no-repeat py-6 md:pt-6">
      <div className="flex flex-col justify-between gap-4 space-y-3 px-6 text-black md:flex-row md:px-16 lg:px-24 xl:px-36">
        <div className="space-y-3 md:space-y-6">
          <h3 className="text-base font-semibold">For Bookings</h3>
          <p className="flex items-center gap-2 text-sm">
            <FaPhone className="size-5 text-red-600" />
            +977 9826367059
          </p>
        </div>
        <div className="space-y-3 md:space-y-6">
          <h3 className="text-base font-semibold">Quick Links</h3>
          <ul className="space-y-4 font-medium text-neutral-700">
            {footerItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => scrollTo(0, 0)}
                  className="text-sm hover:text-red-500 xl:text-base"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col space-y-4 md:items-center">
          <h3 className="text-base font-semibold">Payment Partners</h3>
          <Link to="https://khalti.com/" target="_blank">
            <img src="../../khalti.png" alt="khalti" className="w-18 xl:w-22" />
          </Link>
        </div>
        <div className="space-y-3 md:space-y-6">
          <h3 className="text-base font-semibold">Connect with us</h3>
          <div>
            <div className="flex gap-4 md:justify-center">
              <FaFacebook className="cursor-pointer text-2xl hover:text-blue-500" />
              <FaInstagram className="cursor-pointer text-2xl hover:text-pink-500" />
              <FaTiktok className="cursor-pointer text-2xl text-neutral-700 hover:text-black" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 max-w-[82%] md:mx-auto">
        <hr className="my-2 border-neutral-300" />
        <p className="text-sm leading-7 text-neutral-600">
          Copyright &copy; {new Date().getFullYear()} QFX Cinemas. All Right
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
