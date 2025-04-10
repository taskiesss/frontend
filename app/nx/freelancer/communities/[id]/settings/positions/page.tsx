/* eslint-disable @typescript-eslint/no-explicit-any */
// CommunitySettingsPageWrapper.tsx
import { cookies } from "next/headers";
import { getCommunityRolesAndPositions } from "@/app/_lib/CommunityProfile/settings";

import ProtectedPage from "@/app/_components/common/ProtectedPage";
import CommunitySettingsPage from "./CommunitySettingsPage";
import { getFreelancerbyID } from "@/app/_lib/FreelancerProfile/APi";

type Props = { params: { id: string } };

export default async function CommunitySettingsPageWrapper({ params }: Props) {
  const { id } = await Promise.resolve(params);

  // Fetch the token from cookies
  const token = (await cookies()).get("token")?.value;

  let rolesAndPositions;
  let userId;
  try {
    // Fetch roles and positions using the token
    rolesAndPositions = await getCommunityRolesAndPositions(id, token);
    const freelancer = await getFreelancerbyID("my_profile", token);
    console.log(freelancer);
    userId = freelancer.uuid;
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      return <ProtectedPage message="You're not allowed to view this page" />;
    }
    throw new Error(error.message);
  }

  return (
    <CommunitySettingsPage
      rolesAndPositions={rolesAndPositions}
      id={id}
      token={token}
      userId={userId}
    />
  );
}
