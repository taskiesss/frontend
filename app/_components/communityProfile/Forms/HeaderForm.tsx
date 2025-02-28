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
    country: string;
    id: string;
  };
}

export default function HeaderForm({ closeEdit, community }: HeaderFormProps) {
  // Split the initial name into first and last name (assuming space separator)

  const [formData, setFormData] = useState({
    name: community.name,
    title: community.title,
    pricePerHour: community.pricePerHour,
    country: community.country,
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

    // Combine firstName and lastName for the API
    const submitData = {
      firstName: `${formData.name}`.trim(),
      jobTitle: formData.title,
      pricePerHour: formData.pricePerHour,
      country: formData.country,
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
    "p-3 focus:outline-none bg-[var(--background-color)] border border-solid border-gray-600";

  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">Edit Profile Header</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[30rem]">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Last Name"
          className={inputClassName}
          required
        />

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className={inputClassName}
          required
        />

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

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className={inputClassName}
          required
        />

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
