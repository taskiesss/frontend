/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import { getCommunityProfile } from "@/app/_lib/CommunityProfile/APi";
import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import { cookies } from "next/headers";

import Profile from "@/app/_components/communityProfile/Profile";

type Props = { params: { id: string } };

const defaultCommunity: CommunityProfileResponse = {
  profilePicture: "",
  coverPhoto: "",
  title: "Community Title",
  name: "Community Name",
  country: "",
  pricePerHour: 0,
  rate: 4.5,
  skills: [],
  description: "",
  members: [],
  isFull: false,
  isMember: false,
  isAdmin: false,
};

export default async function Page({ params }: Props) {
  const { id } = await Promise.resolve(params);
  const token = (await cookies()).get("token")?.value;
  const communityId = id || "my_community";

  try {
    const communityData: CommunityProfileResponse = await getCommunityProfile(
      id,
      token
    );

    return (
      <Profile
        id={communityId}
        community={communityData}
        editable={communityData.isAdmin}
      />
    );
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      return (
        <ProtectedPage message="You must be a member to view this community profile" />
      );
    }
    console.error("Error loading community profile:", error);
    return <div>Error loading community profile</div>;
  }
}
