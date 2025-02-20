// components/ProfileHeader.tsx
import React, { useState } from "react";
import Image from "next/image";
import userprofile from "@/public/images/userprofile.jpg";
import StarRating from "../common/StarRating";
import EditButton from "../common/EditButton";

import Cookies from "js-cookie";
import { ProfilePictureAction } from "@/app/_lib/FreelancerProfile/APi";
import Model from "./Model";

export default function ProfileHeader({
  freelancer,
  onEditHeader,
  editable,
}: {
  onEditHeader: () => void;
  editable: boolean;
  freelancer: {
    username: string;
    profilePicture: string;
    name: string;
    jobTitle: string;
    pricePerHour: number;
    Country: string;
    rate: number;
  };
}) {
  // Validate initial image
  const initialImage = freelancer.profilePicture.startsWith("/")
    ? freelancer.profilePicture
    : freelancer.profilePicture.startsWith("http")
    ? freelancer.profilePicture
    : userprofile;

  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [profileImage, setProfileImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePictureSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const token = Cookies.get("token");

    try {
      const result = await ProfilePictureAction(formData, token);
      const newImage = result.profilePicture.startsWith("/")
        ? result.profilePicture
        : result.profilePicture.startsWith("http")
        ? result.profilePicture
        : `/${result.profilePicture}`;
      setProfileImage(newImage);
      setIsEditingPicture(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-20 w-9/12 -mt-10 bg-[var(--foreground-color)] px-6 py-8 rounded-2xl flex items-center space-x-4 justify-between">
      <div className="flex items-center gap-5">
        {/* Profile Picture */}

        <div className="relative w-20 md:w-32 lg:w-40 aspect-square rounded-full flex-shrink-0">
          <Image
            src={profileImage}
            alt="User Profile"
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          {editable && (
            <div className="absolute bottom-1 right-0 rounded-full z-50">
              <EditButton
                className="rounded-full p-1 w-10 aspect-square text-white bg-[var(--hover-color)] text-md "
                onClick={() => setIsEditingPicture(true)}
              />
            </div>
          )}
        </div>
        {/* Profile Details */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-3 items-center">
            <h2 className="text-4xl font-extrabold">{freelancer.name}</h2>{" "}
            <span>({freelancer.username})</span>
          </div>
          <h5 className="text-2xl font-bold">{freelancer.jobTitle}</h5>
          <p className="text-md">{freelancer.Country}</p>
          <p className="text-lg font-bold">${freelancer.pricePerHour}/hr</p>
          <div className="pointer-events-none">
            <StarRating size={20} defaultRating={freelancer.rate} />
          </div>
        </div>
      </div>
      {editable && (
        <div className="self-start">
          <EditButton onClick={onEditHeader} />
        </div>
      )}

      {/* Profile Picture Edit Modal */}
      {isEditingPicture && (
        <Model isOpen={true} onClose={() => setIsEditingPicture(false)}>
          <h2 className="text-2xl font-bold mb-4">Change Profile Picture</h2>
          <form onSubmit={handlePictureSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              name="profilePicture"
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
                onClick={() => setIsEditingPicture(false)}
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
