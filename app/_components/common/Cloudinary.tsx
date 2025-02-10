// components/MyCloudinaryImage.tsx
import { CldImage } from "next-cloudinary";
import React from "react";

const MyCloudinaryImage: React.FC = () => {
  return (
    <div className="p-4">
      <CldImage
        src="sample" // This is the public ID of your Cloudinary image.
        width={400}
        height={300}
        alt="Sample Cloudinary Image"
        // You can also pass transformation options via props.
        // For example, quality, crop, etc.
        transformations="q_auto,c_fill"
        priority
      />
    </div>
  );
};

export default MyCloudinaryImage;
