import React from "react";

type Props = { skill: string; index: number; onRemove?: () => void };

export default function Skill({ index, skill, onRemove }: Props) {
  return (
    <div className="flex gap-2 justify-center items-center bg-[var(--bg-skill)] rounded-2xl py-2 px-3 whitespace-nowrap text-md ">
      <span key={index}>{skill}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-red-500 text-lg transition-transform duration-200 hover:scale-110"
          type="button"
        >
          ✖
        </button>
      )}
    </div>
  );
}
