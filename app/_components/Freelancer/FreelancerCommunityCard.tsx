import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface MyCommunity {
  communityId: string;
  name: string;
  profilePicture: string;
  communityTitle: string;
}

interface CommunityCardProps {
  community: MyCommunity;
  variant: "admin" | "member";
}

const MyCommunityCard: React.FC<CommunityCardProps> = ({
  community,
  variant,
}) => {
  const { communityId, name, profilePicture, communityTitle } = community;

  return (
    <div className="group relative bg-[var(--background-color)] border-solid border-t-[0.1rem] border-[var(--border-secondary)] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <Link
          href={`/nx/freelancer/communities/${communityId}`}
          className="flex flex-col items-center space-y-4"
        >
          {/* Profile Image */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto">
            <Image
              src={profilePicture || "/images/community-placeholder.jpg"}
              alt={`Profile image for ${name}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Community Details */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-600">{communityTitle}</p>
            <div className="flex justify-center space-x-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium 
                ${variant === 'admin' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'}"
              >
                {variant === "admin" ? "Admin" : "Member"}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyCommunityCard;
