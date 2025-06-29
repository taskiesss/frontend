// components/CoverPhoto.tsx
import Image from "next/image";
import { useState } from "react";
import EditButton from "../common/EditButton";
import CoverPhotoForm from "./Forms/CoverPhotoForm";

export default function CoverPhoto({
  freelancer,
  editable, // Added editable prop with default false
}: {
  freelancer: { coverPhoto: string };
  editable?: boolean;
}) {
  const [isEditingCover, setIsEditingCover] = useState(false);
  // Use freelancer.coverPhoto if valid, otherwise fallback to default
  // const defaultImageUrl =
  //   "https://res.cloudinary.com/dvds6blan/image/upload/v1739928508/gtqlnfutfiocsuaqhemo.jpg";

  return (
    <div className="flex relative w-full min-h-[200px] sm:min-h-[250px] md:min-h-[312px] bg-[var(--background-color)] overflow-hidden">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[0.5rem]"
        style={{ backgroundImage: `url(${freelancer.coverPhoto})` }}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src={freelancer.coverPhoto}
          alt="Cover Photo"
          fill
          quality={80}
          priority
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {/* Edit Button */}

      {editable && (
        <div className="absolute bottom-2 sm:bottom-4 right-4 sm:right-8 z-40 ">
          <EditButton
            className="rounded-full p-1 sm:p-2 w-8 sm:w-10 aspect-square text-white bg-[var(--hover-color)] "
            onClick={() => setIsEditingCover(true)}
          />
        </div>
      )}

      {/* Cover Photo Edit Modal */}
      {isEditingCover && (
        <CoverPhotoForm closeEdit={() => setIsEditingCover(false)} />
      )}
    </div>
  );
}
