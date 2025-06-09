import React from "react";
import Skill from "../common/Skill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import EditButton from "../common/EditButton";
import { getExperienceLevel } from "@/app/_helpers/helper";

interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
}
interface LeftPanelProps {
  onEditSkill: () => void;
  onEditHPW: () => void;

  onEditLanguage: () => void;
  onEditEducation: () => void;
  onEditLinks: () => void;
  editable: boolean;
  freelancer: {
    skills: string[];
    languages: string[];
    educations: Education[];
    hourPerWeek: number;
    experienceLevel: string;
    links: string;
  };
}
export default function LeftPanel({
  freelancer,
  editable,
  onEditSkill,
  onEditHPW,
  onEditLanguage,
  onEditEducation,
  onEditLinks,
}: LeftPanelProps) {
  return (
    <div className="flex flex-col w-full lg:w-1/3 gap-5">
      {/* Skills Section */}
      <div className="flex justify-between bg-[var(--foreground-color)] rounded-2xl py-6 sm:py-8 px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:gap-5 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {freelancer.skills.map((skill, index) => (
              <Skill index={index} skill={skill} key={index} />
            ))}
          </div>
        </div>
        {editable && (
          <div className="self-start ml-4">
            <EditButton
              onClick={onEditSkill}
              className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
            />
          </div>
        )}
      </div>
      {/* Hours per week and Languages */}
      <div className="bg-[var(--foreground-color)] rounded-2xl flex flex-col gap-4 sm:gap-5 py-6 sm:py-8 px-4 sm:px-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Hours per week</h2>
            <span className="text-base sm:text-lg font-extralight">
              {freelancer.hourPerWeek} hr/week
            </span>
          </div>
          {editable && (
            <div className="self-start ml-4">
              <EditButton
                onClick={onEditHPW}
                className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Experience level</h2>
            <span className="text-base sm:text-lg font-extralight">
              {getExperienceLevel(freelancer.experienceLevel)}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold">Languages</h2>
            <ul className="list-disc list-inside flex flex-wrap gap-x-4 sm:gap-x-10 gap-y-2">
              {freelancer.languages.map((l, i) => (
                <li className="text-base sm:text-lg font-extralight" key={i}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          {editable && (
            <div className="self-start ml-4">
              <EditButton
                onClick={onEditLanguage}
                className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
              />
            </div>
          )}
        </div>
      </div>
      {/* Education Section */}
      <div className="flex justify-between bg-[var(--foreground-color)] rounded-2xl py-6 sm:py-8 px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:gap-5 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">Educations</h2>
          <ul className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-5">
            {freelancer.educations.map((edu, i) => (
              <li className="text-sm sm:text-md font-extralight" key={i}>
                {`${edu.institution.toUpperCase()} - ${edu.degree} - ${
                  edu.graduationYear
                }`}
              </li>
            ))}
          </ul>
        </div>
        {editable && (
          <div className="self-start ml-4">
            <EditButton
              onClick={onEditEducation}
              className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
            />
          </div>
        )}
      </div>
      {/* Linked Accounts Section */}
      <div className="flex justify-between bg-[var(--foreground-color)] rounded-2xl py-6 sm:py-8 px-4 sm:px-6">
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">Linked Account</h2>
          <ul className="flex flex-wrap gap-x-4 sm:gap-x-10 gap-y-3 sm:gap-y-5">
            <li className="flex items-center gap-2">
              {freelancer.links ? (
                <Link
                  href={freelancer.links}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg hover:underline"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="2x"
                    className="text-blue-600 sm:text-3x"
                  />
                </Link>
              ) : (
                <span className="text-sm sm:text-md font-extralight">
                  You don&apos;t have linked account
                </span>
              )}
            </li>
            {/* Add more linked accounts if needed */}
          </ul>
        </div>
        {editable && (
          <div className="self-start ml-4">
            <EditButton
              onClick={onEditLinks}
              className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  );
}
