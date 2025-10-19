import React from "react";
import { motion } from "framer-motion";
import OnlyInTheatre from "./OnlyInTheatre";
const Theatre = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      }}
      className="min-h-screen px-4 py-20 md:px-16 lg:px-32 xl:px-58"
    >
      <h2 className="px-2 py-6 font-heading text-lg font-semibold text-neutral-800 lg:text-2xl xl:py-8">
        Now Showing
      </h2>
      <OnlyInTheatre />
    </motion.div>
  );
};

export default Theatre;
