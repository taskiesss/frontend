"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo_dark from "@/public/images/logo_dark.png";
import Image from "next/image";
import Container from "./Container";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DropLoggedin from "./DropLoggedin";

interface NavItem {
  label: string;
  options: { label: string; link: string }[];
}

const NavLoggedin: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  // Track the currently open dropdown index (or null if none open)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    // Define an async function to perform the fetch
    const fetchMyImage = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/public/signup/create-account`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setImage(data.profilePicture);
        setName(data.name);
        // Do something with myImage here (e.g., update state)
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    // Call the async function
    fetchMyImage();
  }, []); // re-run effect when `user` or `BASE_URL` changes

  // Define your nav items along with the options for each dropdown.
  const navItems: NavItem[] = [
    {
      label: "My Tasks",
      options: [
        { label: "Your active contracts", link: "/nx/freelancer/mycontracts" },
      ],
    },
    {
      label: "Explore Jobs",
      options: [
        { label: "Find work", link: "/nx/freelancer/find-work" },
        { label: "Saved Jobs", link: "/nx/freelancer/saved-jobs" },
        { label: "Proposals", link: "/nx/freelancer/proposals/myProposals" },
      ],
    },
    {
      label: "Finance",
      options: [{ label: "Transactions", link: "/finance/invoices" }],
    },
  ];

  // Handle search form submission.
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;

    const currentPath = window.location.pathname;
    const searchRegex = /^\/(jobs|freelancers|communities)\/search(\/)?$/i;

    if (searchRegex.test(currentPath)) {
      router.push(`${currentPath}?query=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push(
        `${currentPath}/search?query=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  // Toggle dropdown: if clicked dropdown is already open, close it; otherwise open it.
  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
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
        <div className="w-full">
          <ul className="list-none flex justify-around items-center">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className="relative flex flex-col items-center"
              >
                <div className="flex items-center gap-1">
                  <button className="bg-inherit cursor-pointer">
                    <span className="font-semibold text-xl">{item.label}</span>
                  </button>
                  <button onClick={() => toggleDropdown(index)} className="p-1">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[var(--hover-color)] text-sm transition-transform duration-200 ${
                        openDropdownIndex === index ? "rotate-180" : ""
                      }`}
                      size="sm"
                    />
                  </button>
                </div>
                {openDropdownIndex === index && (
                  <div className="absolute top-full left-0 mt-2">
                    <DropLoggedin options={item.options} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Search & Profile Section */}
        <div className="flex flex-col justify-center w-full">
          <ul className="list-none flex items-center justify-between gap-7">
            {/* Search Form */}
            <li>
              <form onSubmit={handleSearch}>
                <div className="relative">
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

            {/* Notification & Profile */}
            <li>
              <div className="flex gap-7 items-center">
                <FontAwesomeIcon size="2xl" icon={faBell} />
                <div className="relative w-12 aspect-square rounded-full overflow-hidden">
                  <Image src={image} fill alt="userProfile" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Container>
  );
};

export default NavLoggedin;
