/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import React, { FormEvent, useState } from "react";
import ProtectedPage from "../common/ProtectedPage";
import Model from "../freelancerProfile/Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faLink, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SubmissionForm({
  closeEdit,
}: {
  closeEdit: () => void;
}) {
  const [About, setAbout] = useState<string>("");
  const [files, setFiles] = useState<{ file: File; id: number }[]>([]); // Multiple files with IDs for order tracking
  const [links, setLinks] = useState<
    { name: string; url: string; id: number }[]
  >([]); // Links with IDs for order tracking
  const [newLinkName, setNewLinkName] = useState<string>(""); // New link name input
  const [newLinkUrl, setNewLinkUrl] = useState<string>(""); // New link URL input
  const [isForbidden, setIsForbidden] = useState<boolean>(false);
  const [showLinkInputs, setShowLinkInputs] = useState<boolean>(false); // State to toggle link inputs
  const [nextId, setNextId] = useState<number>(1); // Counter for unique IDs
  const [urlError, setUrlError] = useState<string>(""); // State for URL validation error message

  // Handle file input change for multiple files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);

      const newFiles = fileArray.map((file) => ({
        file,
        id: nextId + fileArray.indexOf(file), // Assign unique IDs based on order
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setNextId(nextId + fileArray.length); // Increment ID counter
    }
  };

  // Handle removing a file
  const removeFile = (idToRemove: number) => {
    const newFiles = files.filter((item) => item.id !== idToRemove);

    setFiles(newFiles);
  };

  // Handle adding a new link with URL validation
  const addLink = () => {
    if (!newLinkName.trim()) {
      setUrlError("Link name is required.");
      return;
    }
    try {
      // Validate URL using the URL constructor (throws if invalid)
      new URL(newLinkUrl.trim());
      setUrlError(""); // Clear any previous error
      if (newLinkName.trim() && newLinkUrl.trim()) {
        setLinks((prevLinks) => [
          ...prevLinks,
          {
            name: newLinkName.trim(),
            url: newLinkUrl.trim(),
            id: nextId, // Assign unique ID
          },
        ]);
        setNewLinkName(""); // Reset inputs
        setNewLinkUrl("");
        setShowLinkInputs(false); // Hide inputs after adding
        setNextId(nextId + 1); // Increment ID counter
      }
    } catch (error) {
      setUrlError("Please enter a valid URL (e.g., https://example.com).");
    }
  };

  // Handle removing a link
  const removeLink = (idToRemove: number) => {
    const newLinks = links.filter((item) => item.id !== idToRemove);

    setLinks(newLinks);
  };

  // Handle link name change
  const handleLinkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLinkName(e.target.value);
    setUrlError(""); // Clear error when user edits
  };

  // Handle link URL change
  const handleLinkUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLinkUrl(e.target.value);
    setUrlError(""); // Clear error when user edits
  };

  // Handle form submission with validation check
  const handleAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If link inputs are visible, validate them before proceeding
    if (showLinkInputs) {
      if (!newLinkName.trim()) {
        setUrlError("Link name is required.");
        return;
      }
      try {
        new URL(newLinkUrl.trim());
        setUrlError(""); // Clear any previous error
      } catch (error: any) {
        setUrlError("Please enter a valid URL (e.g., https://example.com).");
        return;
      }
      // If validation passes, add the link and proceed with submission
      if (newLinkName.trim() && newLinkUrl.trim()) {
        addLink();
      } else {
        return; // Prevent submission if validation fails
      }
    }

    const token = Cookies.get("token");
    try {
      console.log("Form Data:", { description: About, files, links });

      const formData = new FormData();
      formData.append("description", About);

      // Append all files under the single key "files"
      if (files.length > 0) {
        files.forEach(({ file }) => {
          formData.append("files", file);
        });
      }

      // Append links as a JSON string under "links"
      if (links.length > 0) {
        const linksJson = JSON.stringify(
          links.map(({ name, url }) => ({ name, url }))
        ); // Strip IDs for JSON
        formData.append("links", linksJson);
      }

      // Example API call (uncomment and adjust as needed)
      // const res = await fetch("/api/submission", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: formData,
      // });
      // const data = await res.json();

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

  // Toggle link inputs visibility
  const toggleLinkInputs = () => {
    setShowLinkInputs(true);
    setNewLinkName(""); // Reset inputs when showing
    setNewLinkUrl("");
    setUrlError(""); // Clear any error when showing inputs
  };

  // Cancel adding a link (hide inputs without adding)
  const cancelLink = () => {
    setShowLinkInputs(false);
    setNewLinkName(""); // Reset inputs
    setNewLinkUrl("");
    setUrlError(""); // Clear any error
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  }

  return (
    <Model
      isOpen={true}
      onClose={closeEdit}
      className="overflow-y-auto max-h-[50rem] max-w-max py-10 border-solid border-2 border-[var(--border-color)]"
    >
      <h2 className="text-2xl font-bold mb-4">
        Add a Submission for Milestone 1
      </h2>
      <form
        onSubmit={handleAction}
        className="flex flex-col gap-8 w-auto max-w-4xl"
      >
        {/* Description */}
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          name="description"
          className="resize-y w-full max-h-[10rem] focus:outline-none p-6 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 text-lg"
          placeholder="Enter your submission description..."
        />

        {/* Files & Links Section */}
        <div className="flex flex-col gap-3 bg-[var(--background-color)] p-6 rounded-xl border-[var(--border-color)] border-solid border-2">
          <h3 className="text-lg font-medium ">Files & Links</h3>
          {/* Combined File and Link Listings (sorted by addition order) */}
          <div className="flex flex-col gap-4">
            {[...files, ...links]
              .sort((a, b) => a.id - b.id) // Sort by ID (addition order)
              .map((item) =>
                "file" in item ? (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-1 gap-4 w-fit rounded-lg px-3 border-2 border-solid border-[var(--border-color)] text-lg"
                  >
                    <span className="flex items-center gap-2 text-[var(--accent-color)]">
                      <FontAwesomeIcon
                        icon={faFile}
                        className="text-gray-500"
                      />
                      {item.file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      aria-label={`Remove ${item.file.name}`}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </li>
                ) : (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-1 gap-4 w-fit rounded-lg px-3 border-2 border-solid border-[var(--border-color)] text-lg"
                  >
                    <span className="flex items-center gap-2 text-[var(--accent-color)]">
                      <FontAwesomeIcon
                        icon={faLink}
                        className="text-gray-500"
                      />
                      {item.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLink(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      aria-label={`Remove link ${item.name}`}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </li>
                )
              )}
          </div>
          {/* Buttons Side by Side */}
          <div className="flex gap-4">
            <label
              htmlFor="fileInput"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-[var(--btn-color)]  rounded-xl hover:bg-[var(--hover-color)] transition-colors border-[var(--border-color)] border-solid border w-fit"
            >
              <FontAwesomeIcon icon={faFile} className="mr-2" />
              Upload Files
            </label>
            <input
              type="file"
              id="fileInput"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={toggleLinkInputs}
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-[var(--btn-color)]  rounded-xl hover:bg-[var(--hover-color)] transition-colors border-[var(--border-color)] border-solid border w-fit"
            >
              <FontAwesomeIcon icon={faLink} className="mr-2" />
              Add Link
            </button>
          </div>
          {/* Link Input Fields (when shown) */}
          <div
            className={`flex items-center gap-4 ${
              showLinkInputs ? "" : "invisible"
            }`}
          >
            <div className="flex-1">
              <input
                // Removed 'required' to prevent validation on hidden inputs
                type="text"
                value={newLinkName}
                onChange={handleLinkNameChange}
                placeholder="e.g., Project Documentation"
                className="w-full p-2 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2 focus:outline-none placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                // Removed 'required' to prevent validation on hidden inputs
                type="url"
                value={newLinkUrl}
                onChange={handleLinkUrlChange}
                placeholder="https://example.com"
                className="w-full p-2 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2  focus:outline-none placeholder-gray-400"
              />
              {urlError && (
                <span className="text-red-500 text-sm">{urlError}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addLink}
                className="px-3 py-2 bg-[var(--btn-color)]  rounded-lg hover:bg-[var(--hover-color)] transition-colors"
              >
                + Add
              </button>
              <button
                type="button"
                onClick={cancelLink}
                className="px-3 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="self-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg  hover:bg-[var(--hover-color)] transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </Model>
  );
}
