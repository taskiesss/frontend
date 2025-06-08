/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Spinner from "@/app/_components/common/Spinner";
import Profile from "@/app/_components/freelancerProfile/Profile";
import { getFreelancerbyID } from "@/app/_lib/FreelancerProfile/APi";
import { getfreelancerResponse } from "@/app/_types/ProfileTypes";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

let freelancer: getfreelancerResponse;

export default async function page() {
  const token = (await cookies()).get("token")?.value;

  try {
    freelancer = await getFreelancerbyID("my_profile", token);
    return (
      <Suspense fallback={<Spinner />}>
        <Profile id="my_profile" freelancer={freelancer} editable={true} />
      </Suspense>
    );
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      return (
        <Suspense fallback={<Spinner />}>
          <ProtectedPage message="You are not allowed to do this action. Please log in" />
        </Suspense>
      );
    }
    throw new Error(error.message);
  }
}
