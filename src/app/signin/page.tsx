"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import {
  selector,
  setUser,
  setLoginStatus,
  selectorStatus,
} from "@/slices/userSlice";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const Form = () => {
  const user = useSelector(selector);
  const status = useSelector(selectorStatus);
  const [loginId, setLoginId] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch CAll to Handler
  const baseUrl = process.env.BASE_URL;
  const url = `${baseUrl}/api/orderHandlerandVerify`;
  const fetcher = (url: string) =>
    fetch(url, { headers: { Authorization: "Bearer " + user } }).then((res) =>
      res.json()
    );
  const { data, isLoading, error } = useSWR(
    user.trim().length !== 0 ? url : null,
    fetcher
  );

  useEffect(() => {
    if (data && !error) {
      dispatch(setLoginStatus(+data));
    }
  }, [data, error, dispatch, loginId]);

  const disabled = loginId.trim().length === 0;

  const loginUser = (e?: any) => {
    e.preventDefault();
    dispatch(setUser(loginId));
    setLoginId("");
  };

  // doesn't work when condition added
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  // console.log("data", data, "loginId:", loginId, "status:", status);
  return (
    <div className="w-auto h-screen bg-slate-800 ">
      <form
        action="
      "
      >
        <div className="flex justify-center items-center h-screen">
          <div className="flex rounded-lg flex-col sm:w-96 w-80 h-96 justify-center p-8 md:px-10 bg-white gap-3">
            {data === 200 &&
            data !== "error" &&
            !error &&
            data !== undefined ? (
              <div className="font-semibold  text-center">
                <p className="text-lg text-green-500 font-extrabold">
                  Successfully Login
                </p>
                <p>You are Login with the user ID:</p>
                <p>{user.slice(0, 20)}....</p>
                <div className="mt-5 flex gap-4 justify-center items-center mt-1">
                  <button
                    onClick={() => {
                      dispatch(setUser(""));
                      dispatch(setLoginStatus(404));
                      setLoginId("");
                      router.push("/signin");
                    }}
                    className="w-[40%] gap-2 hover:bg-green-700 hover:font-semibold  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                  >
                    <p>Logout</p>
                    <BsArrowRightShort fontWeight="extrabold" size={22} />
                  </button>

                  <Link
                    href="/books"
                    className="w-[40%] gap-2 hover:bg-green-700 hover:font-semibold  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                  >
                    <p>Home</p>
                    <BsArrowRightShort fontWeight="extrabold" size={22} />
                  </Link>
                </div>
              </div>
            ) : data === "error" || error ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-red-500">Error Couldn&apos;t verify you</p>

                <button
                  onClick={() => {
                    dispatch(setUser(" "));
                    setLoginId("");
                    router.push("/signin");
                  }}
                  className="w-auto bg-green-500   text-white p-1  rounded-md "
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
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
                  className="disabled:text-[#666666] justify-between  disabled:bg-[#cccccc]  gap-2 hover:bg-green-700 font-semibold  flex items-end bg-green-500 text-center  text-white py-2 px-2  rounded-md "
                >
                  <p>LogIn</p>
                  <BsArrowRightShort fontWeight="extrabold" size={22} />
                </button>

                <p>
                  New to Book Store {""}
                  <Link href="/signup">
                    <span className=" text-green-700 cursor-pointer font-semibold">
                      Sign Up?
                    </span>
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
