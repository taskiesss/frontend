/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

import Model from "../../freelancerProfile/Model";

import { UpdatePositionRequest } from "@/app/_types/CommunitySettings";

interface AddPositionFormProps {
  onClose: () => void;
  onPositionAdded: (newPosition: UpdatePositionRequest) => void; // Callback to refresh positions list
}

export default function AddPositionForm({
  onClose,
  onPositionAdded,
}: AddPositionFormProps) {
  const [positionName, setPositionName] = useState("");
  const [financialPercent, setFinancialPercent] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePercentChange = (value: string) => {
    // Clean and validate percentage input
    let cleanedValue = value.replace(/[^\d.]/g, "");
    if (cleanedValue === "") cleanedValue = "0";
    const numValue = parseFloat(cleanedValue);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      setErrorMessage("Percentage must be between 0 and 100");
    } else {
      setErrorMessage(null);
    }
    setFinancialPercent(cleanedValue);
  };

  // In AddPositionForm component
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errorMessage) return;

    const numericPercent = parseFloat(financialPercent);

    const newPosition = {
      positionId: 0,
      positionName,
      financialPercent: numericPercent,
      description,
    };

    try {
      setLoading(true);
      onPositionAdded(newPosition); // Pass data to parent
      onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to add position");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Model isOpen={true} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Add New Position</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 min-w-[20rem]"
      >
        {/* Position Name */}
        <div>
          <label className="block mb-2">Position Name</label>
          <input
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            required
            className="w-full p-3 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none"
          />
        </div>

        {/* Financial Percentage */}
        <div>
          <label className="block mb-2">Financial Percentage</label>
          <input
            type="text"
            value={financialPercent}
            onChange={(e) => handlePercentChange(e.target.value)}
            required
            className={`w-full p-3 bg-[var(--background-color)] border border-solid ${
              errorMessage ? "border-red-500" : "border-gray-600"
            } focus:outline-none`}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="self-end flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !!errorMessage}
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Position"}
          </button>
        </div>
      </form>
    </Model>
  );
}
