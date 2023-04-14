import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className= " absolute bottom-0 z-50 text-[17px] font-semibold flex justify-center items-center  w-full bg-green-500 h-[100px]">
      <FaRegCopyright />
      <p>Simple Book Store</p>
    </div>
  );
};

export default Footer;
