import Link from 'next/link'
import { BsArrowRightShort } from 'react-icons/bs';
export default function Form({
  name,
  email,
  handleName,
  handleEmail,
  handleBlur,
  createUser,
  disabled,
  outOfFocus,
}: {
  name: string;
  email: string;
  handleName: any;
  handleEmail: any;
  handleBlur: any;
  createUser: any;
  disabled: boolean;
  outOfFocus:boolean;
}) {
  const ShowEmailErroMessage = () => {
    return <p className="text-red-600 font-semibold">Email should be valid!</p>;
  };
  return (
    <form
      action="
      "
    >
      <div className="flex justify-center items-center h-screen">
        <div className="flex rounded-lg flex-col sm:w-96 w-80 h-96 justify-center p-8 md:px-10 bg-white gap-3">
          <input
            value={name}
            name="name"
            onChange={handleName}
            className="border border-green-700 border-l-4 p-2 outline-none"
            type="text"
            placeholder="Enter your Name"
          />
          <input
            value={email}
            name="email"
            onChange={handleEmail}
            onBlur={handleBlur}
            className="border border-green-700 border-l-4 p-2 outline-none"
            type="email"
            placeholder="Enter your Email"
          />
          {outOfFocus && <ShowEmailErroMessage />}

          {/* <button
            disabled={disabled}
            onClick={createUser}
            className=" disabled:text-[#666666]  disabled:bg-[#cccccc] bg-green-500 mt-10  text-white p-2  rounded-md "
          >
            Signup
          </button> */}
          <button
            disabled={disabled}
            onClick={createUser}
            className="disabled:text-[#666666] justify-between disabled:bg-[#cccccc]  gap-2 hover:bg-green-700 font-semibold  flex items-end bg-green-500 text-center  text-white py-2 px-2  rounded-md "
          >
            <p>Sign Up</p>
            <BsArrowRightShort fontWeight="extrabold" size={22} />
          </button>

          <p>
            Already have an Account?{" "}
            <Link href="/signin">
              <span className="text-green-700 cursor-pointer font-semibold">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
