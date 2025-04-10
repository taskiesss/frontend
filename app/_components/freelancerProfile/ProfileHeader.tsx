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

  return (
    <div className="relative z-20 w-9/12 -mt-10 bg-[var(--foreground-color)] px-6 py-8 rounded-2xl flex items-center space-x-4 justify-between">
      <div className="flex items-center gap-5">
        {/* Profile Picture */}

        <div className="relative w-20 md:w-32 lg:w-40 aspect-square rounded-full flex-shrink-0">
          <Image
            src={freelancer.profilePicture}
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
            <StarRating
              size={20}
              defaultRating={freelancer.rate}
              allowHalf={true}
            />
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
        <ProfilePhotoForm closeEdit={() => setIsEditingPicture(false)} />
      )}
    </div>
  );
}
