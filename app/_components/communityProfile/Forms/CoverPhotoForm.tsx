/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { updateCommunityCoverPicture } from "@/app/_lib/CommunityProfile/APi";
import Cookies from "js-cookie";
import React, { useState } from "react";
import ProtectedPage from "../../common/ProtectedPage";
import Model from "../../freelancerProfile/Model";

export default function CommunityCoverPhotoForm({
  closeEdit,
  communityId,
}: {
  closeEdit: () => void;
  communityId: string;
}) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForbidden, setIsForbidden] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (JPEG, PNG, WEBP).");
        setCoverImage(null);
        return;
      }
      setCoverImage(file);
    }
  };

  const handleCoverSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coverImage) {
      setError("Please select an image file to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("coverPicture", coverImage);
    const token = Cookies.get("token");

    try {
      await updateCommunityCoverPicture(communityId, formData, token);
      closeEdit();
    } catch (error: any) {
      if (error.message === "Forbidden") {
        setIsForbidden(true);
      } else {
        setError("Failed to update cover photo. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="Only community admins can update the cover photo" />
    );
  }

  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">Change Community Cover Photo</h2>
      <form onSubmit={handleCoverSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          name="coverPhoto"
          onChange={handleFileChange}
          className="p-3 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none"
          accept="image/jpeg, image/png, image/webp"
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
  );
}
