import React from "react";
import Carousel from "./Carousel";
import { ContextProvider } from "./HomeContext";

import ApiData from "../../assets/ApiData";

const Home = () => {
  return (
    <ContextProvider>
      <Carousel />
      <ApiData />
    </ContextProvider>
  );
};

export default Home;
