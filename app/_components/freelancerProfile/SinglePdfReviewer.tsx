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
  editable,
}: {
  fileUrl: string;
  ProjectName: string;
  onRemove?: () => void;
  editable: boolean;
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
      <div className="group flex flex-col items-center gap-2 w-full sm:w-48 md:w-56 lg:w-60">
        <div className="relative w-32 sm:w-36 md:w-40 lg:w-44 aspect-square">
          <Image
            src={previewUrl}
            alt="PDF Preview"
            quality={70}
            fill
            priority
            className="object-cover rounded-lg"
            sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 160px, 176px"
          />
          {/* Overlay with background that changes on hover */}
          {editable && (
            <div className="absolute inset-0 transition-colors duration-300 flex items-center justify-center bg-gray-400/0 group-hover:bg-gray-400/50 rounded-lg">
              <button
                onClick={handleDeleteClick}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 text-white rounded-full overflow-hidden w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  size="sm"
                  className="sm:text-sm md:text-base"
                />
              </button>
            </div>
          )}
        </div>
        <Link
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 sm:gap-3 w-full"
        >
          <span className="w-full text-center p-1 sm:p-2 rounded-lg text-sm sm:text-base md:text-lg hover:text-[var(--hover-color)] transition-colors break-words">
            {ProjectName}
          </span>
        </Link>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-[var(--background-color)] p-4 sm:p-6 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-sm sm:max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{ProjectName}</span>? This action
              cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
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
