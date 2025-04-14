/* eslint-disable @typescript-eslint/no-explicit-any */
import Profile from "@/app/_components/communityProfile/Profile";
import React from "react";
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import { getCommunityProfile } from "@/app/_lib/CommunityProfile/APi";
import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import { cookies } from "next/headers";
import PostList from "@/app/_components/communityProfile/posts/PostList";
import PostsForm from "@/app/_components/communityProfile/posts/PostsForm";

type Props = { params: { id: string } };

async function page({ params }: Props) {
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
      >
        <PostsForm communityId={communityId} />
        <PostList />
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
    throw new Error("Error loading community profile:", error);
  }
}

export default page;
