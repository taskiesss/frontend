/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ProfilePictureAction } from "@/app/_lib/FreelancerProfile/APi";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ProtectedPage from "../../common/ProtectedPage";
import Model from "../Model";
import { toast, ToastContainer } from "react-toastify";

export default function ProfilePhotoForm({
  closeEdit,
}: {
  closeEdit: () => void;
}) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Check if the selected file is an image
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        setCoverImage(null);
        return;
      }
      setCoverImage(file);
    }
  };

  const handleCoverSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If no file is selected or it's invalid, do not proceed
    if (!coverImage) {
      setError("Please select an image file to upload.");
      return;
    }
    setLoading(true);
    setError(null);

    // Build the FormData manually and append the image to the "profilePicture" field
    const formData = new FormData();
    formData.append("profilePicture", coverImage);

    const token = Cookies.get("token");

    try {
      const result = await ProfilePictureAction(formData, token);
      console.log("Portfolio uploaded successfully", result);
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
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Model isOpen={true} onClose={closeEdit}>
        <h2 className="text-2xl font-bold mb-4">Change Profile Photo</h2>
        <form onSubmit={handleCoverSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            name="coverPhoto"
            onChange={handleFileChange}
            className="p-3 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none"
            accept="image/*"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="self-end flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[var(--btn-color)] rounded-lg disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </Model>
    </>
  );
}
