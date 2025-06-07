/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState, useMemo, useEffect } from "react";
import Model from "../Model";
import Select, { MultiValue, ActionMeta } from "react-select";
import LanguagesData from "@/app/_data/languages.json";
import ProtectedPage from "../../common/ProtectedPage";
import Cookies from "js-cookie";
import { LanguagesAction } from "@/app/_lib/FreelancerProfile/APi";
import { toast, ToastContainer } from "react-toastify";

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
  // Normalize currentLanguages to match LanguagesData (capitalize first letter)
  const normalizedCurrentLanguages = useMemo(
    () =>
      currentLanguages.map(
        (lang) => lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
      ),
    [currentLanguages]
  );

  // Initialize with normalized currentLanguages
  const [selectedLanguageLabels, setSelectedLanguageLabels] = useState<
    string[]
  >(normalizedCurrentLanguages);
  const [isForbidden, setIsForbidden] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Memoize options
  const options: Option[] = useMemo(
    () =>
      Object.entries(LanguagesData).map(([code, name]) => ({
        value: code,
        label: name,
      })),
    []
  );

  // Memoize default value with case-insensitive matching
  const defaultValue = useMemo(
    () =>
      options.filter((opt) =>
        normalizedCurrentLanguages.some(
          (lang) => lang.toLowerCase() === opt.label.toLowerCase()
        )
      ),
    [options, normalizedCurrentLanguages]
  );

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

  const handleChange = (newValue: MultiValue<Option>) => {
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
      setErrorMsg(error.message);
    }
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  }

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Model isOpen={true} onClose={closeEdit}>
        <h2 className="text-2xl font-bold mb-4">Edit Language</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-[35rem] flex-wrap"
        >
          <div className="w-full">
            <Select
              isMulti
              value={options.filter((opt) =>
                selectedLanguageLabels.some(
                  (lang) => lang.toLowerCase() === opt.label.toLowerCase()
                )
              )}
              defaultValue={defaultValue}
              options={options}
              onChange={handleChange}
              placeholder="Select languages..."
              className="w-full"
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
    </>
  );
}
