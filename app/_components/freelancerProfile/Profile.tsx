"use client";
// components/ProfileCover.tsx
import { useState } from "react";
import CoverPhoto from "./CoverPhoto";
import LeftPanel from "./LeftPanel";
import ProfileHeader from "./ProfileHeader";
import RightPanel from "./RightPanel";

import SkillForm from "./Forms/SkillForm";
import AboutForm from "./Forms/AboutForm";
import EducationForm from "./Forms/EducationForm";
import EmpHisForm from "./Forms/EmpHisForm";

import HPWForm from "./Forms/HPWForm";
import LanguageForm from "./Forms/LanguageForm";
import LinksForm from "./Forms/LinksForm";
import PortfolioForm from "./Forms/PortfolioForm";
import HeaderForm from "./Forms/HeaderForm";
import { getfreelancerResponse } from "@/app/_types/ProfileTypes";

const skills = ["Spring Boot", "Java", "Python"];

interface Props {
  editable: boolean;
  freelancer: getfreelancerResponse;
}

export default function Profile({ freelancer, editable }: Props) {
  const [editSkillSection, setEditSkillSection] = useState(false);
  const [editHeaderSection, setEditHeaderSection] = useState(false);
  const [editLanguageSection, setEditLanguageSection] = useState(false);

  const [editEducationSection, setEditEducationSection] = useState(false);
  const [editAboutSection, setEditAboutSection] = useState(false);
  const [editPortfolioSection, setEditPortfolioSection] = useState(false);
  const [editLinksSection, setEditLinksSection] = useState(false);
  const [editHPWSection, setEditHPWSection] = useState(false);
  const [editEmpHisSection, setEditEmpHisSection] = useState(false);

  return (
    <div className="relative flex flex-col items-center gap-6">
      <CoverPhoto
        editable={editable}
        freelancer={{ coverPhoto: freelancer.coverPhoto }}
      />
      <ProfileHeader
        freelancer={{
          username: freelancer.username,
          rate: freelancer.rate,
          profilePicture: freelancer.profilePicture,
          name: freelancer.name,
          jobTitle: freelancer.jobTitle,
          pricePerHour: freelancer.pricePerHour,
          Country: freelancer.country,
        }}
        editable={editable}
        onEditHeader={() => setEditHeaderSection(true)}
      />
      <div className="flex gap-5 w-9/12">
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
          editable={editable}
          onEditAbout={() => setEditAboutSection(true)}
          onEditEmpHis={() => setEditEmpHisSection(true)}
          onEditPortfolio={() => setEditPortfolioSection(true)}
        />
      </div>

      {/* Modal for Editing a Section */}
      {/* ✅  */}
      {editSkillSection && (
        <SkillForm
          skills={skills}
          closeEdit={() => setEditSkillSection(false)}
        />
      )}
      {editHeaderSection && (
        <HeaderForm
          freelancer={{
            name: freelancer.name,
            jobTitle: freelancer.jobTitle,
            pricePerHour: freelancer.pricePerHour,
            country: freelancer.country,
          }}
          closeEdit={() => setEditHeaderSection(false)}
        />
      )}
      {/* ✅  */}
      {editAboutSection && (
        <AboutForm
          description="hello there"
          closeEdit={() => setEditAboutSection(false)}
        />
      )}
      {/* ✅  */}
      {editEducationSection && (
        <EducationForm
          currentEducations={freelancer.educations}
          closeEdit={() => setEditEducationSection(false)}
        />
      )}
      {/* ✅  */}
      {editEmpHisSection && (
        <EmpHisForm
          currentHistory={freelancer.employeeHistory}
          closeEdit={() => setEditEmpHisSection(false)}
        />
      )}

      {/* ✅  */}
      {editHPWSection && (
        <HPWForm
          currentHPW={freelancer.avrgHoursPerWeek}
          closeEdit={() => setEditHPWSection(false)}
        />
      )}
      {/* ✅  */}
      {editLanguageSection && (
        <LanguageForm
          currentLanguages={freelancer.languages}
          closeEdit={() => setEditLanguageSection(false)}
        />
      )}
      {/* ✅  */}
      {editLinksSection && (
        <LinksForm
          currentLink={freelancer.linkedIn}
          closeEdit={() => setEditLinksSection(false)}
        />
      )}
      {editPortfolioSection && (
        <PortfolioForm closeEdit={() => setEditPortfolioSection(false)} />
      )}
    </div>
  );
}
