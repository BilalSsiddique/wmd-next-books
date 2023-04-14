"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selector } from "@/slices/userSlice";
import { BookCover } from "./BookCover";
import Loader from "./Loader";
import Link from "next/link";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

type Props = {
  orderId: string;
};

interface OrderDetails {
  bookId: number;
  createdBy: string;
  customerName: string;
  id: string;
  quantity: number;
  timestamp: number;
}
type OrderRes = OrderDetails | "error" | undefined;
const SingleOrder = ({ orderId }: Props) => {
  const baseUrl = process.env.BASE_URL;

  const user = useSelector(selector);

  const [orderRes, setOrderRes] = useState<OrderRes>(); // Response from getOrder API
  const [updatedRes, setUpdatedRes] = useState<any | undefined>(); // Update api response
  const [name, setName] = useState(""); // usename to be updated
  const [editOrderScreen, setEditOrderScreen] = useState(false);

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getOrder() {
    fetch(`${baseUrl}/api/singleOrder`, {
      method: "GET",
      headers: { Authorization: user, ID: orderId },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => setOrderRes(data))
      .catch(() => setOrderRes("error"));
  }

  function updateOrder() {
    fetch(`${baseUrl}/api/updateOrder`, {
      method: "PATCH",
      headers: {
        Authorization: user,
        ID: orderId,
        consumerName: name,
      },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => setUpdatedRes(data))
      .catch(() => setUpdatedRes("error"));
  }

  if (!orderRes) {
    return <Loader />;
  }
  console.log("orderRes", orderRes);

  if (orderRes === "error") {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="h-96 justify-center bg-white flex gap-2 flex-col  px-5 rounded-lg text-red-700 font-semibold">
          <h3 className="text-lg">
            Error. No such Order Found. <br /> Try Again Later
          </h3>
          <Link
            href={`/orders`}
            className="hover:bg-green-700 w-[50%] gap-2 justify-between  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
          >
            <p>Back</p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </Link>
        </div>
      </div>
    );
  }
  const checkName = name.trim().length === 0;

  console.log(checkName, "scscscsc", name);
  return (
    <div className="pb-16 sm:pt-20 px-10 flex w-full items-center justify-center">
      <div className=" justify-center flex flex-col space-y-10  w-[700px]  relative">
        <div
          key={orderRes.id}
          className="bg-white flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center p-5 border border-gray-500 shadow-sm shadow-gray-700 rounded-xl"
        >
          <div className="sm:w-[150px]">
            <BookCover bookId={orderRes.bookId} />
          </div>
          {editOrderScreen ? (
            <div className="justify-between flex-grow space-y-3   rounded-3xl py-5 px-5 xmd:basis-1/2 min-w-[275px]">
              <p className="font-bold">
                Book Id :{" "}
                <span className="font-semibold"> &emsp;{orderRes.bookId} </span>
              </p>
              <p className="font-bold">
                Order Id :{" "}
                <span className="text-xs font-semibold">
                  &emsp;{orderRes.id}
                </span>
              </p>

              {updatedRes !== "updated" ? (
                <div className="flex justify-center flex-col">
                  <input
                    placeholder="Enter Your Name"
                    className="w-[70%] flex rounded-lg border border-green-700 border-l-4 outline-none p-2 text-gray-700"
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <p className="text font-extrabold">
                  Order SuccessFully Updated
                </p>
              )}

              <div className="flex py-5">
                {updatedRes !== "updated" ? (
                  <button
                    disabled={checkName}
                    onClick={updateOrder}
                    className="disabled:text-[#666666]  disabled:bg-[#cccccc]  font-semibold hover:bg-green-700 justify-between w-[70%] gap-2   flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                  >
                    <p>Update Order</p>
                    <BsArrowRightShort fontWeight="extrabold" size={22} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      getOrder();
                      setEditOrderScreen(false);
                      setUpdatedRes(undefined);
                      setName("");
                    }}
                    className="  font-semibold hover:bg-green-700 justify-between w-[40%] gap-2   flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                  >
                    <p>Close</p>
                    <BsArrowRightShort fontWeight="extrabold" size={22} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Show orderDetails when edit screen is false
            <>
              <div className="flex flex-col text-lg gap-4 items-center sm:items-start">
                <p>
                  <span className=" font-bold">Book Id:</span> {orderRes.bookId}{" "}
                </p>
                <p>
                  <span className=" font-bold">Order By:</span>{" "}
                  {orderRes.customerName}{" "}
                </p>

                <p>
                  <span className=" font-bold">Quantity:</span>{" "}
                  {orderRes.quantity}{" "}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href="/orders"
                  className="w-auto gap-2 hover:bg-green-700 hover:font-semibold  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                >
                  <p>Back</p>
                  <BsArrowLeftShort fontWeight="extrabold" size={22} />
                </Link>
                <button
                  onClick={() => setEditOrderScreen(true)}
                  className="w-auto gap-2 hover:bg-green-700 hover:font-semibold  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                >
                  <p>Update Order</p>
                  <BsArrowRightShort fontWeight="extrabold" size={22} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
