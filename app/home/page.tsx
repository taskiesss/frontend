"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import StarRating from "../_components/common/StarRating";

const Home: React.FC = () => {
  const searchParams = useSearchParams();
  const currentType = searchParams?.get("type") || "";

  // Set default selected option to "Newest"
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("Newest");

  // Change the userRating state to be a number
  const [userRating, setUserRating] = useState<number>(0);

  const options = [
    { label: "Newest", value: "newest" },
    { label: "Client Spend", value: "client_spend" },
    { label: "Client Rating", value: "client_rating" },
  ];

  const handleSelect = (option: { label: string; value: string }) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  return (
    <div className="h-screen grid grid-cols-[1fr_3fr] grid-rows-[min-content_min-content_1fr]">
      {/* Row 1: Nav spanning both columns */}
      <nav className="col-span-2 bg-gray-200 p-4 flex items-center justify-center">
        <ul className="flex gap-44">
          <li>
            <Link
              href={{ pathname: "/home", query: { type: "jobs" } }}
              className={`${
                currentType === "jobs"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: "/home", query: { type: "communities" } }}
              className={`${
                currentType === "communities"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              Communities
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: "/home", query: { type: "freelancer" } }}
              className={`${
                currentType === "freelancer"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              Freelancers
            </Link>
          </li>
        </ul>
      </nav>

      {/* Row 2: Custom Select Component */}
      <div className="col-span-2 bg-gray-300 p-4 flex justify-end">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white px-4 py-2 rounded border border-gray-300 flex items-center gap-2 min-w-[160px] justify-between"
          >
            {/* Always display "Sort by" and append the selected option */}
            <span className="text-gray-700">
              Sort by {selectedOption && `: ${selectedOption}`}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-600 text-sm transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              size="sm"
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-full right-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg
              transition-all duration-200 origin-top
              ${
                isOpen
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
              }`}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Aside and Section */}
      <aside className="row-start-3 bg-gray-400 p-4">
        <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
      </aside>
      <section className="row-start-3 col-start-2 bg-gray-500 p-4">
        wooork
      </section>
    </div>
  );
};

export default Home;
