import React from "react";

type Props = { skill: string; index: number };

export default function Skill({ index, skill }: Props) {
  return (
    <span
      key={index}
      className="bg-[var(--bg-skill)] rounded-2xl py-1 px-2 text-base whitespace-nowrap"
    >
      {skill}
    </span>
  );
}
