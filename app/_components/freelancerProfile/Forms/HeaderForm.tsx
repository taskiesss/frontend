/* eslint-disable @typescript-eslint/no-explicit-any */
// components/HeaderForm.tsx
import React, { useEffect, useState } from "react";
import Model from "../Model";
import { HeaderSectionAction } from "@/app/_lib/FreelancerProfile/APi";
import Cookies from "js-cookie";
import ProtectedPage from "../../common/ProtectedPage";
import { toast, ToastContainer } from "react-toastify";

interface HeaderFormProps {
  closeEdit: () => void;
  freelancer: {
    name: string;
    jobTitle: string;
    pricePerHour: number;
    country: string;
  };
}

export default function HeaderForm({ closeEdit, freelancer }: HeaderFormProps) {
  const [firstName, lastName] = freelancer.name.split(" ");

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    jobTitle: freelancer.jobTitle,
    pricePerHour: freelancer.pricePerHour,
    country: freelancer.country,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

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
      firstName: `${formData.firstName}`.trim(),
      lastName: `${formData.lastName}`.trim(),
      jobTitle: formData.jobTitle,
      pricePerHour: formData.pricePerHour,
      country: formData.country,
    };
    console.log(submitData);
    try {
      const success = await HeaderSectionAction(submitData, token);
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
      setErrorMsg(error.message);
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
    <>
      <div>
        <ToastContainer />
      </div>
      <Model isOpen={true} onClose={closeEdit}>
        <h2 className="text-2xl font-bold mb-4">Edit Profile Header</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[30rem]">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-md font-medium">
                  {formatLabel("firstName")}
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={inputClassName}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-md font-medium">
                  {formatLabel("lastName")}
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={inputClassName}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-md font-medium">
              {formatLabel("jobTitle")}
            </span>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
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
              {formatLabel("country")}
            </span>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
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
    </>
  );
}
