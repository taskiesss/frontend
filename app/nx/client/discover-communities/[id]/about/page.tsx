/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import { getCommunityProfile } from "@/app/_lib/CommunityProfile/APi";
import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import { cookies } from "next/headers";
import Profile from "@/app/_components/communityProfile/Profile";
import AboutCommunity from "@/app/_components/communityProfile/AboutCommunity";

type Props = { params: { id: string } };

export default async function AboutPage({ params }: Props) {
  const { id } = await Promise.resolve(params);
  const token = (await cookies()).get("token")?.value;
  const communityId = id || "my_community";

  try {
    const communityData: CommunityProfileResponse = await getCommunityProfile(
      id,
      token
    );

    const style =
      "flex w-9/12 justify-between bg-[var(--foreground-color)] rounded-2xl py-8 px-6";

    return (
      <Profile
        role="client"
        id={communityId}
        community={communityData}
        editable={communityData.isAdmin}
      >
        <AboutCommunity
          role="client"
          community={communityData}
          editable={communityData.isAdmin}
          id={communityId}
          style={style}
        />
      </Profile>
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
