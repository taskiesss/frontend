"use client";
// components/CommunityHeader.tsx

import Image from "next/image";
import { useState } from "react";
import EditButton from "../common/EditButton";
import StarRating from "../common/StarRating";
import HeaderForm from "./Forms/HeaderForm";
import CommunityProfilePhotoForm from "./ProfilePhotoForm";
import SendRequestComponent from "./SendRequestComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CommunityHeader({
  community,
  role,
}: {
  role?: string;
  community: {
    id: string;
    profilePicture: string;
    name: string;
    title: string;
    country: string;
    pricePerHour: number;
    rate: number;
    isFull?: boolean;
    isMember: boolean;
    isAdmin?: boolean;
  };
}) {
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [isEditingHeader, setIsEditingHeader] = useState(false);

  console.log(community);

  return (
    <div className="relative z-20 w-9/12 -mt-10 bg-[var(--foreground-color)] px-6 py-8 rounded-2xl flex items-center space-x-4 justify-between">
      <div className="flex items-center gap-5">
        {/* Profile Picture */}

        <div className="relative w-20 md:w-32 lg:w-40 aspect-square rounded-full flex-shrink-0">
          <Image
            src={community.profilePicture}
            alt="User Profile"
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          {community.isAdmin && (
            <div className="absolute bottom-1 right-0 rounded-full z-50">
              <EditButton
                className="rounded-full p-1 w-10 aspect-square text-white bg-[var(--hover-color)] text-md"
                onClick={() => setIsEditingPicture(true)}
              />
            </div>
          )}
        </div>
        {/* Profile Details */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-3 items-center">
            <h2 className="text-4xl font-extrabold">{community.name}</h2>
          </div>
          <h5 className="text-2xl font-bold">{community.title}</h5>
          <p className="text-md">{community.country}</p>
          <p className="text-lg font-bold">${community.pricePerHour}/hr</p>
          <div className="pointer-events-none">
            <StarRating
              size={20}
              defaultRating={community.rate}
              allowHalf={true}
            />
          </div>
          {community.isFull && (
            <p className="border-2 border-red-600 text-red-600 py-2 px-4 rounded-full max-w-fit">
              Community is Full
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-9 self-start items-center">
        {!community.isFull && !community.isMember && role !== "client" && (
          <SendRequestComponent
            communityId={community.id}
            communityName={community.name}
          />
        )}

        {community.isAdmin && (
          <div className="flex space-x-2">
            <EditButton onClick={() => setIsEditingHeader(true)} />

            {/* Settings navigation link */}
            <Link
              href={`/nx/freelancer/communities/${community.id}/settings/positions`}
              passHref
            >
              <button
                className="rounded-full p-1 w-10 aspect-square text-white bg-[var(--hover-color)] text-md flex items-center justify-center"
                aria-label="Settings"
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Profile Picture Edit Modal */}
      {isEditingPicture && (
        <CommunityProfilePhotoForm
          closeEdit={() => setIsEditingPicture(false)}
          communityId={community.id}
        />
      )}

      {isEditingHeader && (
        <HeaderForm
          community={{
            name: community.name,
            title: community.title,
            pricePerHour: community.pricePerHour,
            country: community.country,
            id: community.id,
          }}
          closeEdit={() => setIsEditingHeader(false)}
        />
      )}
    </div>
  );
}
