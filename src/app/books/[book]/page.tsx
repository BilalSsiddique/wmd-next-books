import React from "react";

import Link from "next/link";
import {
  BsArrowRightShort,
  BsBookHalf,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgUnavailable } from "react-icons/cg";


const fetchData = async (prop?: any): Promise<any[] | "error"> => {
  const url = `https://simple-books-api.glitch.me/books/${prop}`;
  const url2 = `https://simple-books-api.glitch.me/books`;
  const checkProp = prop ? url : url2;
  const response = await fetch(checkProp);
  // console.log('response',response)
  try {
    if (!response.ok) {
      throw new Error("Response not Ok");
    }
    return response.json();
  } catch (error) {
    return error as "error";
  }
};

export async function generateStaticParams(): Promise<any[] | any[]> {
  const res: any = await fetchData();
  // console.log("res:", res);
  console.log(res.map((books:any) => ({
    book:books.id
  })))
  return  res.map((books:any) => ({
    book:books.id
  }));
  
}

const SingleBook = async ({ params }: { params: { book: number } }) => {
  console.log("params,:", params);
  const data: any = await fetchData(params.book);
  //   let data = {
  //   id: 1,
  //   name: 'The Russian',
  //   author: 'James Patterson and James O. Born',
  //   isbn: '1780899475',
  //   type: 'fiction',
  //   price: 12.98,
  //   'current-stock': 12,
  //   available: false,
  //   error: false
  // }
  // console.log("data", data);

  return (
    <div className=" pt-28 px-10 gap-5 flex items-center flex-wrap justify-center ">
      {data?.error ? (
        <ShowError />
      ) : (
        <div className="relative flex bg-white shadow-2xl rounded-md flex-col  w-auto px-5 sm:px-20 py-8  justify-start sm:justify-center items-center h-auto ">
          <Link href="/books" className={`absolute top-3 right-6  sm:left-3`}>
            <BsFillArrowLeftCircleFill size={22} />
          </Link>
          <div className="flex flex-col mb-6 gap-2">
            <div className="flex justify-start sm:justify-center items-center gap-3 mb-3  text-center">
              <BsBookHalf size={25} color="green" />
              <p className=" font-extrabold text-xl">{data.name}</p>
            </div>

            <div className="font-bold flex flex-col sm:flex-row justify-start gap-4 sm:justify-between w-full">
              {" "}
              <p>
                <span className="text-green-500 ">Type:</span> {data.type}{" "}
              </p>
              <p>
                <span className="text-green-500">Price:</span> ${data.price}{" "}
              </p>
            </div>

            <p className=" font-bold text-start text-sm">
              {" "}
              <span className="text-green-500">Author: </span>
              {data.author}
            </p>
            <div className="font-bold flex flex-col sm:flex-row justify-start sm:justify-between w-full">
              {" "}
              <p>
                <span className="text-green-500">ISBN:</span> {data.isbn}{" "}
              </p>
              <p>
                <span className="text-green-500">Stock:</span>{" "}
                {data["current-stock"]}{" "}
              </p>
            </div>
          </div>

          <div className="flex gap-7 justify-between  w-full">
            <button className="order-2 rounded-full shadow-lg flex  font-bold   hover:bg-green-700  ">
              {data.available ? (
                <IoCheckmarkDoneCircle size={32} />
              ) : (
                <CgUnavailable color="red" size={32} />
              )}
            </button>
            <div className="flex justify-end h-full flex-col">
              {data.available ? (
                <Link
                  href={`/books/${data.id}/placeorder`}
                  className="hover:font-semibold w-auto gap-2 hover:bg-green-700  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
                >
                  <p>Place Order</p>
                  <BsArrowRightShort fontWeight="extrabold" size={22} />
                </Link>
              ) : (
                <button
                  disabled={true}
                  className="disabled:bg-slate-400 w-auto text-center  text-white py-1 px-2  rounded-md"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShowError = () => {
  return (
    <div className="h-[500px] rounded-lg w-[300px] flex justify-center items-center bg-black">
      <div className="bg-white px-5 rounded-lg text-red-700 font-semibold">
        <h3 className="text-lg">Error : Data not found</h3>
      </div>
    </div>
  );
};

export default SingleBook;
