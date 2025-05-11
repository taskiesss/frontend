"use client";
import React from "react";
import Skill from "../common/Skill";

interface SkillsSectionProps {
  skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="p-6 bg-[var(--foreground-color)] rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Preferred Skills</h2>
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
  );
}
