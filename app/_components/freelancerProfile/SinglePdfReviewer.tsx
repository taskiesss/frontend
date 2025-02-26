"use client";
import React from "react";
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

  return (
    <div className="relative group flex flex-col items-center gap-2 w-[15rem]">
      {/* Remove Button that appears on hover with transition */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
      >
        <FontAwesomeIcon icon={faTrashAlt} size="sm" />
      </button>
      <Link
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-3"
      >
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
        </div>
        <span className="w-full text-center p-1 rounded-lg text-lg hover:text-[var(--hover-color)]">
          {ProjectName}
        </span>
      </Link>
    </div>
  );
}
