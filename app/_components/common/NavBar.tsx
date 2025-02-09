"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import logo_dark from "@/public/images/logo_dark.png";
import Image from "next/image";
import Container from "./Container";

interface NavBarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogin, onSignup }) => {
  const router = useRouter();
  // console.log(window.location.pathname);
  // This function handles search form submission.
  // It prevents the default action, retrieves the search term,
  // and updates the URL with the search query (or could call an API).
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a FormData object to easily extract form values.
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;

    // For demonstration, we'll log the search term.
    // console.log("Search query:", searchTerm);

    // Update the URL query parameter for search.
    // You can also call your API (for example, searchJobs({ search: searchTerm, ... }) here).
    router.push(
      `${window.location.pathname}/search?query=${encodeURIComponent(
        searchTerm
      )}`
    );
  };

  return (
    <Container>
      <nav className="bg-[var(--background-color)] py-10 grid grid-rows-1 grid-cols-[min-content,1fr,1fr] place-items-center ">
        {/* Logo Section */}
        <div className="flex w-[10rem] h-auto justify-center flex-col ">
          <Link href="/">
            <Image
              src={logo_dark}
              alt="Taskaya Logo"
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-center">
          <ul className="list-none flex gap-10 w-auto h-auto items-center">
            {["Freelancers", "Jobs", "About us"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="w-[8rem] h-10 bg-inherit cursor-pointer"
                >
                  <span className="font-semibold text-xl">{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Search & Authentication Buttons */}
        <div className="flex flex-col justify-center w-full">
          <ul className="list-none flex items-center justify-between gap-7">
            {/* Search Form */}
            <li>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  {/* Search Icon Button */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <button
                      aria-label="Search"
                      className="bg-inherit p-0 cursor-pointer flex "
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
                    className="bg-[var(--background-color)]   placeholder:text-gray-400 pl-[3rem] p-2 w-[28rem] rounded-2xl border-solid border border-[var(--border-color)] focus:outline-none focus:ring-2 "
                  />
                </div>
              </form>
            </li>

            {/* Login & Sign Up Buttons */}
            <li>
              <div className="flex gap-7">
                <button
                  className="px-4 text-xl cursor-pointer bg-transparent whitespace-nowrap"
                  onClick={onLogin}
                >
                  <Link href="/login">Log in</Link>
                </button>
                <Button className="whitespace-nowrap" onClick={onSignup}>
                  <Link className="text-[var(--accent-color)]" href="/signup">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Container>
  );
};

export default NavBar;
