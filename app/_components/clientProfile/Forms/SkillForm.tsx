/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useEffect, useState } from "react";
import Model from "../../freelancerProfile/Model";
import SkillsSearchInput from "../../common/SkillsSearchInput";
import Cookies from "js-cookie";
import ProtectedPage from "../../common/ProtectedPage";
import { ProfileSkillApi } from "@/app/_lib/Client/Profile";
import { toast, ToastContainer } from "react-toastify";

export default function SkillForm({
  skills,
  closeEdit,
}: {
  closeEdit: any;
  skills: string[];
}) {
  const [selectedSkills, setSelectedSkills] = useState(skills);
  const [isForbidden, setIsForbidden] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

  const handleSelectSkill = (skill: string) => {
    // Avoid duplicate skills
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // New: Remove a selected skill
  const handleRemoveSkill = (skill: string, index: number) => {
    setSelectedSkills((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(selectedSkills);
      const token = Cookies.get("token");
      const res = await ProfileSkillApi(token, selectedSkills);
      console.log(res);
      closeEdit();
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
        return;
      }
      setErrorMsg(error.message);
    }
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Model className="" isOpen={true} onClose={closeEdit}>
        <h2 className="text-2xl font-bold">Edit Skills</h2>
        {/* Put your form for editing the section here */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-6 pt-5 flex-wrap"
        >
          <div className="w-[30rem]">
            <SkillsSearchInput
              className="py-4 border border-solid border-gray-600 rounded-lg"
              selectedSkills={selectedSkills}
              onSelectSkill={handleSelectSkill}
              onRemoveSkill={handleRemoveSkill}
            />
          </div>
          <div className="self-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--btn-color)]  rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </Model>
    </>
  );
}
