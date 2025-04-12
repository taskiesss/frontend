/* eslint-disable @typescript-eslint/no-explicit-any */
// CommunitySettingsPageWrapper.tsx
import { cookies } from "next/headers";
import { getCommunityRolesAndPositions } from "@/app/_lib/CommunityProfile/settings";

import ProtectedPage from "@/app/_components/common/ProtectedPage";
import CommunitySettingsPage from "./CommunitySettingsPage";

type Props = { params: { id: string } };

export default async function CommunitySettingsPageWrapper({ params }: Props) {
  const { id } = await Promise.resolve(params);
  const token = (await cookies()).get("token")?.value;

  try {
    const rolesAndPositions = await getCommunityRolesAndPositions(id, token);

    return (
      <CommunitySettingsPage
        rolesAndPositions={rolesAndPositions}
        id={id}
        token={token!} // Add non-null assertion here
      />
    );
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      return <ProtectedPage message="You're not allowed to view this page" />;
    }
    throw new Error(error.message);
  }
}
