import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/home/Home";
import Movies from "./components/movies/Movies";
import Theatre from "./components/theatre/Theatre";
import ViewMovie from "./components/movieComponents/ViewMovie";
import BuyMovie from "./components/movieComponents/BuyMovie";
import SeatLayout from "./components/seatLayout/SeatLayout";
import MyBookings from "./components/myBookings/MyBookings";
import Activities from "./components/Activities/Activities";
import TicketRate from "./components/more/TicketRate";
import Gallery from "./components/more/Gallery";
import Error from "./components/Error";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Contact from "./components/Contact";
import TermsAndCondition from "./components/TermsAndCondition";

// admin imports
import Nav from "./admin/Nav";
import Sidebar from "./admin/Sidebar";
import Dashboard from "./admin/Dashboard";
import AddShow from "./admin/AddShow";
import ListShows from "./admin/ListShows";
import ListBookings from "./admin/ListBookings";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This is where routed pages will render */}
      <Footer />
    </>
  );
};
const AdminLayout = () => {
  return (
    <>
      <Nav />
      <Sidebar />
      <Outlet /> {/* This is where routed pages will render */}
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
              element: <ViewMovie />,
            },
            {
              path: "buy/:id",
              element: <BuyMovie />,
            },
          ],
        },
        {
          path: "/theatre",
          element: <Theatre />,
        },
        {
          path: "/myBookings",
          element: <MyBookings />,
        },
        {
          path: "/activities",
          element: <Activities />,
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
      ],
    },
    {
      path: "/movies/seatLayout/:id",
      element: <SeatLayout />,
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Dashboard />,
        },
        {
          path: "/admin/addShows",
          element: <AddShow />,
        },
        {
          path: "/admin/listShows",
          element: <ListShows />,
        },
        {
          path: "/admin/listBookings",
          element: <ListBookings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
