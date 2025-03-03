/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  faFile,
  faLink,
  faTrash,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import ProtectedPage from "../common/ProtectedPage";
import Model from "../freelancerProfile/Model";
import CreateSubmissionForm from "./CreateSubmissionForm";

interface Submission {
  id: string | number;
  description: string;
  files: { url: string; name: string; id: string }[];
  links: { url: string; name: string; id: string }[];
}

export default function ViewSubmission({
  contractId,
  notEditable,
  milestoneIndex,
  closeView,
  title,
}: {
  contractId: string;
  notEditable: boolean;
  milestoneIndex: string;
  closeView: () => void;
  title: string;
}) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isForbidden, setIsForbidden] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [newLinkName, setNewLinkName] = useState<string>("");
  const [newLinkUrl, setNewLinkUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [showLinkInputs, setShowLinkInputs] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false); // Edit mode state
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [newFiles, setNewFiles] = useState<File[]>([]); // New files to be added
  const [newLinks, setNewLinks] = useState<{ name: string; url: string }[]>([]); // New links to be added
  const [dataRefreshed, setDataRefreshed] = useState(false); // to refetch submission data
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false); // Show/hide create submission form

  // Fetch submission data on component mount
  useEffect(() => {
    const fetchSubmission = async () => {
      const token = Cookies.get("token");
      try {
        // Replace with your API endpoint to fetch submission data
        // const response = await fetch(`/api/contracts/${contractId}/milestone/${milestoneIndex}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // if (!response.ok) throw new Error("Failed to fetch submission");
        // const data = await response.json();
        // setSubmission(data);

        // Mock data for demonstration
        setSubmission(null); // Simulate no submission
      } catch (error: any) {
        if (
          error.message === "Forbidden" ||
          error.message === "Unauthorized user"
        ) {
          setIsForbidden(true);
          return;
        }
        setError("Failed to fetch submission. Please try again.");
      }
    };

    fetchSubmission();
  }, [milestoneIndex, dataRefreshed]);

  // API to delete a file or link
  const deleteFileOrLink = async (type: "file" | "link", id: string) => {
    const token = Cookies.get("token");
    try {
      // Replace with your API endpoint to delete a file or link
      // const response = await fetch(`/api/contracts/${contractId}/milestone/${milestoneIndex}/${type}/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // if (!response.ok) throw new Error("Failed to delete");

      // Update UI after deletion
      if (type === "file") {
        setNewFiles((prev) => prev.filter((file) => file.name !== id)); // Remove from newFiles
      } else {
        setNewLinks((prev) => prev.filter((link) => link.name !== id)); // Remove from newLinks
      }
      setDataRefreshed((prev) => !prev);
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
        return;
      }
      setError("Failed to delete. Please try again.");
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setNewFiles((prev) => [...prev, ...fileArray]);
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
      setNewLinks((prev) => [
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

  // Handle submitting changes
  const submitChanges = async () => {
    const token = Cookies.get("token");
    const formData = new FormData();

    // Append new files
    newFiles.forEach((file) => formData.append("files", file));

    // Append new links as JSON
    formData.append("links", JSON.stringify(newLinks));

    // Append the updated description
    formData.append("description", editedDescription);

    try {
      // Replace with your API endpoint to update submission
      // const response = await fetch(`/api/contracts/${contractId}/milestone/${milestoneIndex}`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: formData,
      // });
      // if (!response.ok) throw new Error("Failed to update submission");

      // Clear local changes after successful submission
      setNewFiles([]);
      setNewLinks([]);
      setDataRefreshed((prev) => !prev);
      setIsEditing(false);
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
        return;
      }
      setError("Failed to update submission. Please try again.");
    }
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to view these submissions. Please log in" />
    );
  }

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to view these submissions. Please log in" />
    );
  }

  return (
    <Model
      isOpen={true}
      onClose={() => {
        closeView();
      }}
      className="overflow-y-auto max-h-[50rem] max-w-5xl py-10 border-solid border-2 border-[var(--border-color)] bg-[var(--background-color)] transition-all duration-300"
    >
      <div className="flex flex-col gap-8 w-auto max-w-4xl">
        {/* Submissions Title */}
        <h1 className="text-2xl font-bold text-[var(--accent-color)]">
          Submissions for {title}
        </h1>

        {/* Render Create Form or Existing Submission */}
        {submission ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col bg-[var(--background-color)] rounded-xl overflow-hidden border-gray-500 border-solid border-2 w-full">
              <div className="p-6">
                {/* Description */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl mb-2">Description</h3>
                    <button
                      onClick={() => {
                        setIsEditing(!isEditing);
                        setEditedDescription(submission.description);
                      }}
                      className={`text-[var(--accent-color)] hover:text-[var(--hover-color)] ${
                        notEditable ? "invisible" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={isEditing ? faSave : faEdit} />
                    </button>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="bg-[var(--background-color)] text-lg border border-solid border-[var(--border-color)] p-3 rounded-lg text-[var(--accent-color)] whitespace-pre-wrap focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg border border-solid border-[var(--border-color)] p-3 rounded-lg whitespace-pre-wrap">
                      {submission.description || "No description provided."}
                    </p>
                  )}
                </div>

                {/* Files & Links Section */}
                <h3 className="text-xl mt-4">Files & Links</h3>
                <div className="flex flex-col gap-3 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 p-4">
                  {/* Files and Links List */}
                  <div className="flex flex-wrap gap-4">
                    {/* Existing Files */}
                    {submission.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between py-1 gap-4 w-fit rounded-lg px-3 border-2 border-solid border-[var(--border-color)] text-lg"
                      >
                        <span className="flex items-center gap-2 text-[var(--accent-color)]">
                          <FontAwesomeIcon
                            icon={faFile}
                            className="text-gray-500"
                          />
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent-color)] hover:underline"
                          >
                            {file.name}
                          </a>
                        </span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => deleteFileOrLink("file", file.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Remove ${file.name}`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    ))}

                    {/* New Files */}
                    {newFiles.map((file, index) => (
                      <div
                        key={`new-file-${index}`}
                        className="flex items-center justify-between py-1 gap-4 w-fit rounded-lg px-3 border-2 border-solid border-[var(--border-color)] text-lg"
                      >
                        <span className="flex items-center gap-2 text-[var(--accent-color)]">
                          <FontAwesomeIcon
                            icon={faFile}
                            className="text-gray-500"
                          />
                          <span className="text-[var(--accent-color)]">
                            {file.name}
                          </span>
                        </span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() =>
                              setNewFiles((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Remove ${file.name}`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Existing Links */}
                    {submission.links.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center justify-between py-1 gap-4 w-fit rounded-lg px-3 border-2 border-solid border-[var(--border-color)] text-lg"
                      >
                        <span className="flex items-center gap-2 text-[var(--accent-color)]">
                          <FontAwesomeIcon
                            icon={faLink}
                            className="text-gray-500"
                          />
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent-color)] hover:underline"
                          >
                            {link.name}
                          </a>
                        </span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => deleteFileOrLink("link", link.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Remove link ${link.name}`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    ))}

                    {/* New Links */}
                    {newLinks.map((link, index) => (
                      <div
                        key={`new-link-${index}`}
                        className="flex items-center justify-between py-1 gap-4 w-fit rounded-lg px-3 border-2 border-solid border-[var(--border-color)] text-lg"
                      >
                        <span className="flex items-center gap-2 text-[var(--accent-color)]">
                          <FontAwesomeIcon
                            icon={faLink}
                            className="text-gray-500"
                          />
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent-color)] hover:underline"
                          >
                            {link.name}
                          </a>
                        </span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() =>
                              setNewLinks((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Remove link ${link.name}`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add File and Add Link Buttons (visible in edit mode) */}
                  {isEditing && (
                    <>
                      <div className="flex gap-4">
                        <label
                          htmlFor="fileInput"
                          className="cursor-pointer inline-flex items-center px-4 py-2 bg-[var(--btn-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors border-[var(--border-color)] border-solid border w-fit"
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
                          onClick={() => setShowLinkInputs(true)}
                          className="cursor-pointer inline-flex items-center px-4 py-2 bg-[var(--btn-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors border-[var(--border-color)] border-solid border w-fit"
                        >
                          <FontAwesomeIcon icon={faLink} className="mr-2" />
                          Add Link
                        </button>
                      </div>

                      {/* Link Input Fields (when shown) */}
                      {showLinkInputs && (
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={newLinkName}
                              onChange={(e) => setNewLinkName(e.target.value)}
                              placeholder="e.g., Project Documentation"
                              className="w-full p-2 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2 focus:outline-none placeholder-gray-400"
                            />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <input
                              type="url"
                              value={newLinkUrl}
                              onChange={(e) => setNewLinkUrl(e.target.value)}
                              placeholder="https://example.com"
                              className="w-full p-2 bg-[var(--background-color)] rounded-lg border-[var(--border-color)] border-solid border-2 focus:outline-none placeholder-gray-400"
                            />
                            {urlError && (
                              <span className="text-red-500 text-sm">
                                {urlError}
                              </span>
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
                      )}
                    </>
                  )}
                </div>
              </div>
              {/* Submit Button (visible in edit mode) */}
              {isEditing && (
                <div className="self-end p-4">
                  <button
                    type="button"
                    onClick={submitChanges}
                    className="px-4 py-2 bg-[var(--btn-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors"
                  >
                    Submit Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-xl">No submission found.</span>
            {!notEditable && !showCreateForm && (
              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-[var(--btn-color)] rounded-lg text-white hover:bg-[var(--hover-color)] transition-colors w-fit"
              >
                Create Submission
              </button>
            )}
            {showCreateForm && !notEditable && (
              <CreateSubmissionForm
                contractId={contractId}
                onNewSubmission={() => setDataRefreshed((prev) => !prev)}
                onCancel={() => setShowCreateForm(false)}
              />
            )}
          </div>
        )}
      </div>
    </Model>
  );
}
