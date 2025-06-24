"use client";
import React, { Suspense, useState } from "react";
import DateRangePicker from "./DateRangePicker";
import FilterDropdown from "./FilterDropDown";
import TransactionTable from "./TransactionTable";
import Spinner from "../common/Spinner";

function RightPanel({ role }: { role?: string }) {
  const [dates, setDates] = useState<{
    startDate?: Date | null;
    endDate?: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [filter, setFilter] = useState<
    "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWL"
  >("");

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setDates({ startDate: start, endDate: end });
    console.log("Updated dates:", { startDate: start, endDate: end });
  };

  const handleResetDates = () => {
    setDates({ startDate: null, endDate: null });
  };

  const handleFilterChange = (
    newFilter: "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWL"
  ) => {
    setFilter(newFilter);
    console.log("Selected filter:", newFilter);
  };

  return (
    <div className="flex flex-col items-center bg-[var(--foreground-color)] gap-4 w-4/5 rounded-xl border-2 border-solid border-[var(--border-color)] py-10">
      <div className="flex items-center justify-between w-full  px-8 ">
        <h1 className="text-3xl font-extrabold self-end">
          Transaction history
        </h1>
        <div className="flex  items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">Filter by: Dates</span>
            <DateRangePicker
              startDate={dates.startDate}
              endDate={dates.endDate}
              onDateChange={handleDateChange}
              onResetDates={handleResetDates}
            />
          </div>
          {/* Filter Dropdown and Reset Button */}
          <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
          {/* Placeholder for transaction list - you can expand this */}
          {/* <div className="mt-6">
            <p>Transaction list would go here...</p>
            <p>
              Start Date:{" "}
              {dates.startDate?.toLocaleDateString("en-GB") || "Not set"}
            </p>
            <p>
              End Date:{" "}
              {dates.endDate?.toLocaleDateString("en-GB") || "Not set"}
            </p>
            <p>Selected Filter: {filter.toLowerCase()}</p>
          </div> */}
        </div>
      </div>

      <Suspense fallback={<Spinner />}>
        <TransactionTable filter={{ type: filter, dates: dates }} role={role} />
      </Suspense>
      {role !== "client" && (
        <p className="text-base opacity-90 w-full px-8 text-center">
          Note: Taskaya charges a 2% fee, which is deducted from the total
          price, resulting in the final transaction amount.
        </p>
      )}
    </div>
  );
}

export default RightPanel;
