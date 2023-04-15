import React from "react";
import Link from "next/link";
import {BsArrowRightShort} from 'react-icons/bs'

const Home = () => {
  return (
    <div className=" flex  justify-center items-center h-screen px-8 sm:px-14">
      <div className="flex flex-col sm:flex-row items-center justify-center  sm:h-[350px]">
        <div className="order-2 flex flex-col items-start  p-7 px-4  bg-neutral-300 h-full w-full sm:w-[50%]">
          <p className="text-xl pb-2 font-extrabold">Simple Book Store</p>
          <p className="text-sm text-left">
            Welcome to Simple Book store where you can view available books & also also order,update & delete available 
            books.
          </p>
          <Link
            href="/books"
            className="w-auto gap-2 flex items-end bg-[#1E293B] text-center mt-3 sm:mt-4  text-white py-1 px-2  rounded-md "
          >
            <p>Books</p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </Link>
        </div>
        <div  className="bg-black bg-cover bg-center bg-[url('/cover2.jpg')] w-full h-[250px] sm:h-full   sm:w-[50%]">
          {/* <img src="" alt="" /> */}
          
        </div>
      </div>
    </div>
  );
};

export default Home;
