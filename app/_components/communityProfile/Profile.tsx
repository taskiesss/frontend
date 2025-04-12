/* eslint-disable @typescript-eslint/no-unused-vars */

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
          experienceLevel: community.experienceLevel,
          avgHoursPerWeek: community.avgHoursPerWeek,
          rate: community.rate,
          id,
          isMember: community.isMember,
          isAdmin: community.isAdmin,
          isFull: community.isFull,
        }}
      />

      {/* Navigation Section */}

      {role !== "client" && community.isMember && (
        <div className="w-9/12">
          <CommunityNav isMember={community.isMember} />
        </div>
      )}

      {children}
    </div>
  );
}
