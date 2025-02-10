"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";
import Image from "next/image";

// Define the type for the object version of the upload result info.
interface CloudinaryUploadWidgetInfo {
  secure_url: string;
  // Add additional properties if needed.
}

// Custom type guard that handles string, object, or undefined.
function isCloudinaryUploadWidgetInfo(
  info: string | CloudinaryUploadWidgetInfo | undefined
): info is CloudinaryUploadWidgetInfo {
  return info !== undefined && typeof info !== "string";
}

const MyUploadWidget: React.FC = () => {
  const [imageURL, setImageURL] = useState("");

  // Use the type provided by next-cloudinary for the onSuccess callback.
  const handleUploadComplete: CldUploadWidgetProps["onSuccess"] = (result) => {
    if (isCloudinaryUploadWidgetInfo(result.info)) {
      const imageUrl = result.info.secure_url;
      setImageURL(imageUrl);
      console.log("Image URL:", imageUrl);
      // You can now use imageUrl as needed (e.g., send it to your server or update state).
    } else if (result.info !== undefined && typeof result.info === "string") {
      console.log("Upload complete info as string:", result.info);
    } else {
      console.log("result.info is undefined");
    }
  };

  return (
    <div className="p-4">
      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
        } // Your unsigned upload preset
        onSuccess={handleUploadComplete}
        options={{ maxFiles: 1 }}
      >
        {({ open }) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>

      {imageURL && (
        <div className="mt-4">
          <Image
            src={imageURL}
            alt="Uploaded image"
            width={500} // Set your desired width
            height={500} // Set your desired height
            className="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default MyUploadWidget;
