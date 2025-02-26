"use client";
import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

type Props = {
  initialValue?: string; // Initial search term (e.g., from URL params)
};

function SearchBar({ initialValue = "" }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    updateUrl(newSearchTerm); // Update URL as user types
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUrl(searchTerm); // Update URL on form submission
  };

  const updateUrl = (query: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (query.trim()) {
      urlParams.set("contractQuery", query.trim());
    } else {
      urlParams.delete("contractQuery");
    }
    router.push(`${window.location.pathname}?${urlParams.toString()}`);
  };

  return (
    <form
      action=""
      method="GET"
      className="w-full flex"
      onSubmit={handleSearchSubmit}
    >
      <div className="relative w-1/3">
        <input
          type="search"
          name="contractQuery"
          id="contractQuery"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for client name or job title"
          className="focus:outline-none bg-[var(--background-color)] text-[var(--accent-color)] p-4 border-solid border border-gray-600 rounded-xl w-full text-lg pr-10"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
      </div>
    </form>
  );
}

export default SearchBar;
