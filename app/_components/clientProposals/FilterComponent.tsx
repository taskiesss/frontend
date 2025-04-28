/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { ActionMeta, MultiValue } from "react-select";

// Dynamically import react-select with SSR disabled
const Select = dynamic(() => import("react-select"), { ssr: false });

type OptionType = { value: string; label: string };

function FilterComponent({}) {
  const options: OptionType[] = useMemo(
    () => [
      { value: "PENDING", label: "Pending" },
      { value: "ACCEPTED", label: "Accepted" },
      { value: "DECLINED", label: "Declined" },
      { value: "HIRED", label: "Hired" },
    ],
    []
  );

  const [selectedOption, setSelectedOption] = useState<OptionType[] | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  // Sync state with URL query parameters on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status) {
      const statusValues = status.split(",").filter((val) => val);
      const selected = options.filter((opt) =>
        statusValues.includes(opt.value)
      );
      setSelectedOption(selected.length > 0 ? selected : null);
    } else {
      setSelectedOption(null);
    }
  }, [options]);

  const handleClearFilter = () => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.delete("status");
    params.delete("search");
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params.toString()}`);
    setSelectedOption(null);
    setSearch("");
  };

  const handleSelectChange = (
    selected: MultiValue<OptionType>,
    _actionMeta: ActionMeta<OptionType>
  ) => {
    if (typeof window === "undefined") return;

    if (!selected || selected.length === 0) {
      handleClearFilter();
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const selectedValues = selected.map((opt) => opt.value).join(",");
    params.set("status", selectedValues);
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params.toString()}`);
    setSelectedOption([...selected]);
  };

  const handleSearchChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search") as string;

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    setSearch(searchValue);
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <section className="flex justify-between border-b-2 border-b-[var(--border-color)] pb-5 w-full">
      <form
        onSubmit={handleSearchChange}
        className="flex items-center gap-2 w-1/3"
      >
        <input
          name="search"
          type="text"
          className="bg-[var(--background-color)] w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
          placeholder="Search proposals by job name..."
        />
        <button
          type="submit"
          className="relative right-10 p-2 rounded-full transition-all"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      <div className="flex items-center gap-2">
        {(selectedOption || search) && (
          <button
            onClick={handleClearFilter}
            className="text-[var(--hover-color)] px-4 py-2 rounded-lg hover:text-[var(--button-hover-background-color)] font-medium transition-all"
          >
            Clear Filter
          </button>
        )}
        <div className="flex self-center gap-2">
          <Select
            isMulti
            value={selectedOption}
            options={options}
            onChange={
              handleSelectChange as (
                newValue: unknown,
                actionMeta: ActionMeta<unknown>
              ) => void
            }
            className="flex-wrap whitespace-pre-wrap"
            placeholder="filter by status..."
            classNamePrefix="react-select"
            name="status"
          />
        </div>
      </div>
    </section>
  );
}

export default FilterComponent;
