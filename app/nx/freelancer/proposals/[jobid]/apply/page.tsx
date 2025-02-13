import JobApplication from "@/app/_components/Job/JobApplication";
import React from "react";

type Props = {
  params: {
    jobid: string;
  };
};

export default function page({ params }: Props) {
  return <JobApplication jobid={params.jobid} />;
}
