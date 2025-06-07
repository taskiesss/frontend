/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import Model from "../Model";
import Cookies from "js-cookie";
import { AddPortFolio } from "@/app/_lib/FreelancerProfile/APi";
import ProtectedPage from "../../common/ProtectedPage";
import { toast, ToastContainer } from "react-toastify";

interface PortfolioFormProps {
  closeEdit: () => void;
}

export default function PortfolioForm({ closeEdit }: PortfolioFormProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

  // Mutation for adding a portfolio
  const addPortfolioMutation: UseMutationResult<any, Error, FormData, unknown> =
    useMutation({
      mutationFn: async (formData: FormData) => {
        const response = await AddPortFolio(formData, token);
        return response;
      },
      onSuccess: (response) => {
        // Invalidate all portfolios queries so that every paginated query is refetched.
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        console.log("Portfolio uploaded successfully", response);
        closeEdit();
      },
      onError: (error) => {
        if (
          error.message === "Forbidden" ||
          error.message === "Unauthorized user"
        ) {
          setIsForbidden(true);
          return;
        }
        setErrorMsg(error.message);
      },
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    addPortfolioMutation.mutate(formData);
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  }

  return (
    <>
      <div>
        <ToastContainer />
      </div>
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
              disabled={addPortfolioMutation.isPending}
              className="px-4 py-2 bg-[var(--btn-color)] rounded-lg"
            >
              {addPortfolioMutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Model>
    </>
  );
}
