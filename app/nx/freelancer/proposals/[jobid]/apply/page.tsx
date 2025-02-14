import JobApplication from "@/app/_components/Job/JobApplication";
import React from "react";

type Props = {
  params: {
    jobid: string;
  };
};

export default async function page({ params }: Props) {
  const { jobid } = await Promise.resolve(params);
  return <JobApplication jobid={jobid} />;
}
