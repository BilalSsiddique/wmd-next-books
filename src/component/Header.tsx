"use client";
import React, { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser, selectorStatus, setLoginStatus } from "@/slices/userSlice";
import { useRouter } from "next/navigation";
import {FaBookReader} from 'react-icons/fa'
// import Cart from "./Cart";

const Header = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectorStatus);
  const router = useRouter();


  return (
    <>
      <header className="bg-green-500 justify-between flex items-center w-full px-10 h-[60px]">
        <div className="flex gap-2">
          <Link href={"/"}>
            <FaBookReader size={25} color="black" />
          </Link>
          <Link href='/'>
            <p className="text-white  font-extrabold text-lg">Book Store</p>
          </Link>
        </div>
        <ul className="flex gap-6">
        
          {status === 200 && (
            <li>
              <Link href="/orders">
                <button className="rounded-sm font-bold  text-black px-2 py-1  bg-white">
                  Orders{" "}
                </button>
              </Link>
            </li>
          )}
          <li>
            {status !== 200 && (
              <Link className="mr-3" href="/signup">
                <button className="rounded-sm font-bold  text-black px-2 py-1  bg-white">
                  Sign Up{" "}
                </button>
              </Link>
            )}
            {status !== 200 ? (
              <Link href="/signin">
                <button className="rounded-sm font-bold  text-black px-2 py-1  bg-white">
                  Login{" "}
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  dispatch(setUser(""));
                  dispatch(setLoginStatus(404));
                  router.push("/signin");
                }}
                className="rounded-sm font-bold  text-black px-2 py-1  bg-white"
              >
                Logout{" "}
              </button>
            )}
          </li>
        </ul>
      </header>
      {/* CART */}
      {/* {toggle && <Cart />} */}
    </>
  );
};

export default Header;
