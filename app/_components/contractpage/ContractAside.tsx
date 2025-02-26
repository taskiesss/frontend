"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const StatusOptions: { label: "Active" | "Ended" }[] = [
  { label: "Active" },
  { label: "Ended" },
];

export default function ContractAside({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  // Initialize status from URL search params if they exist
  const initialStatus = () => {
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get("status");
    const statusArray = statusParam?.split(",") || [];
    return {
      Active: statusArray.includes("Active"),
      Ended: statusArray.includes("Ended"),
    };
  };

  const [status, setStatus] =
    useState<Record<"Active" | "Ended", boolean>>(initialStatus);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    // Handle status filter
    const selectedStatus = Object.keys(status)
      .filter((key) => status[key as "Active" | "Ended"])
      .map((key) => key.toUpperCase());

    if (selectedStatus.length > 0) {
      params.set("status", selectedStatus.join(","));
    } else {
      params.delete("status");
    }

    // Note: The original code referenced selectedProjectLengths which wasn't defined
    // I'm keeping only the status filter logic since that's what was requested
    // If you need projectLength handling, you'd need to add that state separately

    const currentQuery = new URLSearchParams(window.location.search).toString();
    const newQuery = params.toString();

    if (currentQuery !== newQuery) {
      router.push(`${window.location.pathname}?${newQuery}`);
    }
  };

  return (
    <div className="sticky top-[2.5rem] left-0">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-[var(--btn-color)] text-[var(--accent-color)] rounded-md"
      >
        Advanced Search
      </button>

      <aside className="row-start-3 bg-[var(--background-color)] rounded-lg shadow-s absolute z-50">
        <form onSubmit={handleSubmit} className="py-4">
          <div className="py-4">
            <h3 className="text-2xl py-3 font-bold">Contract status</h3>
            <div className="space-y-2 py-3">
              {StatusOptions.map((proj) => (
                <div key={proj.label} className="flex items-center">
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={status[proj.label]}
                      onChange={(e) =>
                        setStatus((prev) => ({
                          ...prev,
                          [proj.label]: e.target.checked,
                        }))
                      }
                    />
                    <span className="checkmark"></span>
                    <span className="text-lg leading-5">{proj.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg text-[var(--accent-color)]"
          >
            Apply Filters
          </button>
        </form>
      </aside>
    </div>
  );
}
