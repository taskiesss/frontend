/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faFile, faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";
import ProtectedPage from "../common/ProtectedPage";
import { postSubmission } from "@/app/_lib/ContractsAPi/contractAPI";
interface CreateSubmissionFormProps {
  milestoneIndex: string;
  contractId: string;
  onNewSubmission: () => void;
  onCancel: () => void;
}

export default function CreateSubmissionForm({
  onNewSubmission,
  milestoneIndex,
  contractId,
  onCancel,
}: CreateSubmissionFormProps) {
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [newLinkName, setNewLinkName] = useState<string>("");
  const [newLinkUrl, setNewLinkUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [showLinkInputs, setShowLinkInputs] = useState<boolean>(false);
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);
  const [isForbidden, setIsForbidden] = useState(false);
  const [error, setError] = useState("");
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...fileArray]);
    }
  };

  // Handle adding a new link
  const handleAddLink = () => {
    if (!newLinkName.trim()) {
      setUrlError("Link name is required.");
      return;
    }
    try {
      new URL(newLinkUrl.trim()); // Validate URL
      setUrlError("");
      setLinks((prev) => [
        ...prev,
        { name: newLinkName.trim(), url: newLinkUrl.trim() },
      ]);
      setNewLinkName("");
      setNewLinkUrl("");
      setShowLinkInputs(false);
    } catch (error) {
      setUrlError("Please enter a valid URL (e.g., https://example.com).");
    }
  };

  // Handle removing a file
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle removing a link
  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateSubmission = async () => {
    if (!files.length && !links.length) {
      setError("You have to submit either a file or url");
      return;
    }
    const token = Cookies.get("token");
    const formData = new FormData();

    // Append new files
    files.forEach((file) => formData.append("files", file));

    // Append new links as JSON
    formData.append("links", JSON.stringify(links));

    try {
      // Replace with your API endpoint to create a new submission
      // const response = await fetch(`/api/contracts/${contractId}/milestone/${milestoneIndex}`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: formData,
      // });
      // if (!response.ok) throw new Error("Failed to create submission");
      const postResponse = await postSubmission(
        {
          contractid: contractId,
          milestoneIndex: milestoneIndex,
          body: formData,
        },
        token
      );
      // Reset form and state
      setError("");
      setDescription("");
      setFiles([]);
      setLinks([]);
      onCancel();
      onNewSubmission(); // Trigger refetch
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
        return;
      }
    }
  };
  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to view these submissions. Please log in" />
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-[var(--accent-color)]">
        Create New Submission
      </h3>
      <div className="flex flex-col gap-4 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 p-4">
        {/* Description */}
        {/* <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Description</h3>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[var(--background-color)] text-lg border border-solid border-[var(--border-color)] p-3 rounded-lg text-[var(--accent-color)] whitespace-pre-wrap focus:outline-none"
            placeholder="Enter a description for your submission"
          />
        </div> */}

        {/* Files & Links Section */}
        <h3 className="text-lg font-medium">Files & Links</h3>
        <div className="flex flex-col gap-3">
          {/* Upload Files */}
          <div className="flex gap-4">
            <label
              htmlFor="fileInput"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-[var(--btn-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors border-[var(--border-color)] border-solid border w-fit"
            >
              <FontAwesomeIcon icon={faFile} className="mr-2" />
              Upload Files
            </label>
            <input
              required
              type="file"
              id="fileInput"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => setShowLinkInputs(true)}
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-[var(--btn-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors border-[var(--border-color)] border-solid border w-fit"
            >
              <FontAwesomeIcon icon={faLink} className="mr-2" />
              Add Link
            </button>
          </div>

          {/* Link Input Fields */}
          <div
            className={`flex items-center gap-4 ${
              showLinkInputs ? "" : "invisible"
            }`}
          >
            <div className="flex-1">
              <input
                required
                type="text"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                placeholder="e.g., Project Documentation"
                className="w-full p-2 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2 focus:outline-none placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                required
                type="url"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-2 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2 focus:outline-none placeholder-gray-400"
              />
              {urlError && (
                <span className="text-red-500 text-sm">{urlError}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddLink}
                className="px-3 py-2 bg-[var(--btn-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors"
              >
                + Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewLinkName("");
                  setNewLinkUrl("");
                  setUrlError("");
                  setShowLinkInputs(false);
                }}
                className="px-3 py-2 text-black bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* List of Selected Files */}
          {files.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-medium">Selected Files:</h4>
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2"
                  >
                    <FontAwesomeIcon icon={faFile} className="text-gray-500" />
                    <span className="text-[var(--accent-color)]">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* List of Selected Links */}
          {links.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-medium">Selected Links:</h4>
              <div className="flex flex-wrap gap-2">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2"
                  >
                    <FontAwesomeIcon icon={faLink} className="text-gray-500" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-color)] hover:underline"
                    >
                      {link.name}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {error && <span className="text-red-500 text-lg">{error}</span>}
        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg text-black hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreateSubmission}
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg text-white hover:bg-[var(--hover-color)] transition-colors"
          >
            Create Submission
          </button>
        </div>
      </div>
    </div>
  );
}
