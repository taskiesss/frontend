// components/CoverPhoto.tsx
import React, { useState } from "react";
import Image from "next/image";
import EditButton from "../common/EditButton";
import Cookies from "js-cookie";
import { CoverPictureAction } from "@/app/_lib/FreelancerProfile/APi";
import Model from "./Model";

export default function CoverPhoto({
  freelancer,
  editable = false, // Added editable prop with default false
}: {
  freelancer: { coverPhoto: string };
  editable?: boolean;
}) {
  // Use freelancer.coverPhoto if valid, otherwise fallback to default
  const defaultImageUrl =
    "https://res.cloudinary.com/dvds6blan/image/upload/v1739928508/gtqlnfutfiocsuaqhemo.jpg";
  const initialImage = freelancer.coverPhoto.startsWith("http")
    ? freelancer.coverPhoto
    : defaultImageUrl;

  const [coverImage, setCoverImage] = useState(initialImage);
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log editable outside of render
  console.log("Editable prop value:", editable);
  if (!editable) {
    console.log("Editable is false, button not rendered");
  }

  const handleCoverSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const token = Cookies.get("token");

    try {
      const result = await CoverPictureAction(formData, token);
      // Assuming result is the direct URL string; adjust if it's an object
      const newImage = result.startsWith("http")
        ? result
        : `${process.env.NEXT_PUBLIC_API_URL}${result}`;
      setCoverImage(newImage);
      setIsEditingCover(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative w-full h-[312px] bg-[var(--background-color)] overflow-hidden">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[0.1rem]"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src={coverImage}
          alt="Cover Photo"
          fill
          quality={100}
          priority
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {/* Edit Button */}

      <div className="absolute bottom-4 right-8 z-40 ">
        <EditButton
          className="rounded-full p-2 w-10 aspect-square text-white bg-[var(--hover-color)] "
          onClick={() => setIsEditingCover(true)}
        />
      </div>

      {/* Cover Photo Edit Modal */}
      {isEditingCover && (
        <Model isOpen={true} onClose={() => setIsEditingCover(false)}>
          <h2 className="text-2xl font-bold mb-4">Change Cover Photo</h2>
          <form onSubmit={handleCoverSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              name="coverPhoto"
              accept="image/*"
              className="p-3 focus:outline-none bg-[var(--background-color)] border border-solid border-gray-600"
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
              <button
                type="button"
                onClick={() => setIsEditingCover(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </Model>
      )}
    </div>
  );
}
