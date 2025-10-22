import React from "react";
import Carousel from "./Carousel";
import { ContextProvider } from "./HomeContext";

const Home = () => {
  return (
    <>
      <ContextProvider>
        <Carousel />
      </ContextProvider>
    </>
  );
};

export default Home;
