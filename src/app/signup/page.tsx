"use client";
import { useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleName = (event: any) => {
    setName(event.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const data = {
    clientName: name,
    clientEmail: email,
  };

  const createUser = async (e: any) => {
    e.preventDefault();
    console.log(data.clientName);
    console.log(data);

    const url = "/api/handleuser";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: JSON.stringify(data),
    });

    const data1 = res;
    console.log("data>", data1);
  };

  return (
    <div className="w-full h-screen bg-slate-800 ">
      <form
        action="
      "
        onSubmit={createUser}
      >
        <div className="flex justify-center items-center h-screen">
          <div className="flex rounded-sm flex-col sm:w-96 w-80 h-96 justify-center p-8 md:px-10 bg-white gap-3">
            <input
              value={name}
              name="name"
              onChange={handleName}
              className="border p-2"
              type="text"
              placeholder="Enter your Name"
            />
            <input
              value={email}
              name="email"
              onChange={handleEmail}
              className="border p-2"
              type="email"
              placeholder="Enter your Email"
            />

            <button className="bg-green-500 mt-10  text-white p-2  rounded-md ">
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return <></>;
}
