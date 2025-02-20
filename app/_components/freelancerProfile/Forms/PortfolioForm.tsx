/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent, useState } from "react";
import Model from "../Model";
import Cookies from "js-cookie";
import { AddPortFolio } from "@/app/_lib/FreelancerProfile/APi";
import ProtectedPage from "../../common/ProtectedPage";

export default function PortfolioForm({
  closeEdit,
}: {
  closeEdit: () => void;
}) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!file) {
      console.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      console.log(formData);
      const res = await AddPortFolio(formData, token);
      console.log("Portfolio uploaded successfully", res);
      closeEdit();
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
      }
      console.error(error.message);
    } finally {
      closeEdit();
    }
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">Upload Portfolio</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[30rem]">
        <input
          type="text"
          name="name"
          placeholder="Enter portfolio name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none"
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="p-3 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none"
          accept="application/pdf"
          required
        />
        <div className="self-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </Model>
  );
}
