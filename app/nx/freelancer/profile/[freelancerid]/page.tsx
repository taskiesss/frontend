/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Spinner from "@/app/_components/common/Spinner";
import Profile from "@/app/_components/freelancerProfile/Profile";
import { getFreelancerbyID } from "@/app/_lib/FreelancerProfile/APi";
import { getfreelancerResponse } from "@/app/_types/ProfileTypes";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

type Props = { params: { freelancerid: string } };
let freelancer: getfreelancerResponse;

export default async function page({ params }: Props) {
  const { freelancerid } = await Promise.resolve(params);
  const token = (await cookies()).get("token")?.value;

  try {
    freelancer = await getFreelancerbyID(freelancerid, token);
    return (
      <Suspense fallback={<Spinner />}>
        <Profile id={freelancerid} freelancer={freelancer} editable={false} />
      </Suspense>
    );
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in" />
      );
    }
    throw new Error(error.messsage);
  }
}
