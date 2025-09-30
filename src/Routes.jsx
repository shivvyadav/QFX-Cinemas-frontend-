import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/home/Home";
import Movies from "./components/movies/Movies";
import MovieDetails from "./components/movieDetails/MovieDetails";
import SeatLayour from "./components/seatLayout/SeatLayout";
import MyBookings from "./components/myBookings/MyBookings";
import Favoutite from "./components/favourite/Favourite";
import Error from "./components/Error";

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
              element: <SeatLayour />,
            },
          ],
        },
        {
          path: "/mybookings",
          element: <MyBookings />,
        },
        {
          path: "/favourite",
          element: <Favoutite />,
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
