"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selector, selectorStatus } from "@/slices/userSlice";
import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Loader from "@/component/Loader";
import { BookCover } from "@/component/BookCover";
// Type of single order
interface Order {
  id: string;
  bookId: number;
  customerName: string;
  createdBy: string;
  quantity: number;
  timestamp: number;
}
// Type of orders request response
type OrdersResponse = Order[] | "error" | undefined;

// Get base URL to be used in Fetch request
const baseUrl = process.env.BASE_URL;

const AllOrders = () => {
  const user = useSelector(selector);
  const status = useSelector(selectorStatus);
  const [orderResponse, setOrderResponse] = useState<OrdersResponse>();
  const [deleteResponse, setDeleteResponse] = useState<
    "deleted" | "error" | undefined
  >();

  function getOrders() {
    fetch(`${baseUrl}/api/ordersList`, {
      method: "GET",
      headers: { Authorization: "Bearer " + user },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setOrderResponse(data))
      .catch(() => setOrderResponse("error"));
  }

  function deleteOrder(id: string) {
    fetch(`${baseUrl}/api/deleteOrder`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + user, ID: id },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => setDeleteResponse(data))
      .catch(() => setDeleteResponse("error"))
      .finally(() => getOrders());
  }

  

  function deleteButtonHandler(id: string) {
    setOrderResponse(undefined);
    deleteOrder(id);
  }

  useEffect(() => {
    getOrders();
  }, []);

  console.log("responseOrders:,", orderResponse);

  if (status !== 200) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="h-96 w-auto  bg-white flex justify-center i gap-2 flex-col  px-5 rounded-lg text-red-700 font-semibold">
          <h3 className="text-lg">Not Login. Try again after LogIn</h3>
          <Link
            href={`/signin`}
            className="hover:bg-green-700 w-[50%] gap-2 justify-between  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
          >
            <p>Login</p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </Link>
        </div>
      </div>
    );
  }

  if (orderResponse === "error") {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="h-96 justify-center bg-white flex gap-2 flex-col  px-5 rounded-lg text-red-700 font-semibold">
          <h3 className="text-lg">API Error. Try Again Later</h3>
          <Link
            href={`/books`}
            className="hover:bg-green-700 w-[50%] gap-2 justify-between  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
          >
            <p>Back</p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </Link>
        </div>
      </div>
    );
  }

  if (Array.isArray(orderResponse) && orderResponse?.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="h-96 items-start justify-center bg-white flex gap-2 flex-col  px-5 rounded-lg text-green-700 font-semibold">
          <h3 className="text-lg">Currently No orders Placed</h3>
          <Link
            href={`/books`}
            className="hover:bg-green-700 w-auto gap-2 justify-between  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
          >
            <p>Home </p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </Link>
        </div>
      </div>
    );
  }

  
  if ( !orderResponse){
    if (!deleteResponse) {
      return <Loader />;
    }
    return (
      <Loader/>
    )
  }

  return (
    <div className="pb-16 sm:pt-20 px-10 flex w-full items-center justify-center">
      <div className=" justify-center flex flex-col space-y-10  w-[700px]  relative">
        <p className="text-4xl text-white text-center font-extrabold">All Orders</p>
        {Array.isArray(orderResponse) &&
          orderResponse.map((order: Order) => (
            <div
              key={order.id}
              className="bg-white flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center p-5 border border-gray-500 shadow-sm shadow-gray-700 rounded-xl"
            >
              <div className="sm:w-[150px]">
                <BookCover bookId={order.bookId} />
              </div>
              <div className="flex flex-col gap-4 items-center sm:items-start">
                <p>
                  <span className=" font-bold">Book Id:</span> {order.bookId}{" "}
                </p>
                <p>
                  <span className=" font-bold">Order By:</span>{" "}
                  {order.customerName}{" "}
                </p>

                <p>
                  <span className=" font-bold">Quantity:</span> {order.quantity}{" "}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href={`/orders/${order.id}`}
                  className="hover:font-semibold w-auto gap-2 hover:bg-green-700  flex items-end bg-green-500 text-center  text-white py-1 px-1 sm:px-2  rounded-md "
                >
                  <p>Details</p>
                  <BsArrowRightShort fontWeight="extrabold" size={22} />
                </Link>
                <button
                  onClick={() => deleteButtonHandler(order.id)}
                  className="hover:font-semibold w-auto gap-2 hover:bg-red-700  flex items-end bg-red-500 text-center  text-white py-1 px-2  rounded-md "
                >
                  <p>Delete Order</p>
                  <BsArrowRightShort fontWeight="extrabold" size={22} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AllOrders;
