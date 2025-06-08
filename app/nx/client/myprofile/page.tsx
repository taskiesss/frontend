/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientProfile from "@/app/_components/clientProfile/ClientProfile";
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Spinner from "@/app/_components/common/Spinner";
import { getClientById } from "@/app/_lib/Client/Profile";
import { getClientProfileResponse } from "@/app/_types/ClientProfileTypes";

import { cookies } from "next/headers";
import React, { Suspense } from "react";

let clientProfile: getClientProfileResponse;

export default async function ClientProfilePage() {
  const token = (await cookies()).get("token")?.value;

  try {
    clientProfile = await getClientById("my-profile", token);

    return (
      <ClientProfile id="my_profile" client={clientProfile} editable={true} />
    );
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      return (
        <Suspense fallback={<Spinner />}>
          <ProtectedPage message="You are not allowed to view this profile. Please log in" />
        </Suspense>
      );
    }

    throw new Error(error.message);
  }
}
