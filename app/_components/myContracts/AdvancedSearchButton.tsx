/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Assuming this is in a file like app/_components/Job/AdvancedSearchButton.tsx
"use client"; // Mark as client component
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { ActionMeta } from "react-select";
import SearchBar from "./SearchBar";
import Spinner from "../common/Spinner";
import CustomeSelection from "../common/CustomeSelection";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Select = dynamic(() => import("react-select"), { ssr: false });

const SortByOptions = [
  { label: "All", value: undefined },
  { label: "Due date", value: "dueDate" },
  { label: "Title", value: "title" },
  { label: "Start date", value: "startDate" },
];
const DirectionOptions = [
  { label: "All", value: undefined },
  { label: "Ascending", value: "ASC" },
  { label: "Descending", value: "DESC" },
];
function AdvancedSearchButton({ role }: { role?: string }) {
  let options;
  if (role === "client")
    options = [
      { value: "ACTIVE", label: "Active" },
      { value: "ENDED", label: "Ended" },
      { value: "REJECTED", label: "Rejected" },
      { value: "PENDING", label: "Pending" },
    ];
  else
    options = [
      { value: "ACTIVE", label: "Active" },
      { value: "ENDED", label: "Ended" },
    ];

  const [selectedOption, setSelectedOption] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSelectChange = (
    selectedOptions: {
      value: string;
      label: string;
    }[],
    actionMeta: ActionMeta<unknown>
  ) => {
    if (typeof window === "undefined") return;
    // Handle the change event here
    const params = new URLSearchParams(window.location.search);

    if (selectedOptions.length !== 0) {
      const selectedValues = (selectedOptions as any[]).map(
        (option) => option.value
      );
      console.log(selectedValues);
      setSelectedOption(selectedOptions as any[]);
      params.set("status", selectedValues.join(","));
    } else {
      setSelectedOption([]);
      params.delete("status");
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <SearchBar />

      {/* Hamburger Menu Button - Mobile/Tablet Only */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 rounded-lg bg-[var(--hover-color)] hover:bg-[var(--button-hover-background-color)] transition-colors "
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faTimes : faBars}
          className="text-white text-lg"
        />
      </button>

      {/* Filter Menu - Mobile/Tablet Only */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--background-color)] border-2 border-[var(--border-color)] rounded-xl p-4 shadow-lg z-50 mt-2">
          <div className="flex flex-col gap-6">
            {/* Status Filter */}
            <div className="flex flex-col gap-2">
              {selectedOption.length > 0 && (
                <div className="">
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(
                        window.location.search
                      );
                      setSelectedOption([]);
                      params.delete("status");
                      router.push(
                        `${window.location.pathname}?${params.toString()}`
                      );
                    }}
                    className="text-base text-blue-600 dark:text-blue-400 underline"
                  >
                    clear filter
                  </button>
                </div>
              )}
              <label className="block text-sm font-medium text-[var(--accent-color)] mb-2">
                Filter by Status
              </label>
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
                className="w-2/3"
                placeholder="Select status..."
                classNamePrefix="react-select"
                name="status"
              />
            </div>

            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <Suspense fallback={<Spinner />}>
                  <CustomeSelection options={SortByOptions}>
                    Sort by
                  </CustomeSelection>
                </Suspense>
              </div>
              <div className="flex-1">
                <Suspense fallback={<Spinner />}>
                  <CustomeSelection options={DirectionOptions}>
                    Sort direction
                  </CustomeSelection>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filter Interface - Hidden on Mobile/Tablet */}
      <div className="hidden lg:flex items-center gap-4 flex-1 w-full">
        <div className="w-full">
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
            className="w-full"
            placeholder="filter by status..."
            classNamePrefix="react-select"
            name="status"
          />
        </div>
        <Suspense fallback={<Spinner />}>
          <CustomeSelection options={SortByOptions}>Sort by</CustomeSelection>
          <CustomeSelection options={DirectionOptions}>
            Sort direction
          </CustomeSelection>
        </Suspense>
      </div>
    </div>
  );
}

export default AdvancedSearchButton;
