import MyCommunityCard, { MyCommunity } from "./FreelancerCommunityCard";
import React from "react";

interface MyCommunityListProps {
  adminCommunities: MyCommunity[];
  memberCommunities: MyCommunity[];
}

const MyCommunityList: React.FC<MyCommunityListProps> = ({
  adminCommunities,
  memberCommunities,
}) => {
  return (
    <div className="w-full flex flex-col gap-12">
      {/* Admin Communities Section */}
      {!!adminCommunities.length && (
        <section>
          <h2 className="text-3xl font-bold mb-6">Administered Communities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminCommunities.map((community) => (
              <MyCommunityCard
                key={community.communityId}
                community={community}
                variant="admin"
              />
            ))}
          </div>
        </section>
      )}

      {/* Member Communities Section */}
      {!!memberCommunities.length && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Member Communities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberCommunities.map((community) => (
              <MyCommunityCard
                key={community.communityId}
                community={community}
                variant="member"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyCommunityList;
