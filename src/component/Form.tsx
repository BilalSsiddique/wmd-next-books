import Link from 'next/link'

export default function Form({
  name,
  email,
  handleName,
  handleEmail,
  createUser,
  disabled,

}: {
  name: string;
  email: string;
  handleName: any;
  handleEmail: any;
  createUser: any;
  disabled: boolean;

}) {
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
            className="border border-green-700 border-l-4 p-2 outline-none"
            type="email"
            placeholder="Enter your Email"
          />

          <button
            disabled={disabled}
            onClick={createUser}
            className=" disabled:text-[#666666]  disabled:bg-[#cccccc] bg-green-500 mt-10  text-white p-2  rounded-md "
          >
            Signup
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
