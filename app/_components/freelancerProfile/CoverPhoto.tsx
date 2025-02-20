import React from "react";
import Image from "next/image";

export default function CoverPhoto({
  freelancer,
}: {
  freelancer: { coverPhoto: string };
}) {
  const imageUrl =
    "https://res.cloudinary.com/dvds6blan/image/upload/v1739928508/gtqlnfutfiocsuaqhemo.jpg";

  return (
    <div className="relative w-full h-[312px] bg-[var(--background-color)] overflow-hidden">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[0.5rem]"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* Foreground clear image */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="Cover Photo"
          fill
          quality={100}
          priority
          className="object-contain"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
