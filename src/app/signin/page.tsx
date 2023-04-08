"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
// import useSWR from 'next/SWR'

const Form = () => {
  const [loginId, setLoginId] = useState("");

  const disabled = loginId.trim().length === 0;

  const loginUser = (e:any) => {
    e.preventDefault()
    
  };
 

  return (
    <div className="w-auto h-screen bg-slate-800 ">
      <form
        action="
      "
      >
        <div className="flex justify-center items-center h-screen">
          <div className="flex rounded-lg flex-col sm:w-96 w-80 h-96 justify-center p-8 md:px-10 bg-white gap-3">
            <input
              value={loginId}
              name="loginId"
              onChange={(e) => setLoginId(e.target.value)}
              className="border border-green-700 border-l-4 outline-none   p-2"
              type="text"
              placeholder="Enter your ID"
            />

            <button
              disabled={disabled}
              onClick={loginUser}
              className=" disabled:text-[#666666]  disabled:bg-[#cccccc] bg-green-500 mt-10  text-white p-2  rounded-md "
            >
              Login
            </button>
            <p>
              New to Book Store {""}
              <Link href="/signup">
                <span className=" text-green-700 cursor-pointer font-semibold">
                  Sign Up?
                </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
