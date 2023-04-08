import { Fira_Sans } from "next/font/google";
import React from "react";
// const inter = Inter({ subsets: ["latin"] });
import { GiWhiteBook } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { error } from "console";


interface Books {
  id: number;
  name: string;
  type: string;
  available: boolean;
}


const ShowError = ()=>{
  return (
    <div className="h-[500px] rounded-lg w-[300px] flex justify-center items-center bg-black">
        <div className="bg-white px-5 rounded-lg text-red-700 font-semibold">
          <h3 className="text-lg">Error : Data not found</h3>
        </div>
    </div>
  )
}


const fetchdata = async (): Promise<Books[] | 'error'>  => {
  const url = "https://simple-books-api.glitch.me/books";
  const response = await fetch(url);
  try {
    if (!response.ok) {
      throw new Error("Response not Ok");
    }
    return response.json()
  } catch (error) {
    return error as 'error';
  }
};

export default async function Home() {
  const data = await fetchdata();
  
  return (
    <div className=" bg-green-200 h-screen p-16 gap-5 flex items-center flex-wrap justify-center ">
      { data === 'error' ? <ShowError/> : data.map((book: any, idx: number) => (
        <div
          className="flex bg-white shadow-2xl rounded-md flex-col  w-[350px] text-center justify-center items-center h-[200px] "
          key={idx}
        >
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex gap-2">
              <GiWhiteBook size={25} color="green" />
              <p className=" font-extrabold text-lg">{book.name}</p>
            </div>
            <p className="font-semibold">{book.type}</p>
            <p
              className={`${
                book.available ? "  bg-green-500" : "bg-red-600"
              } shadow-lg rounded-sm font-semibold w-auto px-3 mx-auto text-white`}
            >
              {book.available ? "Available" : "Sold Out"}
            </p>
          </div>
          <div className="flex px-8 justify-end  w-full">
            <button className="rounded-full shadow-lg flex items-center justify-center font-bold  w-[40px] h-[40px] text-white hover:bg-green-800  bg-green-700">
              <AiOutlinePlus size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
