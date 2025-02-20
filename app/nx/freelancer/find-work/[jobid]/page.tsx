/* eslint-disable @typescript-eslint/no-explicit-any */

import ProtectedPage from "@/app/_components/common/ProtectedPage";
import { getJobDetails } from "@/app/_lib/jobs/JobsSearch";
import { cookies } from "next/headers";
import JobDetailsPage from "./JobDetailsPage";

type Props = { params: { jobid: string } };

interface jobResponse {
  projectTitle: string;
  postedAt: string;
  projectDescription: string;
  projectLength: string;
  experienceLevel: string;
  pricePerHour: string;
  skills: string[];
  client: {
    completedJobs: number;
    totalSpent: string;
    rate: number;
  };
}

export default async function page({ params }: Props) {
  const { jobid } = await Promise.resolve(params);

  let job: jobResponse;
  const token = (await cookies()).get("token")?.value;
  // API to get job details here
  try {
    const res = await getJobDetails(token, jobid);
    // console.log(res);
    job = res;
    return <JobDetailsPage jobdetails={job} jobid={jobid} />;
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
