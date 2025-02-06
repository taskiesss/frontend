import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./button";

interface NavBarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogin, onSignup }) => {
  return (
    <nav className="bg-[var(--foreground-color)] h-20  grid grid-rows-1 grid-cols-[min-content,1fr,1fr] place-items-center">
      {/* Logo Section */}
      <div className="flex w-[10rem] h-auto justify-center flex-col mx-0 col-sp">
        <img
          src="/images/logo_dark.png"
          alt="Taskaya Logo"
          className="h-auto w-auto"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col justify-center ">
        <ul className="list-none flex gap-10 w-auto h-auto items-center">
          {["Freelancer", "Jobs", "About us"].map((item) => (
            <li key={item}>
              <button className="w-[8rem] h-10 bg-inherit cursor-pointer">
                <span className="font-semibold text-xl">{item}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Search & Authentication Buttons */}
      <div className="flex flex-col justify-center w-full">
        <ul className="list-none  items-center justify-between flex mr-5 gap-7">
          {/* Search Form */}
          <li>
            <form action="">
              <div className="relative">
                {/* Search Icon Button */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <button
                    aria-label="Search"
                    className="bg-inherit p-0 cursor-pointer flex"
                    type="submit"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-gray-400 text-xl"
                    />
                  </button>
                </div>

                {/* Search Input Field */}
                <input
                  type="text"
                  name="search"
                  placeholder="What are you looking for?"
                  className="bg-[var(--background-color)] placeholder:text-gray-400 pl-[3rem] p-2 w-[28rem] rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </li>

          {/* Login & Sign Up Buttons */}

          <li>
            <div className="flex gap-7">
              <button
                className=" px-4 text-xl cursor-pointer bg-transparent whitespace-nowrap"
                onClick={onLogin}
              >
                Log in
              </button>
              <Button className="whitespace-nowrap" onClick={onSignup}>
                Sign Up
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
