import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy loaded pages
const Home = lazy(() => import("./components/home/Home"));
const Movies = lazy(() => import("./components/movies/Movies"));
const Theatre = lazy(() => import("./components/theatre/Theatre"));
const ViewMovie = lazy(() => import("./components/movieComponents/ViewMovie"));
const BuyMovie = lazy(() => import("./components/movieComponents/BuyMovie"));
const SeatLayout = lazy(() => import("./components/seatLayout/SeatLayout"));
const MyBookings = lazy(() => import("./components/myBookings/MyBookings"));
const Activities = lazy(() => import("./components/Activities/Activities"));
const TicketRate = lazy(() => import("./components/more/TicketRate"));
const Gallery = lazy(() => import("./components/more/Gallery"));
const Error = lazy(() => import("./components/Error"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const Contact = lazy(() => import("./components/Contact"));
const TermsAndCondition = lazy(() => import("./components/TermsAndCondition"));
const VerifyPayment = lazy(
  () => import("./components/payment/VerifyPayment.jsx"),
);

// Admin lazy
const Nav = lazy(() => import("./admin/Nav"));
const Sidebar = lazy(() => import("./admin/Sidebar"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const AddShow = lazy(() => import("./admin/AddShow"));
const ListShows = lazy(() => import("./admin/ListShows"));
const ListBookings = lazy(() => import("./admin/ListBookings"));

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const AdminLayout = () => (
  <>
    <Nav />
    <Sidebar />
    <Outlet />
  </>
);

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/movies",
          children: [
            { path: "", element: <Movies /> },
            { path: "details/:id", element: <ViewMovie /> },
          ],
        },
        {
          path: "/theatre",
          children: [
            { path: "", element: <Theatre /> },
            { path: "buy/:id", element: <BuyMovie /> },
          ],
        },
        { path: "/myBookings", element: <MyBookings /> },
        { path: "/activities", element: <Activities /> },
        { path: "/ticketRate", element: <TicketRate /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/contact", element: <Contact /> },
        { path: "/privacyPolicy", element: <PrivacyPolicy /> },
        { path: "/termsAndCondition", element: <TermsAndCondition /> },
      ],
    },
    { path: "/seatLayout/:movie_id/:date/:time", element: <SeatLayout /> },
    { path: "/payment/verifyPayment", element: <VerifyPayment /> },
    { path: "*", element: <Error /> },

    {
      element: (
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      ),
      children: [
        { path: "/admin/dashboard", element: <Dashboard /> },
        { path: "/admin/addShows", element: <AddShow /> },
        { path: "/admin/listShows", element: <ListShows /> },
        { path: "/admin/listBookings", element: <ListBookings /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
