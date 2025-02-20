/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Model from "../Model";

export default function CoverPhotoForm({ closeEdit }: { closeEdit: any }) {
  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">
        Edit Your Profile or Cover photo
      </h2>
      {/* Put your form for editing the section here */}
      <input type="file" name="CoverPhoto" />
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>
    </Model>
  );
}
