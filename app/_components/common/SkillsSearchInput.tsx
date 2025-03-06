"use client";
import React, { useEffect, useState, KeyboardEvent } from "react";
import { fetchSuggestionsServer } from "@/app/_actions/skillsActions";
import Skill from "./Skill";

type SkillsSearchInputProps = {
  className?: string;
  selectedSkills: string[];
  onSelectSkill: (skill: string) => void;
  // Optional callback to remove a skill. If not provided, the remove button won’t appear.
  onRemoveSkill?: (skill: string, index: number) => void;
};

export default function SkillsSearchInput({
  className = "",
  selectedSkills,
  onSelectSkill,
  onRemoveSkill,
}: SkillsSearchInputProps) {
  const [skillsSearch, setSkillsSearch] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Fetch suggestions when the input changes (debounced)
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

  // Reset active suggestion when suggestions change
  useEffect(() => {
    setActiveSuggestionIndex(-1);
  }, [skillSuggestions]);

  const handleSelectSkill = (skill: string) => {
    onSelectSkill(skill);
    setSkillsSearch("");
    setSkillSuggestions([]);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (skillSuggestions.length > 0) {
        setActiveSuggestionIndex((prevIndex) => {
          let nextIndex = prevIndex + 1;
          if (nextIndex >= skillSuggestions.length) {
            nextIndex = 0;
          }
          return nextIndex;
        });
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (skillSuggestions.length > 0) {
        setActiveSuggestionIndex((prevIndex) => {
          let nextIndex = prevIndex - 1;
          if (nextIndex < 0) {
            nextIndex = skillSuggestions.length - 1;
          }
          return nextIndex;
        });
      }
    } else if (e.key === "Enter") {
      if (
        activeSuggestionIndex >= 0 &&
        activeSuggestionIndex < skillSuggestions.length
      ) {
        e.preventDefault();
        handleSelectSkill(skillSuggestions[activeSuggestionIndex]);
      }
    }
  };

  return (
    <div className="z-20">
      <div className="relative">
        <input
          type="text"
          placeholder="ex: JavaScript, Python,..."
          value={skillsSearch}
          onChange={(e) => setSkillsSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className={`w-full px-3 py-2 border-solid border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 bg-[var(--background-color)] ${className}`}
        />
        {isLoadingSuggestions && (
          <div className="mt-2 text-sm text-gray-500">Loading...</div>
        )}
        {/* Only show suggestions if the input has focus, enough characters and suggestions exist */}
        {skillSuggestions.length > 0 &&
          skillsSearch.length > 2 &&
          isInputFocused && (
            <ul className="absolute left-0 right-0 bg-[var(--background-color)] border border-gray-300 mt-1 rounded shadow z-20">
              {skillSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer ${
                    index === activeSuggestionIndex
                      ? "bg-[var(--hover-color)]"
                      : "hover:bg-[var(--hover-color)]"
                  }`}
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
      <div className="flex flex-wrap gap-2 mt-3 ">
        {selectedSkills.map((skill, index) => (
          <Skill
            key={index}
            index={index}
            skill={skill}
            // Only pass onRemove if onRemoveSkill is provided
            onRemove={
              onRemoveSkill ? () => onRemoveSkill(skill, index) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
