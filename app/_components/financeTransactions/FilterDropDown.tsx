"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faFilter } from "@fortawesome/free-solid-svg-icons"; // Import the filter icon

type FilterDropdownProps = {
  filter: "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWL";
  onFilterChange: (
    filter: "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWL"
  ) => void;
};

function FilterDropdown({ filter, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "", label: "All Transactions" },
    { value: "TRANSACTION", label: "transaction" },
    { value: "DEPOSIT", label: "deposit" },
    { value: "WITHDRAWL", label: "withdrawal" },
  ];

  const handleOptionClick = (
    value: "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWL"
  ) => {
    onFilterChange(value);
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full min-w-[12rem]">
        {/* Label indicating Transaction Type */}
        <label className="block text-sm text-gray-400 mb-1">
          Filter by: Transaction Type
        </label>
        {/* Dropdown Button */}
        <div
          onClick={toggleDropdown}
          className="bg-[var(--background-color)] w-full pl-10 pr-8 p-2 text-md border border-solid border-gray-600 rounded-md lowercase cursor-pointer flex items-center justify-between"
        >
          <span className="truncate">
            {options.find((opt) => opt.value === filter)?.label || "All"}
          </span>
          {/* Filter Icon */}
          <div className="absolute left-2  transform  text-gray-500 hover:text-[var(--btn-color)] pointer-events-none text-xl">
            <FontAwesomeIcon icon={faFilter} />
          </div>
          {/* Custom Dropdown Arrow */}
          <div className="absolute right-2 top-1/2 transform translate-y-1 text-gray-500 pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full min-w-[10rem] bg-[var(--background-color)] border border-solid border-gray-600 rounded-md mt-1 shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() =>
                  handleOptionClick(
                    option.value as "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWL"
                  )
                }
                className="px-4 py-2 text-md lowercase cursor-pointer hover:bg-[var(--hover-color)] truncate"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterDropdown;
