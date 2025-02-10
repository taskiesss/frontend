"use client";
import React, { useState, useEffect } from "react";
import { fetchSuggestionsServer } from "@/app/_actions/skillsActions";
import Skill from "./Skill";

type SkillsSearchInputProps = {
  className?: string;
  selectedSkills: string[];
  onSelectSkill: (skill: string) => void;
};

export default function SkillsSearchInput({
  className = "",
  selectedSkills,
  onSelectSkill,
}: SkillsSearchInputProps) {
  const [skillsSearch, setSkillsSearch] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Fetch suggestions when the input changes (debounced by 300ms)
  useEffect(() => {
    if (skillsSearch.trim() === "") {
      setSkillSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoadingSuggestions(true);
      fetchSuggestionsServer(skillsSearch)
        .then((suggestions) => {
          setSkillSuggestions(suggestions);
          setIsLoadingSuggestions(false);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setIsLoadingSuggestions(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [skillsSearch]);

  const handleSelectSkill = (skill: string) => {
    onSelectSkill(skill);
    setSkillsSearch("");
    setSkillSuggestions([]);
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="ex: JavaScript, Python,..."
          value={skillsSearch}
          onChange={(e) => setSkillsSearch(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className={`w-full px-3 py-2 border-solid border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 ${className}`}
        />
        {isLoadingSuggestions && (
          <div className="mt-2 text-sm text-gray-500">Loading...</div>
        )}
        {/* Only show suggestions if the input has focus */}
        {skillSuggestions.length > 0 &&
          skillsSearch.length > 2 &&
          isInputFocused && (
            <ul className="absolute left-0 right-0 bg-[var(--background-color)] border border-gray-300 mt-1 rounded shadow">
              {skillSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-[var(--hover-color)] cursor-pointer"
                  // Prevent the input from losing focus when clicking a suggestion
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelectSkill(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedSkills.map((skill, index) => (
          <Skill key={index} index={index} skill={skill} />
        ))}
      </div>
    </div>
  );
}
