"use client";

import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import { Suspense, useState } from "react";
import HorizontalCarousel from "./TeamMembers";
import CompletedJobslist from "./CompletedJobsList";
import Spinner from "../common/Spinner";
import EditButton from "../common/EditButton";
import SkillForm from "./Forms/SkillForm";
import AboutForm from "./Forms/AboutForm";
import Skill from "../common/Skill";

interface Props {
  role?: string;
  editable: boolean;
  community: CommunityProfileResponse;
  id: string;
  style: string;
}

export default function AboutCommunity({
  role,
  community,
  editable,
  id,
  style,
}: Props) {
  const [editSkillSection, setEditSkillSection] = useState(false);
  const [editAboutSection, setEditAboutSection] = useState(false);

  return (
    <>
      {/* Skills Section */}
      <div className={style}>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {community.skills.map((skill, index) => (
              <Skill index={index} skill={skill} key={index} />
            ))}
          </div>
        </div>

        {editSkillSection && (
          <SkillForm
            skills={community.skills}
            closeEdit={() => setEditSkillSection(false)}
            id={id}
          />
        )}

        {editable && (
          <div className="self-start">
            <EditButton onClick={() => setEditSkillSection(true)} />
          </div>
        )}
      </div>

      {/* About Section */}
      <div className={style}>
        <div className="flex flex-col gap-5 w-11/12">
          <h2 className="text-3xl font-bold">About</h2>
          <div className="flex gap-2 flex-wrap w-full">
            <p className="text-lg py-2 w-full whitespace-pre-wrap">
              {community.description}
            </p>
          </div>
        </div>

        {editAboutSection && (
          <AboutForm
            description={community.description}
            closeEdit={() => setEditAboutSection(false)}
            id={id}
          />
        )}
        {editable && (
          <div className="self-start">
            <EditButton onClick={() => setEditAboutSection(true)} />
          </div>
        )}
      </div>

      {/* Community Members */}
      {community?.communityMembers?.length && (
        <HorizontalCarousel items={community.communityMembers} role={role} />
      )}

      {/* Completed Jobs */}
      <div className={`${style} flex-col gap-9`}>
        <h2 className="text-3xl font-bold">Completed Jobs</h2>
        <div className="gap-2">
          <Suspense fallback={<Spinner />}>
            <CompletedJobslist id={id} role={role} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
