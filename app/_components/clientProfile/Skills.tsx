"use client";
import React, { useState } from "react";
import Skill from "../common/Skill";
import SkillForm from "./Forms/SkillForm";
import EditButton from "../common/EditButton";

interface SkillsSectionProps {
  skills: string[];
  editable: boolean;
}

export default function SkillsSection({
  skills,
  editable,
}: SkillsSectionProps) {
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  return (
    <>
      <div className="p-6 bg-[var(--foreground-color)] rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Preferred Skills</h2>
          {editable && (
            <div className="  rounded-full z-50">
              <EditButton
                className="rounded-full p-1 sm:p-2 w-8 sm:w-10 aspect-square text-white bg-[var(--hover-color)] hover:bg-opacity-80 transition-all"
                onClick={() => setIsEditingSkills(true)}
              />
            </div>
          )}
        </div>
        {skills.length === 0 ? (
          <p>No skills listed.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Skill key={index} skill={skill} index={index} />
            ))}
          </div>
        )}
      </div>
      {isEditingSkills && (
        <SkillForm
          skills={skills}
          closeEdit={() => setIsEditingSkills(false)}
        />
      )}
    </>
  );
}
