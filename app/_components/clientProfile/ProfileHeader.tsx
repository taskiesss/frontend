"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StarRating from "../common/StarRating";
import EditButton from "../common/EditButton";
import ProfilePhotoForm from "./Forms/ProfilePhotoForm";

interface ProfileHeaderProps {
  freelancer: {
    username: string;
    rate: number;
    profilePicture: string;
    name: string;
    pricePerHour: number;
    country: string;
  };
  editable: boolean;
}

export default function ProfileHeader({
  freelancer,
  editable,
}: ProfileHeaderProps) {
  // Get the user's device time zone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // State to hold the current time
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: userTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  // Update the time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: userTimeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 60000); // Update every 60 seconds (1 minute)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [userTimeZone]); // Re-run if userTimeZone changes

  return (
    <div className="relative bg-[var(--foreground-color)] rounded-lg shadow p-6 flex items-center">
      <div className="relative w-24 aspect-square rounded-full ">
        <Image
          src={freelancer.profilePicture}
          alt={`${freelancer.name}'s profile`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full object-cover"
        />
        {editable && (
          <div className="absolute bottom-1 right-1 sm:bottom-1 sm:right-1 rounded-full z-50">
            <EditButton
              className="rounded-full p-1 sm:p-2 w-8 sm:w-10 aspect-square text-white bg-[var(--hover-color)] hover:bg-opacity-80 transition-all"
              onClick={() => setIsEditingPicture(true)}
            />
          </div>
        )}
      </div>
      <div className="ml-6">
        <h1 className="text-2xl font-bold">{freelancer.name}</h1>
        <div className="pointer-events-none flex items-center mt-2">
          <StarRating
            maxRating={5}
            defaultRating={freelancer.rate}
            size={15}
            color="#fbd500e0"
            allowHalf={true}
          />
        </div>
        <p className="text-green-600 mt-2">✔ Payment method verified</p>
      </div>
      {/* {editable && (
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )} */}
      {/* Profile Picture Edit Modal */}
      {isEditingPicture && (
        <ProfilePhotoForm closeEdit={() => setIsEditingPicture(false)} />
      )}
    </div>
  );
}
