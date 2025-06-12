// components/ProfileHeader.tsx
import Image from "next/image";
import { useState } from "react";
import EditButton from "../common/EditButton";
import StarRating from "../common/StarRating";

import ProfilePhotoForm from "./Forms/ProfilePhotoForm";

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
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  console.log(freelancer);
  return (
    <div className="relative z-10 w-full md:max-w-7xl max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 bg-[var(--foreground-color)] py-6 sm:py-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        {/* Profile Picture */}
        <div className="relative w-24 sm:w-24 md:w-24 lg:w-32 aspect-square rounded-full flex-shrink-0 shadow-lg">
          <Image
            src={freelancer.profilePicture}
            alt="User Profile"
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px"
          />
          {editable && (
            <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 rounded-full z-50">
              <EditButton
                className="rounded-full p-1 sm:p-2 w-8 sm:w-10 aspect-square text-white bg-[var(--hover-color)] hover:bg-opacity-80 transition-all"
                onClick={() => setIsEditingPicture(true)}
              />
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="flex-1 flex flex-col gap-1 sm:gap-2 lg:gap-3">
          {/* Name and Username */}
          <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-2 lg:gap-3">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[var(--accent-color)]">
              {freelancer.name}
            </h2>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg opacity-60 font-medium md:self-center">
              @{freelancer.username}
            </span>
          </div>

          {/* Job Title */}
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[var(--accent-color)]">
            {freelancer.jobTitle}
          </h3>

          {/* Location and Rate */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 lg:gap-4 text-xs sm:text-sm md:text-base lg:text-lg">
            {freelancer.Country && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[var(--border-secondary)]">📍</span>
                <span className="text-[var(--accent-color)] font-medium">
                  {freelancer.Country}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[var(--border-secondary)]">💰</span>
              <span className="text-[var(--status-active)] dark:text-green-500 font-bold">
                ${freelancer.pricePerHour}/hr
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="pointer-events-none">
              <StarRating
                size={14}
                defaultRating={freelancer.rate}
                allowHalf={true}
                color="#fbd500e0"
              />
            </div>
          </div>
        </div>

        {/* Edit Button */}
        {editable && (
          <div className="self-start">
            <EditButton
              onClick={onEditHeader}
              className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg bg-[var(--btn-color)] hover:bg-[var(--button-hover-background-color)] text-[var(--btn-clr-primary)] font-medium transition-colors text-xs sm:text-sm md:text-base"
            />
          </div>
        )}
      </div>

      {/* Profile Picture Edit Modal */}
      {isEditingPicture && (
        <ProfilePhotoForm closeEdit={() => setIsEditingPicture(false)} />
      )}
    </div>
  );
}
