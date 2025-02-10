"use client";
import React, { useState } from "react";
import Container from "../_components/common/Container";
import Button from "../_components/common/button";
import SkillsSearchInput from "../_components/common/SkillsSearchInput";
import { submitFreelancerForm } from "../_lib/Freelancer/FreelancerForm";

type Props = { params: string };

export default function Page({}: Props) {
  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Professional Information
  const [expectedHourlyRate, setExpectedHourlyRate] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [languagesSpoken, setLanguagesSpoken] = useState("");
  const [averageWorkHours, setAverageWorkHours] = useState(0);
  const [professionalTitle, setProfessionalTitle] = useState("");

  // Education
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState(0);

  const handleSelectSkill = (skill: string) => {
    // Avoid duplicate skills
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      expectedHourlyRate,
      selectedSkills,
      languagesSpoken,
      averageWorkHours,
      professionalTitle,
      degree,
      institution,
      graduationYear,
    };
    console.log("Form submitted: ", formData);
    // Place your submission logic here (e.g., server action call)
  };

  return (
    <Container className="flex flex-col items-center py-20">
      <Container className="border-solid border-2 rounded-lg border-gray-600 w-11/12 flex flex-col gap-10 items-center">
        {/* Header */}
        <h1 className="text-6xl text-center pt-12">Freelancer Profile</h1>
        <span className="text-2xl text-center text-slate-500">
          Complete your profile to start freelancing
        </span>

        <form
          onSubmit={handleSubmit}
          className="w-11/12 flex flex-col py-10 gap-10"
        >
          {/* Personal Information */}
          <div className="flex flex-col gap-2 border-t-2 border-solid border-[var(--border-color)] w-full">
            <span className="text-2xl py-6 text-[var(--accent-color)]">
              Personal Information
            </span>
            <div className="flex justify-between gap-10">
              <div className="flex flex-col gap-3 w-full">
                <span className="text-lg">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <span className="text-lg">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="flex flex-col gap-2 border-t-2 border-solid border-[var(--border-color)] w-full">
            <span className="text-2xl py-6 text-[var(--accent-color)]">
              Professional Information
            </span>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-lg">Expected Hourly Rate ($)</span>
                <input
                  type="number"
                  min="1"
                  value={expectedHourlyRate}
                  onChange={(e) =>
                    setExpectedHourlyRate(Math.max(Number(e.target.value), 1))
                  }
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Skills</span>
                <SkillsSearchInput
                  selectedSkills={selectedSkills}
                  onSelectSkill={handleSelectSkill}
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Languages Spoken</span>
                <input
                  type="text"
                  value={languagesSpoken}
                  onChange={(e) => setLanguagesSpoken(e.target.value)}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Average Work Hours/Week</span>
                <input
                  type="number"
                  min="1"
                  value={averageWorkHours}
                  onChange={(e) =>
                    setAverageWorkHours(Math.max(Number(e.target.value), 1))
                  }
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Professional Title</span>
                <input
                  type="text"
                  value={professionalTitle}
                  onChange={(e) => setProfessionalTitle(e.target.value)}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col border-t-2 border-solid border-[var(--border-color)] gap-2 w-full">
            <span className="text-2xl py-6 text-[var(--accent-color)]">
              Education
            </span>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-lg">Degree</span>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Institution</span>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Graduation Year</span>
                <input
                  type="number"
                  min="1"
                  value={graduationYear}
                  onChange={(e) =>
                    setGraduationYear(Math.max(Number(e.target.value), 1))
                  }
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="text-2xl" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );
}
