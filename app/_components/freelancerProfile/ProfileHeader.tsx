import React from "react";
import Image from "next/image";
import userprofile from "@/public/images/userprofile.jpg";
import StarRating from "../common/StarRating";
import EditButton from "../common/EditButton";

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
  return (
    <div className="relative z-20 w-9/12 -mt-10 bg-[var(--foreground-color)] px-6 py-8 rounded-2xl flex items-center space-x-4 justify-between">
      <div className="flex items-center gap-5">
        {/* Profile Picture */}
        <div className="relative w-20 md:w-32 lg:w-40 aspect-square rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={userprofile}
            alt="User Profile"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
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
    </div>
  );
}
