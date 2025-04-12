/* eslint-disable @typescript-eslint/no-explicit-any */
// components/HeaderForm.tsx
import React, { useState } from "react";
import Cookies from "js-cookie";
import ProtectedPage from "../../common/ProtectedPage";
import { updateCommunityHeaderSection } from "@/app/_lib/CommunityProfile/APi";
import Model from "../../freelancerProfile/Model";

interface HeaderFormProps {
  closeEdit: () => void;
  community: {
    name: string;
    title: string;
    pricePerHour: number;
    id: string;
    avgHoursPerWeek: number;
  };
}

export default function HeaderForm({ closeEdit, community }: HeaderFormProps) {
  const [formData, setFormData] = useState({
    name: community.name,
    title: community.title,
    pricePerHour: community.pricePerHour,
    avgHoursPerWeek: community.avgHoursPerWeek,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerHour" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = Cookies.get("token");

    const submitData = {
      firstName: `${formData.name}`.trim(),
      jobTitle: formData.title,
      pricePerHour: formData.pricePerHour,
      avgHoursPerWeek: formData.avgHoursPerWeek,
    };
    console.log(submitData);
    try {
      const success = await updateCommunityHeaderSection(
        community.id,
        submitData,
        token
      );
      console.log(success);
      closeEdit();
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
        return;
      }
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );

  const inputClassName =
    "p-3 focus:outline-none bg-[var(--background-color)] border border-solid border-gray-600 w-full";

  // Function to format input names for display
  const formatLabel = (name: string) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">Edit Profile Header</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[30rem]">
        <div className="flex flex-col gap-1">
          <span className="text-md font-medium">{formatLabel("name")}</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={inputClassName}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-md font-medium">{formatLabel("title")}</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className={inputClassName}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-md font-medium">
            {formatLabel("pricePerHour")}
          </span>
          <input
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            placeholder="Price per Hour"
            className={inputClassName}
            min="0"
            step="1"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-md font-medium">
            {formatLabel("average hours per week")}
          </span>
          <input
            type="text"
            name="avgHoursPerWeek"
            value={formData.avgHoursPerWeek}
            onChange={handleChange}
            placeholder="Average Hours Per Week"
            className={inputClassName}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="self-end flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </Model>
  );
}
