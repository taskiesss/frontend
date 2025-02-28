/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import { useState } from "react";
import CommunityCoverPhoto from "./CoverPhoto";
import CommunityHeader from "./ProfileHeader";

interface Props {
  editable: boolean;
  community: CommunityProfileResponse;
  id: string;
}

export default function Profile({ community, editable, id }: Props) {
  const [editSkillSection, setEditSkillSection] = useState(false);

  const [editLanguageSection, setEditLanguageSection] = useState(false);
  const [editEducationSection, setEditEducationSection] = useState(false);
  const [editAboutSection, setEditAboutSection] = useState(false);
  const [editPortfolioSection, setEditPortfolioSection] = useState(false);
  const [editLinksSection, setEditLinksSection] = useState(false);
  const [editHPWSection, setEditHPWSection] = useState(false);
  const [editEmpHisSection, setEditEmpHisSection] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <CommunityCoverPhoto
        community={{
          coverPhoto: community.coverPhoto,
          id,
        }}
        isAdmin={community.isAdmin}
      />
      <CommunityHeader
        community={{
          name: community.name,
          profilePicture: community.profilePicture,
          title: community.title,
          country: community.country,
          pricePerHour: community.pricePerHour,

          rate: community.rate,
          id,
          isMember: community.isMember,
          isAdmin: community.isAdmin,
          isFull: community.isFull,
        }}
      />
      {/* <div className="flex gap-5 w-9/12">
        <LeftPanel
          freelancer={{
            skills: freelancer.skills,
            languages: freelancer.languages,
            educations: freelancer.educations,
            hourPerWeek: freelancer.avrgHoursPerWeek,
            experienceLevel: freelancer.experienceLevel,
            links: freelancer.linkedIn,
          }}
          editable={editable}
          onEditLinks={() => setEditLinksSection(true)}
          onEditHPW={() => setEditHPWSection(true)}
          onEditLanguage={() => setEditLanguageSection(true)}
          onEditEducation={() => setEditEducationSection(true)}
          onEditSkill={() => setEditSkillSection(true)}
        />
        <RightPanel
          freelancer={{
            description: freelancer.description,
            employmentHistory: freelancer.employeeHistory,
          }}
          id={id}
          editable={editable}
          onEditAbout={() => setEditAboutSection(true)}
          onEditEmpHis={() => setEditEmpHisSection(true)}
          onEditPortfolio={() => setEditPortfolioSection(true)}
        />
      </div> */}

      {/* Modal for Editing a Section */}
      {/* ✅  */}
    </div>
  );
}
