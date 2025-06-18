"use client";
import React from "react";

import ProfileHeader from "./ProfileHeader";
import { getClientProfileResponse } from "@/app/_types/ClientProfileTypes";

import ClientMetrics from "./ClientMetrics";
import AboutSection from "./ClientAbout";
import SkillsSection from "./Skills";
import WorkHistory from "./WorkDone";
import Container from "../common/Container";

interface ClientProfileProps {
  id: string;
  client: getClientProfileResponse;
  editable: boolean;
}

export default function ClientProfile({
  id,
  client,
  editable,
}: ClientProfileProps) {
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const pageSize = 10;

  const metrics = {
    totalSpent: client.totalSpent,
    completedJobs: client.completedJobs,
  };

  return (
    <Container className="grid grid-cols-[1fr_2fr] gap-6 items-start">
      <div className="flex flex-col gap-6">
        <ProfileHeader
          freelancer={{
            username: client.username,
            rate: client.rate,
            profilePicture: client.profilePicture,
            name: client.name,
            pricePerHour: 0,
            country: client.country,
          }}
          editable={editable}
        />
        <ClientMetrics metrics={metrics} />
      </div>
      <div className="flex flex-col gap-6 ">
        <AboutSection
          description={client.description}
          editable={editable}
        ></AboutSection>
        <SkillsSection skills={client.skills} editable={editable} />
        <WorkHistory id={client.uuid}></WorkHistory>

        {/* <Pagination
          currentPage={currentPage}
          totalCount={client.completedJobs}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          setPageParamter={true}
        /> */}
      </div>
    </Container>
  );
}
