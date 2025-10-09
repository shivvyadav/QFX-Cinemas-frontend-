import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./Routes.jsx";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: "white",
            color: "green",
          },
        },
        error: {
          style: {
            background: "white",
            color: "red",
          },
        },
      }}
    />
    <Routes />
  </ClerkProvider>,
);
