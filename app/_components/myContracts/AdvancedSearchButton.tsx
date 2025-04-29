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

const Select = dynamic(() => import("react-select"), { ssr: false });

const SortByOptions = [
  { label: "Due date", value: "dueDate" },
  { label: "Title", value: "title" },
  { label: "Start date", value: "startDate" },
];
const DirectionOptions = [
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

  return (
    <>
      <SearchBar />
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
        className="w-1/3"
        placeholder="filter by status..."
        classNamePrefix="react-select"
        name="status"
      />
      <Suspense fallback={<Spinner />}>
        <CustomeSelection options={SortByOptions}>Sort by</CustomeSelection>
        <CustomeSelection options={DirectionOptions}>
          Sort direction
        </CustomeSelection>
      </Suspense>
    </>
  );
}

export default AdvancedSearchButton;
