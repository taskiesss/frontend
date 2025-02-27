"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import logo_dark from "@/public/images/logo_dark.png";
import Image from "next/image";
import Container from "./Container";

interface NavBarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogin, onSignup }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // This function handles search form submission.
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;

    const currentPath = window.location.pathname;
    const searchRegex = /^\/search\/(jobs|freelancers|communities)(\/)?$/i;

    if (searchRegex.test(currentPath)) {
      router.push(`${currentPath}?query=${encodeURIComponent(searchTerm)}`);
    } else {
      const searchtype = currentPath.includes("jobs")
        ? "jobs"
        : currentPath.includes("freelancers")
        ? "freelancers"
        : currentPath.includes("communities")
        ? "communities"
        : "jobs";
      router.push(
        `/guest/search/${searchtype}?query=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  return (
    <Container>
      <nav className="bg-[var(--background-color)] py-10 grid grid-rows-1 grid-cols-[min-content,1fr,1fr] place-items-center">
        {/* Logo Section */}
        <div className="flex w-[10rem] h-auto justify-center flex-col">
          <Link href="/">
            <Image
              src={logo_dark}
              alt="Taskaya Logo"
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col  justify-center">
          <ul className="list-none flex gap-20 w-auto h-auto items-center">
            {["Freelancers", "Jobs", "Communities", "About us"].map((item) => (
              <li key={item}>
                <Link
                  href={`/guest/${item.toLowerCase()}`}
                  className="w-[8rem]  bg-inherit cursor-pointer"
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
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="bg-[var(--background-color)] placeholder:text-gray-400 pl-[3rem] p-2 w-[28rem] rounded-2xl border-solid border border-[var(--border-color)] focus:outline-none focus:ring-2"
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
                <Button
                  className="whitespace-nowrap text-xl"
                  onClick={onSignup}
                >
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
