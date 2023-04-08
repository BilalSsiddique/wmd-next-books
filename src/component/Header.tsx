"use client";
import React, { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const Cart = () => {
  return (
    <div className="h-[100%]  absolute right-0 z-40 w-[300px] bg-green-300 flex p-10 justify-center">
      <div className="text-[30px] font-extrabold text-white">
        <p>Books</p>
      </div>
    </div>
  );
};
const Header = () => {
  const [toggle, setToggle] = useState(false);

  console.log("toogle", toggle);

  return (
    <>
      <header className="bg-green-500 justify-between flex items-center w-full px-10 h-[60px]">
        <div className="flex gap-2">
          <Link href={"/"}>
            <GiWhiteBook size={25} color="black" />
          </Link>
          <p className="text-white font-extrabold text-lg">Book Store</p>
          {toggle}
        </div>
        <ul className="flex gap-6">
          <li
            onClick={() => setToggle(!toggle)}
            className="cursor-pointer self-end before:absolute before:bg-red-500 before:font-extrabold before:text-[12px] before:text-white before:text-center before:flex before:items-center before:justify-center before:content-['1'] before:ml-4 before:mt-[-3px] before:rounded-full before:w-[14px] before:h-[15px]"
          >
            <FaShoppingCart size={25} />
          </li>
          <li>
            <Link href="/signup">
              <button className="rounded-sm font-bold  text-black px-4 py-1  bg-white">
                Sign Up{" "}
              </button>
            </Link>
          </li>
        </ul>
      </header>
      {/* CART */}
      {toggle && <Cart />}
    </>
  );
};

export default Header;
