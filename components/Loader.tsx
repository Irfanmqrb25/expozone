"use client";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flcol justify-center items-center">
      <RingLoader size={100} color="black" />
    </div>
  );
};

export default Loader;
