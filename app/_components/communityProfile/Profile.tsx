/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import { ReactNode } from "react";
import CommunityCoverPhoto from "./CoverPhoto";
import CommunityHeader from "./ProfileHeader";

import CommunityNav from "./CommunityNav";
import AboutCommunity from "./AboutCommunity";

interface Props {
  role?: string;
  editable: boolean;
  community: CommunityProfileResponse;
  id: string;
  children?: ReactNode;
}

// const items = [
//   {
//     src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Andrew Gamal",
//     name: "Andrew Gamal",
//     position: "Frontend Developer",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Jane Smith",
//     name: "Jane Smith",
//     position: "Backend Engineer",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "John Doe",
//     name: "John Doe",
//     position: "UI/UX Designer",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Sarah Johnson",
//     name: "Sarah Johnson",
//     position: "Full Stack Developer",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Michael Brown",
//     name: "Michael Brown",
//     position: "Data Scientist",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "David Wilson",
//     name: "David Wilson",
//     position: "DevOps Engineer",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Emma Taylor",
//     name: "Emma Taylor",
//     position: "Product Manager",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Alex Martinez",
//     name: "Alex Martinez",
//     position: "Mobile Developer",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Olivia Lee",
//     name: "Olivia Lee",
//     position: "UX Researcher",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     alt: "Ryan Thompson",
//     name: "Ryan Thompson",
//     position: "QA Engineer",
//   },
// ];
export default function Profile({
  community,
  editable,
  id,
  children,
  role,
}: Props) {
  console.log(community);

  const style =
    "flex w-9/12 justify-between bg-[var(--foreground-color)] rounded-2xl py-8 px-6";

  return (
    <div className="flex flex-col items-center gap-6">
      <CommunityCoverPhoto
        community={{
          coverPhoto: community.coverPhoto,
          id,
        }}
        isAdmin={community.isAdmin}
      />
      <CommunityHeader
        role={role}
        community={{
          name: community.name,
          profilePicture: community.profilePicture,
          title: community.title,
          country: community.country,
          pricePerHour: community.pricePerHour,

          rate: community.rate,
          id,
          isMember: community.isMember,
          isAdmin: community.isAdmin,
          isFull: community.isFull,
        }}
      />

      {/* Navigation Section */}

      {role !== "client" && <CommunityNav isMember={community.isMember} />}

      {children}
    </div>
  );
}
