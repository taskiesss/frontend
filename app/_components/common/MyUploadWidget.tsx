"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";

interface CloudinaryUploadWidgetInfo {
  secure_url: string;
  original_filename?: string;
  // Add additional properties if needed.
}

interface MyUploadWidgetProps {
  onUpload: (url: string, fileName?: string) => void;
  buttonClassName?: string;
}

const MyUploadWidget: React.FC<MyUploadWidgetProps> = ({
  onUpload,
  buttonClassName = "",
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleUploadComplete: CldUploadWidgetProps["onSuccess"] = (result) => {
    if (result.info && typeof result.info !== "string") {
      const url = result.info.secure_url;
      const uploadedFileName = result.info.original_filename || "";
      setFileName(uploadedFileName);
      onUpload(url, uploadedFileName);
      console.log("Uploaded file URL:", url);
      console.log("Uploaded file name:", uploadedFileName);
    } else {
      console.log("Upload complete info did not contain expected data.");
    }
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
        }
        onSuccess={handleUploadComplete}
        options={{ maxFiles: 1, resourceType: "auto" }}
      >
        {({ open }) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            className={buttonClassName}
          >
            Upload File
          </button>
        )}
      </CldUploadWidget>
      {fileName && <p>Uploaded: {fileName}</p>}
    </div>
  );
};

export default MyUploadWidget;
