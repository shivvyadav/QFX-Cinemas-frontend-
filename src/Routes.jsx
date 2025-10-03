import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/home/Home";
import Movies from "./components/movies/Movies";
import MovieDetails from "./components/movieDetails/MovieDetails";
import SeatLayout from "./components/seatLayout/SeatLayout";
import MyBookings from "./components/myBookings/MyBookings";
import Favoutite from "./components/favourite/Favourite";

import TicketRate from "./components/more/TicketRate";
import Gallery from "./components/more/Gallery";

import Error from "./components/Error";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Contact from "./components/Contact";
import TermsAndCondition from "./components/TermsAndCondition";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This is where routed pages will render */}
      <Footer />
    </>
  );
};
const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          children: [
            {
              path: "",
              element: <Movies />,
            },
            {
              path: ":id",
              element: <MovieDetails />,
            },
            {
              path: ":id/seat",
              element: <SeatLayout />,
            },
          ],
        },
        {
          path: "/myBookings",
          element: <MyBookings />,
        },
        {
          path: "/favourite",
          element: <Favoutite />,
        },
        {
          path: "/ticketRate",
          element: <TicketRate />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/privacyPolicy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/termsAndCondition",
          element: <TermsAndCondition />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
