/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  faFile,
  faLink,
  faTrash,
  faEdit,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import ProtectedPage from "../common/ProtectedPage";
import Model from "../freelancerProfile/Model";
import CreateSubmissionForm from "./CreateSubmissionForm";
import {
  deleteFileOrLinkAPI,
  getSubmission,
  postSubmission,
} from "@/app/_lib/ContractsAPi/contractAPI";

interface Submission {
  id: string | number;
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
  const [submission, setSubmission] = useState<Submission>({
    id: "",
    files: [{ url: "", name: "", id: "" }],
    links: [{ url: "", name: "", id: "" }],
  });
  const [isForbidden, setIsForbidden] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [newLinkName, setNewLinkName] = useState<string>("");
  const [newLinkUrl, setNewLinkUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [showLinkInputs, setShowLinkInputs] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newLinks, setNewLinks] = useState<{ name: string; url: string }[]>([]);
  const [dataRefreshed, setDataRefreshed] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  // State for confirmation dialog
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "file" | "link";
    id: string;
    name: string;
  } | null>(null);

  // Fetch submission data on component mount
  useEffect(() => {
    const fetchSubmission = async () => {
      const token = Cookies.get("token");
      try {
        const submissionResponse = await getSubmission(
          { contractid: contractId, milestoneIndex: milestoneIndex },
          token
        );
        setSubmission(submissionResponse);
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
  }, [milestoneIndex, dataRefreshed, contractId]);

  // API to delete a file or link
  const deleteFileOrLink = async (type: "file" | "link", id: string) => {
    const token = Cookies.get("token");
    try {
      const deleteResponse = await deleteFileOrLinkAPI(
        { contractid: contractId, milestoneIndex: milestoneIndex, type, id },
        token
      );
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
      new URL(newLinkUrl.trim());
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
    if (!newFiles.length && !newLinks.length) {
      setIsEditing(false);
      return;
    }
    const token = Cookies.get("token");
    const formData = new FormData();
    newFiles.forEach((file) => formData.append("files", file));
    formData.append("links", JSON.stringify(newLinks));
    try {
      const PostResponse = await postSubmission(
        {
          contractid: contractId,
          milestoneIndex: milestoneIndex,
          body: formData,
        },
        token
      );
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

  // Show confirmation dialog for deletion
  const confirmDelete = (type: "file" | "link", id: string, name: string) => {
    setItemToDelete({ type, id, name });
    setShowConfirmDelete(true);
  };

  // Handle confirmed deletion
  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await deleteFileOrLink(itemToDelete.type, itemToDelete.id);
      setShowConfirmDelete(false);
      setItemToDelete(null);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setItemToDelete(null);
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to view these submissions. Please log in" />
    );
  }

  return (
    <Model
      isOpen={true}
      onClose={closeView}
      className="overflow-y-auto max-h-[50rem] max-w-5xl py-10 border-solid border-2 border-[var(--border-color)] bg-[var(--background-color)] transition-all duration-300"
    >
      <div className="flex flex-col gap-8 w-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-[var(--accent-color)]">
          Submissions for {title}
        </h1>

        {submission.links.length > 0 || submission.files.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col bg-[var(--background-color)] rounded-xl overflow-hidden border-gray-500 border-solid border-2 w-full">
              <div className="flex flex-col p-6">
                <div className="flex justify-between">
                  <h3 className="text-xl py-4">Files & Links</h3>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        setNewFiles([]);
                        setNewLinks([]);
                      }
                      setIsEditing(!isEditing);
                    }}
                    className={`text-[var(--accent-color)] text-lg hover:text-[var(--hover-color)] ${
                      notEditable ? "invisible" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={isEditing ? faXmark : faEdit} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 p-4">
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
                            onClick={() =>
                              confirmDelete("file", file.id, file.name)
                            }
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
                            onClick={() =>
                              confirmDelete("link", link.id, link.name)
                            }
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

                      <div
                        className={`flex items-center gap-4 ${
                          showLinkInputs ? "" : "invisible"
                        }`}
                      >
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
                    </>
                  )}
                </div>
              </div>

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
          <div className="flex flex-col gap-4 ">
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
                milestoneIndex={milestoneIndex}
                contractId={contractId}
                onNewSubmission={() => setDataRefreshed((prev) => !prev)}
                onCancel={() => setShowCreateForm(false)}
              />
            )}
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDelete && itemToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[var(--background-color)] p-6 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-md w-full">
              <h3 className="text-xl font-bold text-[var(--accent-color)] mb-4">
                Confirm Deletion
              </h3>
              <p className="text-lg mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{itemToDelete.name}</span>? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Model>
  );
}
