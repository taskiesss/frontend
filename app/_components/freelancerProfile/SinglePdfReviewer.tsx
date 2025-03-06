"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function PDFPreviewAuto({
  fileUrl,
  ProjectName,
  onRemove,
}: {
  fileUrl: string;
  ProjectName: string;
  onRemove?: () => void;
}) {
  // State for confirmation dialog
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  // Your raw PDF URL (ensure it's publicly accessible)
  //   const rawPdfUrl =
  //     "https://res.cloudinary.com/upwork-fp/image/upload/v1739983878/profile/portfolio/997588759685713920/qgpckh5j4pjelvldnxpp.pdf";
  //   const rawPdfUrl =
  //     "https://res.cloudinary.com/dvds6blan/image/upload/v1739981710/cld-sample-5.jpg";

  // Define the transformation string that extracts the first page and scales it to 1000px width.
  const transformation = "c_scale,pg_1,w_1000";

  // Automatically generate the preview URL by inserting the transformation and replacing the extension to .jpg.
  const previewUrl = fileUrl
    .replace("/upload/", `/upload/${transformation}/`)
    .replace(/\.pdf$/, ".jpg");

  // Handle delete button click to show confirmation
  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  // Handle confirmed deletion
  const handleConfirmDelete = () => {
    if (onRemove) {
      onRemove();
    }
    setShowConfirmDelete(false);
  };

  // Handle cancel deletion
  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <>
      <div className="group flex flex-col items-center gap-2 w-[15rem]">
        <div className="relative w-40 aspect-square">
          <Image
            src={previewUrl}
            alt="PDF Preview"
            quality={70}
            fill
            priority
            className="object-cover"
            sizes="18rem"
          />
          {/* Overlay with background that changes on hover */}
          <div className="absolute inset-0 transition-colors duration-300 flex items-center justify-center bg-gray-400/0 group-hover:bg-gray-400/50">
            <button
              onClick={handleDeleteClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 text-white rounded-full overflow-hidden w-8 h-8 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTrashAlt} size="1x" />
            </button>
          </div>
        </div>
        <Link
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3"
        >
          <span className="w-full text-center p-1 rounded-lg text-lg hover:text-[var(--hover-color)]">
            {ProjectName}
          </span>
        </Link>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--background-color)] p-6 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-md w-full">
            <h3 className="text-xl font-bold  mb-4">Confirm Deletion</h3>
            <p className="text-lg mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{ProjectName}</span>? This action
              cannot be undone.
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
    </>
  );
}
