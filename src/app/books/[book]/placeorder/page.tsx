"use client";
import { selector, selectorStatus } from "@/slices/userSlice";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import Loader from "@/component/Loader";
// Response form placing order API
type PlaceResponse =
  | { created: boolean; orderId: string }
  | "error"
  | undefined;

const PlaceOrder = () => {
  const [name, setName] = useState("");
  const [response, setResponse] = useState<PlaceResponse>();
  const [checkOrderStatus, setCheckOrderStatus] = useState(false);
  const user = useSelector(selector);
  const status = useSelector(selectorStatus);
  const disabled = name.trim().length === 0;
  const baseUrl = process.env.BASE_URL;

  //* Get Book ID from URL *//
  //************************//
  const id = usePathname().substring(
    usePathname().indexOf("/books/") + "/books/".length,
    usePathname().indexOf("/placeorder")
  );

  console.log("name", name);

  const placeOrder = (e?: any) => {
    e.preventDefault();

    fetch(`${baseUrl}/api/placeOrder`, {
      method: "POST",
      headers: { Authorization: user, "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: id,
        customerName: name,
      }),
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => setResponse(data))
      .catch(() => setResponse("error"));
  };
  console.log("response order", response);


  return (
    <div className="h-screen flex   justify-center items-center">
      <div className="bg-white rounded-md justify-center  flex flex-col w-80 h-96 p-10">
        {!checkOrderStatus ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-green-700 border-l-4 outline-none   p-2"
              type="text"
              placeholder="Enter your name"
            />
            <button
              disabled={disabled}
              onClick={(e) => {
                placeOrder(e);
                setCheckOrderStatus(true);
              }}
              className="mt-7 disabled:text-[#666666] justify-between disabled:bg-[#cccccc]  gap-2 hover:bg-green-700 font-semibold  flex items-end bg-green-500 text-center  text-white py-2 px-2  rounded-md "
            >
              <p>Place Order</p>
              <BsArrowRightShort fontWeight="extrabold" size={22} />
            </button>

            
          </>
        ) : status !== 200 || response === "error" ? (
          <div className="bg-white flex gap-2 flex-col  px-5 rounded-lg text-red-700 font-semibold">
            <h3 className="text-lg">Not Login. Try again after LogIn</h3>
            <Link
              href={`/signin`}
              className="hover:bg-green-700 w-[50%] gap-2 justify-between  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
            >
              <p>Login</p>
              <BsArrowRightShort fontWeight="extrabold" size={22} />
            </Link>
          </div>
        ) : (
          status === 200 &&
          response !== undefined && (
            <div className="flex flex-col gap-1 justify-center ">
              <p className="text-green-500 text-lg font-extrabold ">
                Order Placed Successfully
              </p>
              <p className="font-extrabold">Order ID:</p>
              <p>{response.orderId}</p>
              <Link
                href={`/orders/${response.orderId}`}
                className="hover:bg-green-700 mt-4 w-auto gap-2 justify-between  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
              >
                <p>Explore Order</p>
                <BsArrowRightShort fontWeight="extrabold" size={22} />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default PlaceOrder;

// token 99471e012d04b286a84d3e6d075ddb1e041233e2b9b79768e666c00f5077768d