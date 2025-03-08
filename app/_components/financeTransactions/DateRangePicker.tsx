/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWithinInterval } from "date-fns";
import { enGB } from "date-fns/locale/en-GB";

registerLocale("en-GB", enGB);

type DateRangePickerProps = {
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  onResetDates: () => void;
};

function DateRangePicker({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onDateChange,
  onResetDates,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate || null);
  const [isSelectingStart, setIsSelectingStart] = useState(true);

  // Handle date selection using a tuple of dates
  const handleDateSelect = (
    dates: [Date | null, Date | null],
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end);
  };

  // Format date for display
  const formatDate = (date?: Date | null): string => {
    return date ? date.toLocaleDateString("en-GB") : "";
  };

  // Highlight the range by returning a class name or empty string
  const highlightRange = (date: Date): string => {
    if (startDate && endDate) {
      return isWithinInterval(date, { start: startDate, end: endDate })
        ? "react-datepicker__day--highlighted-range"
        : "";
    }
    if (startDate && !endDate && date >= startDate) {
      return "react-datepicker__day--highlighted-range";
    }
    return "";
  };

  // Display value in the input
  const displayValue =
    startDate || endDate
      ? `${formatDate(startDate) || "Start"} - ${formatDate(endDate) || "End"}`
      : "Select Date Range";

  return (
    <div className="flex items-center gap-4">
      {/* Flex container for the DatePicker input and icon */}
      <div className="flex items-center border border-solid border-gray-600 rounded-md overflow-hidden">
        <DatePicker
          selected={startDate}
          onChange={handleDateSelect}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="dd/MM/yyyy"
          placeholderText={displayValue}
          className="flex text-md p-2 bg-[var(--background-color)] focus:outline-none focus:border-blue-500 cursor-pointer"
          calendarClassName="react-datepicker-custom"
          dayClassName={highlightRange}
        />
        <svg
          className="w-10 aspect-square text-gray-500 p-2 bg-[var(--background-color)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      {startDate && (
        <button
          onClick={() => {
            onResetDates();
            setStartDate(null);
            setEndDate(null);
            setIsSelectingStart(true);
          }}
          className={`text-lg text-[var(--hover-color)] hover:text-[var(--btn-color)] font-medium ${
            startDate ? "" : "invisible"
          }`}
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default DateRangePicker;
