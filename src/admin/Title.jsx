import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <h2 className="text-xl font-semibold text-neutral-800 xl:text-2xl">
      {text1} <span className="text-red-600 underline">{text2}</span>
    </h2>
  );
};

export default Title;
