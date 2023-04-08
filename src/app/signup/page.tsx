"use client";
import { useState } from "react";
import Form from "@/component/Form";
import Link from "next/link";

// Interface
interface SignUpDetails {
  accessToken: string;
}
type SignUpResponseInterface =
  | SignUpDetails
  | "No data provided"
  | "Response error"
  | undefined;

// Main component

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signUpResponse, setSignUpResponse] =
    useState<SignUpResponseInterface>();
  // {
  //   accessToken:
  //     "eb87d6697721e96f893d172cc14cb4483b3a677eec7d3abbb99a0ef0d670c479",
  // } // Signup request response undefined by default, error or actual response
  const [formActive, setFormActive] = useState(true);

  // SignuP form Inputs handlers
  const handleName = (event: any) => {
    setName(event.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const createUser = async (e: any) => {
    e.preventDefault();
    // console.log(data.clientName);
    // console.log(data);
    const baseUrl = process.env.BASE_URL;
    console.log(baseUrl);
    fetch(`${baseUrl}/api/signUpUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientName: name,
        clientEmail: email,
      }),
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setSignUpResponse(data))
      .catch((error) => setSignUpResponse(error));
    setName("");
    setEmail("");
    setFormActive(false)
    setSignUpResponse(undefined)
  };

  console.log("response", signUpResponse);

  const disabled = name.trim().length === 0 || email.trim().length === 0;

  return (
    <>
      <div className="w-auto h-screen bg-slate-800 ">
        {formActive && (
          <Form
            name={name}
            email={email}
            handleName={handleName}
            handleEmail={handleEmail}
            createUser={createUser}
            disabled={disabled}
          />
        )}
        {signUpResponse === "No data provided" ||
        signUpResponse === "Response error" ||
        signUpResponse === undefined ? (
          <ShowError setFormActive={setFormActive} response={signUpResponse} />
        ) : (
          <ShowSuccess
            setFormActive={setFormActive}
            response={signUpResponse}
          />
        )}
      </div>
    </>
  );
}

const ShowSuccess = ({ response, setFormActive }: any) => {
  return (
    <div className="flex  h-screen  justify-center items-center">
      <div className="text-lg gap-3 flex-col bg-white  flex h-96 w-[500px] rounded-md items-center justify-center">
        <div className="w-auto text-center py-2 px-3  h-[50%]">
          <p className=" gap-1 font-semibold flex-col flex justify-center items-center ">
            <p>Your Token ID: </p>
            <p className=" text-[12px]">
              <br /> {response.accessToken}
            </p>
            <p className="mt-4">
              This will be your Login ID so kindly save it.
            </p>
          </p>
        </div>

        <button onClick={()=>setFormActive(true)} className="bg-green-500 py-1 text-white rounded-lg w-[50%]">
          Back
        </button>
      </div>
    </div>
  );
};

const ShowError = ({ response, setFormActive }: any) => {
  if (response === "Response error") {
    response = "Name or Email Already Exists";
  }

  return (
    <div className="flex flex-col h-screen  justify-center items-center">
      <div className="text-lg gap-3 flex-col bg-white  flex h-96 w-[500px] rounded-md items-center justify-center">
        <div>
          <h2 className="text-red-500 font-semibold">{response}</h2>
        </div>
        <button
          className="bg-green-500 py-1 text-white rounded-lg w-[50%]"
          onClick={() => setFormActive(true)}
        >
          Back
        </button>
      </div>
    </div>
  );
};
