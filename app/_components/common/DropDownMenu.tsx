"use client";
import React from "react";
import { useRouter } from "next/navigation";

export function DropdownMenu({
  setSelectedOption,
  options,
  setIsOpen,
  isOpen,
  children,
}: {
  setSelectedOption: (option?: string) => void;
  options: { label: string; value?: string }[];
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  const handleSelect = (option: { label: string; value?: string }) => {
    // Get current query parameters.
    const params = new URLSearchParams(window.location.search);

    // Update the state for the selected option.
    setSelectedOption(option.value);

    // Close the dropdown menu.
    setIsOpen(false);

    // Update the "sortby" query parameter.
    if (option.value) {
      params.set(String(children), option.value);
    } else {
      params.delete(String(children));
    }

    params.set("page", "0");
    // Push the new URL with updated query params, without a full page reload.
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div
      className={`absolute top-full right-0 mt-1 w-full bg-[var(--background-color)] border border-[var(--hover-color)] rounded shadow-lg transition-all duration-200 origin-top z-10 ${
        isOpen
          ? "opacity-100 scale-y-100 translate-y-0"
          : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => handleSelect(option)}
          className="w-full text-left px-4 py-2 text-[var(--accent-color)] hover:bg-[var(--button-hover-background-color)]"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
