/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";

type Props = {
  jobid: string;
};

export default function JobApplication({ jobid }: Props) {
  const [localCandidateId, setLocalCandidateId] = useState<string | null>(null);

  useEffect(() => {
    // Get candidateId from localStorage when the component mounts
    const storedCandidateId = localStorage.getItem("candidateId");
    setLocalCandidateId(storedCandidateId);
  }, []);
  return <div>JobApplication</div>;
}
