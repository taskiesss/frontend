"use client";
import React, { useState } from "react";
import EditButton from "../common/EditButton";
import AboutForm from "./Forms/AboutForm";

interface AboutSectionProps {
  description: string;
  editable: boolean;
}

export default function AboutSection({
  description,
  editable,
}: AboutSectionProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  return (
    <>
      <div className="p-6 bg-[var(--foreground-color)] rounded-lg shadow-md ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">About</h2>
          {editable && (
            <div className="  rounded-full ">
              <EditButton
                className="rounded-full p-1 sm:p-2 w-8 sm:w-10 aspect-square text-white bg-[var(--hover-color)] hover:bg-opacity-80 transition-all"
                onClick={() => setIsEditingDescription(true)}
              />
            </div>
          )}
        </div>
        <p>{description}</p>
      </div>
      {isEditingDescription && (
        <AboutForm
          closeEdit={() => setIsEditingDescription(false)}
          description={description}
        />
      )}
    </>
  );
}
