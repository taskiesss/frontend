"use client";
import Image from "next/image";
import { useState } from "react";
import EditButton from "../common/EditButton";
import CommunityCoverPhotoForm from "./Forms/CoverPhotoForm";

export default function CommunityCoverPhoto({
  community,
  isAdmin,
}: {
  community: { coverPhoto: string; id: string };

  isAdmin: boolean;
}) {
  const [isEditingCover, setIsEditingCover] = useState(false);

  return (
    <div className="flex relative w-full min-h-[312px] bg-[var(--background-color)] overflow-hidden">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[0.5rem]"
        style={{ backgroundImage: `url(${community.coverPhoto})` }}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src={community.coverPhoto}
          alt="Community Cover Photo"
          fill
          quality={80}
          priority
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {/* Edit Button */}
      {isAdmin && (
        <div className="absolute bottom-4 right-8 z-40">
          <EditButton
            className="rounded-full p-2 w-10 aspect-square text-white bg-[var(--hover-color)]"
            onClick={() => setIsEditingCover(true)}
          />
        </div>
      )}

      {/* Cover Photo Edit Modal */}
      {isEditingCover && (
        <CommunityCoverPhotoForm
          closeEdit={() => setIsEditingCover(false)}
          communityId={community.id}
        />
      )}
    </div>
  );
}
