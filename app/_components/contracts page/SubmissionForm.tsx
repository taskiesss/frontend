/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import React, { FormEvent, useState } from "react";
import ProtectedPage from "../common/ProtectedPage";
import Model from "../freelancerProfile/Model";

export default function SubmissionForm({
  closeEdit,
}: {
  closeEdit: () => void;
}) {
  const [About, setAbout] = useState<string>("");
  const [files, setFiles] = useState<File[]>([undefined as any]); // Start with one placeholder file input
  const [links, setLinks] = useState<string[]>([""]); // State for multiple links (starting with one empty input)
  const [isForbidden, setIsForbidden] = useState<boolean>(false);

  // Handle adding a new file input
  const addFileInput = () => {
    console.log("Adding new file input. Current files:", files);
    setFiles([...files, undefined as any]); // Use undefined as a placeholder (will be replaced by a File)
  };

  // Handle adding a new link input
  const addLinkInput = () => {
    console.log("Adding new link input. Current links:", links);
    setLinks([...links, ""]);
  };

  // Handle removing a file input
  const removeFile = (index: number) => {
    console.log(
      `Removing file at index ${index}. Current files before removal:`,
      files
    );
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles); // No need to filter nulls since we’re using File[]
    console.log("Files after removal:", newFiles);
  };

  // Handle removing a link input
  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    console.log("Links after removal:", newLinks);
  };

  // Handle file input changes (only accept File, not null)
  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]; // Get the file or undefined if none selected
    console.log(`File change at index ${index}. Selected file:`, file);
    if (file) {
      const newFiles = [...files];
      newFiles[index] = file;
      setFiles(newFiles);
    } else {
      // If no file is selected, remove the placeholder at that index
      removeFile(index);
    }
  };

  // Handle link input changes
  const handleLinkChange = (index: number, value: string) => {
    console.log(`Link change at index ${index}. New value:`, value);
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      console.log("Form Data:", { About, files, links });

      // Prepare form data for the API call (including files and links)
      const formData = new FormData();
      formData.append("description", About); // Add description

      // Add files if any exist
      if (files.length > 0) {
        files.forEach((file, index) => {
          if (file) formData.append(`files[${index}]`, file); // Use an array-like structure for multiple files, only add non-undefined files
        });
      }

      // Add links if any exist
      if (links.length > 0) {
        links.forEach((link, index) => {
          if (link.trim()) formData.append(`links[${index}]`, link); // Only add non-empty links
        });
      }

      //   const res = await AboutAction(formData, token); // Adjust API call to accept FormData
      //   console.log(res);
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
  else
    return (
      <Model
        isOpen={true}
        onClose={closeEdit}
        className="overflow-y-scroll max-h-[50rem] max-w-max py-10 border-solid border-2 border-[var(--border-color)]"
      >
        <h2 className="text-2xl font-bold mb-4">
          Add a Submission for Milestone 1
        </h2>
        <form
          onSubmit={(e) => handleAction(e)}
          className="flex flex-col gap-8 w-auto max-w-4xl "
        >
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            name="description"
            className="resize-none w-full max-h-[10rem] focus:outline-none p-6 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 text-lg"
            placeholder="Enter your submission description..."
          />
          {/* File inputs */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Upload Files</h3>
            <div className="flex flex-col gap-2 ">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 w-full group"
                >
                  <div className="flex-1">
                    <label
                      htmlFor={`fileInput-${index}`}
                      className="text-lg font-medium sr-only"
                    >
                      File {index + 1}
                    </label>
                    <input
                      type="file"
                      id={`fileInput-${index}`}
                      onChange={(e) => handleFileChange(index, e)}
                      className="w-full p-3 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 text-md focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={`text-red-500 text-sm hover:text-red-700 px-2 py-1 rounded bg-red-100 hover:bg-red-200 ml-2 ${
                      files.length > 1 ? "" : "invisible"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFileInput}
              className=" px-4 py-2 text-[var(--hover-color)] hover:text-[var(--btn-color)] text-lg rounded-lg w-fit"
            >
              + Add Another File
            </button>
          </div>
          {/* Link inputs */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Add Links</h3>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 w-full group"
                >
                  <div className="flex-1">
                    <label
                      htmlFor={`linkInput-${index}`}
                      className="text-lg font-medium sr-only"
                    >
                      Link {index + 1}
                    </label>
                    <input
                      type="url"
                      id={`linkInput-${index}`}
                      value={link}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      placeholder="Enter a URL to your work "
                      className="w-full p-3 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 text-md focus:outline-none"
                    />
                  </div>
                  {links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-500 text-sm hover:text-red-700 px-2 py-1 rounded bg-red-100 hover:bg-red-200 ml-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addLinkInput}
              className=" px-4 py-2 text-[var(--hover-color)] hover:text-[var(--btn-color)] text-lg rounded-lg w-fit"
            >
              + Add Another Link
            </button>
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
