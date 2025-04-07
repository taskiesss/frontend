/* eslint-disable @typescript-eslint/no-explicit-any */
// CommunitySettingsPageWrapper.tsx
import { cookies } from "next/headers";
import { getCommunityRolesAndPositions } from "@/app/_lib/CommunityProfile/settings";

import ProtectedPage from "@/app/_components/common/ProtectedPage";
import CommunitySettingsPage from "./CommunitySettingsPage";

type Props = { params: { id: string } };

export default async function CommunitySettingsPageWrapper({ params }: Props) {
  const { id } = await Promise.resolve(params);

  // Fetch the token from cookies
  const token = (await cookies()).get("token")?.value;

  let rolesAndPositions;
  try {
    // Fetch roles and positions using the token
    rolesAndPositions = await getCommunityRolesAndPositions(id, token);

    console.log(rolesAndPositions);
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
    />
  );
}
