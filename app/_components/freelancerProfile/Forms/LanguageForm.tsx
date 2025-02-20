/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import Model from "../Model";
import Select, { MultiValue, ActionMeta } from "react-select";
import LanguagesData from "@/app/_data/languages.json";
import ProtectedPage from "../../common/ProtectedPage";
import Cookies from "js-cookie";
import { LanguagesAction } from "@/app/_lib/FreelancerProfile/APi";

interface Option {
  value: string;
  label: string;
}

export default function LanguageForm({
  currentLanguages,
  closeEdit,
}: {
  closeEdit: any;
  currentLanguages: string[];
}) {
  // We'll store only the selected labels as strings
  const [selectedLanguageLabels, setSelectedLanguageLabels] =
    useState<string[]>(currentLanguages);
  const [isForbidden, setIsForbidden] = useState(false);
  // Convert the languages object into an array of options.
  const options: Option[] = Object.entries(LanguagesData).map(
    ([code, name]) => ({
      value: code,
      label: name,
    })
  );

  const handleChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    // Extract just the labels from the selected options
    setSelectedLanguageLabels(newValue.map((option) => option.label));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Final selected labels:", selectedLanguageLabels);
    try {
      const token = Cookies.get("token");
      const res = await LanguagesAction(selectedLanguageLabels, token);
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
      console.error(error.message);
    }
  };
  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );

  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">Edit Language</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-[35rem] flex-wrap"
      >
        <div className="w-full">
          <Select
            isMulti
            // The value is computed from the state: only options whose labels are in the state are selected.
            value={options.filter((opt) =>
              selectedLanguageLabels.includes(opt.label)
            )}
            options={options}
            onChange={handleChange}
            placeholder="Select languages..."
            className="w-full text-black"
            classNamePrefix="react-select"
          />
        </div>
        <div className="self-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </Model>
  );
}
