/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Profile from "@/app/_components/freelancerProfile/Profile";
import { getFreelancerbyID } from "@/app/_lib/FreelancerProfile/APi";
import { getfreelancerResponse } from "@/app/_types/ProfileTypes";
import { cookies } from "next/headers";
import React from "react";

let freelancer: getfreelancerResponse;
freelancer = {
  uuid: "string",
  coverPhoto: "string",
  profilePicture: "string",
  jobTitle: "Fullstack",
  name: "string",
  experienceLevel: "entry_level",
  username: "string",
  country: "string",
  pricePerHour: 0,
  rate: 5,
  skills: ["string"],
  avrgHoursPerWeek: 0,
  languages: ["Arabic"],
  educations: [
    {
      degree: "string",
      institution: "string",
      graduationYear: 0,
    },
  ],
  linkedIn: "string",
  description: "string",
  employeeHistory: [
    {
      company: "string",
      position: "string",
      startYear: "2025-02-20",
      endYear: "2025-02-20",
    },
  ],
};

export default async function page() {
  const token = (await cookies()).get("token")?.value;

  try {
    freelancer = await getFreelancerbyID("my_profile", token);
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      <ProtectedPage message="You are not allowed to do this action. Please log in" />;
    }
  }
  return <Profile freelancer={freelancer} editable={true} />;
}
