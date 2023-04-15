import React from "react";
// const inter = Inter({ subsets: ["latin"] });


import Link from "next/link";
import { BsArrowRightShort, BsBookHalf } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgUnavailable } from "react-icons/cg";
import { BookCover } from "@/component/BookCover";

interface Books {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

const ShowError = () => {
  return (
    <div className="h-[500px] rounded-lg w-[300px] flex justify-center items-center bg-black">
      <div className="bg-white px-5 rounded-lg text-red-700 font-semibold">
        <h3 className="text-lg">Error : Data not found</h3>
      </div>
    </div>
  );
};

const fetchdata = async (): Promise<Books[] | "error"> => {
  const url = "https://simple-books-api.glitch.me/books";
  const response = await fetch(url);
  try {
    if (!response.ok) {
      throw new Error("Response not Ok");
    }
    return response.json();
  } catch (error) {
    return error as "error";
  }
};

export default async function Home() {
  const data = await fetchdata();

  return (
    <div className="bg-black p-8 sm:p-16 gap-5 flex items-center flex-wrap justify-center ">
      {data === "error" ? (
        <ShowError />
      ) : (
        data.map((book: any, idx: number) => (
          <div
            className="flex flex-col  sm:flex-row bg-white shadow-2xl rounded-md relative w-[600px] text-center  items-center justify-between  sm:h-[400px] "
            key={idx}
          >
            <div className="gap-2 w-[50%] h-full flex order-2 justify-center   flex-col ">
              <div className="flex gap-2 pt-3 sm:pt-16 justify-center items-center">
                <p className=" sm:block hidden">
                  <BsBookHalf size={25} color="green" />
                </p>
                <p className=" font-extrabold text-[19px] sm:text-[26px]">
                  {book.name}
                </p>
              </div>
              <p className="font-semibold text-[18px] sm:text-2xl">{book.type}</p>
              <button className=" rounded-full  flex justify-center  font-bold   ">
                {book.available ? (
                  <IoCheckmarkDoneCircle size={38} />
                ) : (
                  <CgUnavailable color="red" size={32} />
                )}
              </button>
              <div className="justify-end flex  items-center pt-3 pb-5 h-full flex-col">
                <Link
                  href={`/books/${book.id}`}
                  className="font-semibold hover:bg-green-700 justify-between w-auto gap-2   flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                >
                  <p>Details</p>
                  <BsArrowRightShort fontWeight="extrabold" size={22} />
                </Link>
              </div>
            </div>

            <div className="flex  justify-center rounded-md p-3 sm:p-0 sm:w-[250px]   sm:h-full">
              {/* <button className="order-2 rounded-full shadow-lg flex items-center justify-center font-bold  w-[40px] h-[40px] text-white hover:bg-green-800  bg-green-700">
                <AiOutlinePlus size={22} />
              </button> */}
              <BookCover bookId={book.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
