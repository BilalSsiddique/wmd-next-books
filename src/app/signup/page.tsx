"use client";
import { useState } from "react";
import Form from "@/component/Form";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

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
  const [isTouched, setIsTouched] = useState(false);
  const [signUpResponse, setSignUpResponse] =
    useState<SignUpResponseInterface>();
  const [formActive, setFormActive] = useState(true);

  // SignuP form Inputs handlers
  const handleName = (event: any) => {
    setName(event.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    setIsTouched(true)
  };

  const handleBlur = (e: any) => {
    setIsTouched(true);
    setEmail(e.target.value);
  };

  // Trigger on button use for
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
    setFormActive(false);
    setSignUpResponse(undefined);
  };

  // console.log("response", signUpResponse);
  // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validateEmail = (email: String): boolean => {
    if (email && email.trim().length !== 0) {
      if (
        email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const disabledAndValidate = name.trim().length === 0 || !validateEmail(email);
  const outOfFocus = isTouched === true && !validateEmail(email);

  return (
    <>
      <div className="w-auto h-screen bg-slate-800 ">
        {formActive && (
          <Form
            name={name}
            email={email}
            handleName={handleName}
            handleEmail={handleEmail}
            handleBlur={handleBlur}
            createUser={createUser}
            disabled={disabledAndValidate}
            outOfFocus={outOfFocus}
          />
        )}
        {signUpResponse === "No data provided" ||
        signUpResponse === "Response error" ||
        signUpResponse === undefined ? (
          <ShowError
            setFormActive={setFormActive}
            response={signUpResponse}
            setSignUpResponse={setSignUpResponse}
          />
        ) : (
          <ShowSuccess
            response={signUpResponse}
            setSignUpResponse={setSignUpResponse}
          />
        )}
      </div>
    </>
  );
}

const ShowSuccess = ({ response, setSignUpResponse }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("response", response);
  // if (response?.accesstoken===undefined) return null
  return (
    <div className="flex  h-screen  justify-center items-center">
      <div className="text-lg gap-3 flex-col bg-white  flex h-96 w-[300px] rounded-md items-center justify-center">
        <div className="w-auto text-center py-2 px-3  h-[50%]">
          <p className=" gap-1 font-semibold flex-col flex justify-center items-center ">
            {response?.accessToken !== undefined ? (
              <>
                <p>Your Token ID: </p>
                <p className=" text-[8px]">
                  <br /> {response.accessToken}
                </p>
                <p className="mt-4 text-[14px]">
                  This will be your Login ID so kindly save it.
                </p>
              </>
            ) : (
              <p className="text-red-600 text-center">
                Internal Server Error <br /> Check your Network
              </p>
            )}
          </p>
        </div>

        {response?.accessToken !== undefined ? (
          <button
            onClick={() => {
              dispatch(setUser(response.accessToken));
              setSignUpResponse(undefined);
              router.push("/signin");
            }}
            className="w-[50%] gap-2 hover:bg-green-700 hover:font-semibold  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
          >
            <p>Continue</p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </button>
        ) : (
          <Link
            href={`/books`}
            onClick={() => {
              setSignUpResponse(undefined);
            }}
            className="hover:font-semibold w-auto gap-2 hover:bg-green-700  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
          >
            <p>Home</p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </Link>
        )}
      </div>
    </div>
  );
};

const ShowError = ({ response, setFormActive, setSignUpResponse }: any) => {
  if (response === "Response error") {
    response = "Name or Email Already Exists";
  }

  if (response === undefined) return null;
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="text-lg gap-3 flex-col bg-white h-72 flex  w-[500px] rounded-md items-center justify-center">
        <div>
          <h2 className={`${"text-red-500"} font-semibold`}>{response}</h2>
        </div>

        <button
          onClick={() => {
            setFormActive(true);
            setSignUpResponse(undefined);
          }}
          className="w-[50%] gap-2 hover:bg-green-700 hover:font-semibold  flex items-end bg-green-500 text-center  text-white py-1 px-2  rounded-md "
        >
          <p>Back</p>
          <BsArrowLeftShort fontWeight="extrabold" size={22} />
        </button>
      </div>
    </div>
  );
};
