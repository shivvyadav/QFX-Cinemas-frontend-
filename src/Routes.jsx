import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

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
import VerifyPayment from "./components/payment/VerifyPayment.jsx";

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
      <AppProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AppProvider>
    </>
  );
};
const AdminLayout = () => {
  return (
    <>
      <Nav />
      <Sidebar />
      <Outlet />
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
              path: "details/:id",
              element: <ViewMovie />,
            },
          ],
        },
        {
          path: "/theatre",
          children: [
            {
              path: "",
              element: <Theatre />,
            },
            {
              path: "buy/:id",
              element: <BuyMovie />,
            },
          ],
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
      path: "/seatLayout/:movie_id/:date/:time",
      element: <SeatLayout />,
    },
    {
      path: "/payment/verifyPayment",
      element: <VerifyPayment />,
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      element: (
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      ),
      children: [
        {
          path: "/admin/dashboard",
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
