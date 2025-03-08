"use client";
import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import FilterDropdown from "./FilterDropDown";

function RightPanel() {
  const [dates, setDates] = useState<{
    startDate?: Date | null;
    endDate?: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [filter, setFilter] = useState<
    "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWAL"
  >("TRANSACTION");

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setDates({ startDate: start, endDate: end });
    console.log("Updated dates:", { startDate: start, endDate: end });
  };

  const handleResetDates = () => {
    setDates({ startDate: null, endDate: null });
  };

  const handleFilterChange = (
    newFilter: "" | "TRANSACTION" | "DEPOSIT" | "WITHDRAWAL"
  ) => {
    setFilter(newFilter);
    console.log("Selected filter:", newFilter);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-4/5 bg-[var(--foreground-color)] p-8 rounded-xl ">
      <div className="flex items-center justify-between w-full ">
        <h1 className="text-2xl">Transaction history</h1>
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
      <div className="text-lg">
        <span>There is no transactions.</span>
      </div>
    </div>
  );
}

export default RightPanel;
